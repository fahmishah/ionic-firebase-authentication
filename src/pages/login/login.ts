import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { CacheService } from 'ionic-cache';
import { UserProvider } from '../../providers/user/user'

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public logStatus = "logStatus";
  public userToken = "userToken";
  public userInfo = "userInfo";

  

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public cache: CacheService,
              public user: UserProvider,
              private afAuth: AngularFireAuth) {


  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginEmail(email, password) {
    console.log("Email login");
  }

  loginFacebook() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    
    
    console.log("Facebook login");
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
            loading.dismiss();
            // This gives you a Facebook Access Token.
            var token = res.credential.accessToken;
            // The signed-in user info.
            var user = res.user;

            console.log(token);
            console.log(user);

            this.user.setUser(user);
            this.cache.saveItem(this.logStatus, true);
            this.cache.saveItem(this.userToken, token);
            this.cache.saveItem(this.userInfo, user);

            
            this.navCtrl.push(HomePage);
            this.navCtrl.setRoot(HomePage);


        });

  }

  loginGoogle() {
    
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        
        loading.present();
        
        
        console.log("Facebook login");
          this.afAuth.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                loading.dismiss();
                // This gives you a Facebook Access Token.
                var token = res.credential.accessToken;
                // The signed-in user info.
                var user = res.user;
    
                console.log(token);
                console.log(user);
    
                this.user.setUser(user);
                this.cache.saveItem(this.logStatus, true);
                this.cache.saveItem(this.userToken, token);
                this.cache.saveItem(this.userInfo, user);
    
                
                this.navCtrl.push(HomePage);
                this.navCtrl.setRoot(HomePage);
    
    
            });
    
      }

}
