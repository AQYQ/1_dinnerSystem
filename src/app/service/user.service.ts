import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class UserService {

    public userInfo = new User();
    public userInfo$ = new Subject<any>();
    constructor() {
    }

}
