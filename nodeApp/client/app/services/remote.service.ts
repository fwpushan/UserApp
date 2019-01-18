//import {User} from "../models/user"

import {User, LoginData} from "../models/user"

let testURL: string = "http://localhost:8001/test"

let registerURL: string = "http://localhost:8001/api/register";
let loginURL: string = "/api/userlogin";
let getUsersURL: string = '/api/users'
let updateUserURL: string = '/api/user/update'
let removeUserURL: string = '/api/user/remove'
declare const $: any;

class Remote {

    test() {
        $.ajax({url: testURL, success: function(result){
            console.dir(result);
        }});
    }

    login(loginInfo: LoginData) {
        return new Promise((resolve, reject) => {
            $.post(loginURL, loginInfo, (resp, status) => {
                console.log(`Login:Status = ${resp} and ${status}`)
                if (status === 'success') {
                    resolve(resp);
                } else {
                    reject(resp);
                }
            })
        });
    }

    register(user: User) {
        return new Promise((resolve, reject) => {
            $.post(registerURL, user, (resp, status) => {
                console.log(`Reg:Status = ${resp} and ${status}`)
                if (status === 'success') {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    fetchUsers() {
        return new Promise((resolve, reject) => {
            $.get(getUsersURL, (resp, status) => {
                console.log(`GetUser:Status = ${resp} and ${status}`)
                if (status === 'success') {
                    resolve({ users: resp});
                } else {
                    reject(resp);
                }
            });
        });
    }

    update(user: User) {
        return new Promise((resolve, reject) => {
            $.post(updateUserURL, user, (resp, status) => {
                console.log(`Reg:Status = ${resp} and ${status}`)
                if (status === 'success') {
                    resolve();
                } else {
                    reject(resp);
                }
            });
        });
    }
    remove(userId: string) {
        return new Promise((resolve, reject) => {
            $.post(removeUserURL, { userId: userId}, (resp, status) => {
                console.log(`Reg:Status = ${resp} and ${status}`)
                if (status === 'success') {
                    resolve();
                } else {
                    reject(resp);
                }
            });
        });
    }


}

let remote = new Remote();

export default remote;
