import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
//import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule }    from '@angular/forms';
import { AppComponent } from './components/app.component';
import {AppNavBar} from "./components/appNavBar.component"
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { ServerService } from './services/server.service';
import { LoginComponent} from './components/login.component';
import { RegisterComponent} from './components/register.component';
import { HomeComponent } from './components/home.component'
import { EditUserComponent } from './components/editUser.component';

@NgModule({
    imports: [
        BrowserModule,
        BootstrapModalModule,
        AppRoutingModule,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent, AppNavBar, LoginComponent, RegisterComponent, HomeComponent, EditUserComponent],
    entryComponents: [

    ],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}],
    bootstrap: [AppComponent]
})
export class AppModule { }
