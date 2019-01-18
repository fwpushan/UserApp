import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal"
import { User } from '../models/user';

import Remote from "../services/remote.service"

export interface RegisterConfirm {
    user: User
}

declare const location: any;

/**
* User Regitster Form Component
* */
@Component({templateUrl: 'register.component.html'})
export class RegisterComponent extends DialogComponent<RegisterConfirm, boolean> implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValidEmail = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        dialogService: DialogService,
        private zone: NgZone) {
            // Super call with Dialog service
            super(dialogService);
            this.zone.run(() => {
                this.registerForm = this.formBuilder.group({
                    name: ['', Validators.required],
                    address: ['', Validators.required],
                    email: ['', Validators.required],
                    password: ['', [Validators.required, Validators.minLength(4)]],
                    role: ['', Validators.required]
                });
            });
        }

        ngOnInit() {

        }

        // convenience getter for easy access to form fields
        get f() { return this.registerForm.controls; }
        onSubmit() {
            console.dir(this.f);
            this.submitted = true;
            this.isValidEmail = this.emailPattern.test(this.f["email"].value);

            // stop here if form is invalid
            if (this.registerForm.invalid || !this.isValidEmail) {
                return;
            }
            this.loading = true;
            let registerData: User = {
                name: this.f["name"].value as string,
                address: this.f["address"].value as string,
                email: this.f["email"].value as string,
                password: this.f["password"].value as string,
                role: this.f["role"].value as string,
                userId: "-1"
            };
            console.dir(registerData);
            Remote.register(registerData).then(() => {
                this.zone.run(() => {
                    this.loading = false;
                    this.router.navigate(['/login'])
                });
            }).catch(() => {
                this.zone.run(() => {
                    this.loading = false;
                    alert("Unable to register");
                });
            });
        }





        // UI Event Handling
        onEmailInput(event: any) {
            this.submitted = false;
            let emailValue = event.target.value || "";
            this.isValidEmail = this.emailPattern.test(emailValue);
        }

        onPasswordInput() {
            this.submitted = false;
        }
}
