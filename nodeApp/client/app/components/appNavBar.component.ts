// NavBar
import { Component,Input, AfterViewInit, NgZone, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import UserService from '../services/user.service'
import { DialogService } from "ng2-bootstrap-modal"
import { LoginComponent} from "./login.component"
import Store from "../services/store.service"
import { Router } from '@angular/router';

// Service injectable via angular
import {LoggerService} from "../services/logger.service";
import Remote from "../services/remote.service"

import {User} from '../models/user';

declare const gapi: any;

@Component({
    selector: "topNavBar",
    templateUrl: "./appNavBar.component.html",
    styleUrls:['./app.component.css'],
    providers: [LoggerService, DialogService]

})

export class AppNavBar implements AfterViewInit {
    isLogin: boolean = false;
    subTitle: string = "Please login";

    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    @Output() didLogin: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild("searchText") searchText: ElementRef;

    constructor(private logger: LoggerService, private router: Router, private dialogService: DialogService, private zone:NgZone) {
        this.logger.tag = "AppNavBar";
    }

    ngAfterViewInit() {
        this.logger.info("view init");
        this.zone.run(() => {
            let user = UserService.getUser();
            if (user) {
                console.dir(user);
                console.log("email: " + user["email"]);
                this.subTitle =  user["email"];
                this.isLogin = true;
            }
        });
    }

    onLogin(user: User) {
        this.logger.info(" Get user login");
        //console.dir(user);
        this.isLogin = true;
        this.subTitle =  user.email;
        this.didLogin.emit("done");
    }

    searchValueChange(event: any) {
        let searchValue = this.searchText.nativeElement.value || "";
        //console.log("search text change:" + searchValue);
        this.search.emit(searchValue);

    }

    logout() {
        UserService.logout();
    }
}
