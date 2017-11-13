import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  userToken: string;
  userInfo: object;

  constructor() {
    this.userToken = '';
    this.userInfo = {};
    console.log('Hello UserProvider Provider');
  }


  setUser(user) {
    // this.userToken = token;
    this.userInfo = user;       
  }

  getUser() {

    var obj = {
      // token:  this.userToken,
      info: this.userInfo
    };

    return  obj;
  }
}
