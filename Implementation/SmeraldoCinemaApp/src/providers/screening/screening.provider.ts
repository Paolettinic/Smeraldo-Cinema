import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Screening} from '../../models/screening.model';

@Injectable()
export class ScreeningProvider {
    
    //

    constructor(public http: Http) {
        console.log('Hello ScreeningProvider Provider');
    }
    
    //

}
