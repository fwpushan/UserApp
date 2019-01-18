import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
@Injectable()
export class ServerService {
    constructor(private http: Http) {}
}
