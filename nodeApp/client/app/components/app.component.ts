
import { Component, NgZone } from '@angular/core';
import Remote from "../services/remote.service"

declare const gapi: any;

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = "Users";
    constructor(private zone:NgZone) {
    }

    fetch() {
    }

    onCreatePost() {
        //this.fetch();
    }

}
