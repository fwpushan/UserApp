import {Injectable,EventEmitter} from "@angular/core";
import {User} from "../models/user"

declare const sessionStorage:any;
declare const location:any;

class UserService extends EventEmitter<any> {
    public appUser: User;
    public _editUser: User;
    public setUser(user: User) {
        this.appUser = user;
        if(sessionStorage) {
            sessionStorage.setItem("user",JSON.stringify(user));
        }
    }
    public getUser() {
        return this.appUser;
    }

    public get editUser() {
        return this._editUser;
    }

    public set editUser(user: User) {
        this._editUser = user;
    }

    public get isAdmin() {
        return this.appUser && this.appUser.role === "Admin"
    }

    public logout() {
        this.appUser = null;
        this._editUser = null;
        if(sessionStorage) {
            sessionStorage.removeItem("user");
        }
        location.reload();
    }



    constructor() {
        super();

        if(sessionStorage && sessionStorage.getItem("user")) {
            let userstr = sessionStorage.getItem("user");
            let userObj = JSON.parse(userstr);
            this.appUser = userObj as User;
        }
    }

}

let userService = new UserService();

export default userService;
