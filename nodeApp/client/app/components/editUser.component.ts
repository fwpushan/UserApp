import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal"
import { User } from '../models/user';

import Remote from "../services/remote.service"
import UserService from '../services/user.service'

export interface RegisterConfirm {
    user: User
}

declare const location: any;

/**
* User Regitster Form Component
* */
@Component({templateUrl: 'editUser.component.html'})
export class EditUserComponent extends DialogComponent<RegisterConfirm, boolean> implements OnInit, AfterViewInit {
    updateForm: FormGroup;
    loading = false;
    submitted = false;
    emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValidEmail = false;
    editUser: User
    isAdmin: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        dialogService: DialogService,
        private zone: NgZone) {
            // Super call with Dialog service
            super(dialogService);
            this.isAdmin = UserService.isAdmin;
            this.zone.run(() => {
                this.loadEdit();
            });
        }

        ngOnInit() {

        }

        ngAfterViewInit() {

        }

        loadEdit() {
            if (UserService.editUser) {
                let edit = UserService.editUser;
                this.zone.run(() => {
                    this.editUser = edit;
                    this.updateForm = this.formBuilder.group({
                        name: [edit.name, Validators.required],
                        address: [edit.address, Validators.required],
                        email: [edit.email, Validators.required],
                        role: [edit.role, Validators.required]
                    });
                });

            }
        }
        // convenience getter for easy access to form fields
        get f() { return this.updateForm.controls; }
        onSubmit() {
            console.dir(this.f);
            this.submitted = true;
            this.isValidEmail = this.emailPattern.test(this.f["email"].value);

            // stop here if form is invalid
            if (this.updateForm.invalid || !this.isValidEmail) {
                return;
            }
            this.loading = true;
            let updateData: User = {
                name: this.f["name"].value as string,
                address: this.f["address"].value as string,
                email: this.f["email"].value as string,
                role: this.f["role"].value as string,
                password: this.editUser.password || "",
                userId: this.editUser.userId || "-1"
            };
            console.dir(updateData);
            Remote.update(updateData).then(() => {
                this.zone.run(() => {
                    this.loading = false;
                    this.router.navigate(['/'])
                });
            }).catch(() => {
                this.zone.run(() => {
                    this.loading = false;
                    alert("Unable to update");
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
