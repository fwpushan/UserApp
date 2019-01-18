import { Component, NgZone, AfterViewInit } from '@angular/core';
import { User} from '../models/user'
import { Router } from '@angular/router';

import Remote from "../services/remote.service"
import UserService from '../services/user.service'

interface UserFetchResponse {
    users: User[]
}

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements AfterViewInit {
    users: User[];
    isAdmin: boolean = false;
    isLoggedIn: boolean = false;
    constructor(private zone: NgZone, private router: Router){}


    ngAfterViewInit() {
        if (UserService.getUser()) {
            this.fetch();
            this.isAdmin = UserService.isAdmin;
        }
        UserService.editUser = null;
        if (UserService.getUser()) {
            this.isLoggedIn = true;
        }
    }

    fetch() {
        Remote.fetchUsers().then((resp: UserFetchResponse) => {
            this.zone.run(() => {
                this.users = resp.users;
            });

        }).catch((err) => {})
    }

    onClickUser(user: User) {
        UserService.editUser = user;
        this.router.navigate(['/update'])
    }

    changeRole(user: User) {
        if (user.userId === UserService.getUser().userId) {
            alert("Change role of logged-in user is not allowed");
            return;
        }

        if (confirm("Are you want to change role of the user? Please confirm.")) {
            let role = user.role;
            if (role === "Admin") {
                user.role = "Contributor"
            } else {
                user.role = "Admin"
            }

            Remote.update(user).then(() => {
                alert("Change role success");
                this.fetch();
            }).catch(() => {
                alert("Unable to change role");
            });
        }
    }

    removeUser(user: User) {
        if (user.userId === UserService.getUser().userId) {
            alert("Deletion of logged-in user is not allowed");
            return;
        }
        if (confirm("Are you want to delete this user? Please confirm")) {
            Remote.remove(user.userId).then(() => {
                this.fetch();
            }).catch(() => {
                alert("Unable to detlete user");
            });
        }
    }

}
