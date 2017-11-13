import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheService } from "ionic-cache";
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userInfo;
  public timestamp;

  constructor(public navCtrl: NavController,  
              public navParams: NavParams,
              cache: CacheService,
              user: UserProvider) {
    
              this.userInfo = user.getUser();
  }

  ionViewDidLoad() {
    console.log(this.userInfo.info);

  }



}
