import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import { LoginData, User } from '../models/user';
import Remote from "../services/remote.service";
import UserService from '../services/user.service'

declare const location: any;

export interface LoginConfirm {
    user: User
}

@Component({templateUrl: 'login.component.html'})
export class LoginComponent extends DialogComponent<any, LoginConfirm> implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, dialogService: DialogService, private zone: NgZone) {
        // Super call with Dialog service
        super(dialogService);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });


        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;

        let loginInfo: LoginData = {
            email: this.f["username"].value as string,
            password: this.f["password"].value as string
        };

        console.log("Will login");
        console.dir(loginInfo);

        Remote.login(loginInfo).then((user) => {
            this.zone.run(() => {
                console.dir(user);
                UserService.setUser(user[0] as User);
                this.router.navigate(['/']);
            });

        }).catch((e) => {
            console.dir(e);
            alert("Unable to logion");
        });

    }
}
