import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CacheService } from "ionic-cache";
import { UserProvider } from '../providers/user/user';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  public logStatus = "logStatus";
  public userToken = "userToken";
  public userInfo = "userInfo";

  constructor(public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public cache: CacheService,
              public user: UserProvider) {
    
    cache.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Profile', component: ProfilePage }
    ];

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    cache.getItem(this.logStatus).catch(() => {
      // show LoginPage if status is undefined
      loading.dismiss();
      this.rootPage = LoginPage;
    }).then((data) => {

      cache.getItem(this.userInfo).catch(() => {
        // fall here if item is expired or doesn't exist
      }).then((data) => {  
        
        if (data != null) {
          this.user.setUser(data);
          console.log("Good Day! " + this.user.getUser().info);
          loading.dismiss();
          this.rootPage = HomePage;
        }
      });
      
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  signOut() {

    let alert = this.alertCtrl.create({
      title: 'PinjamBuku',
      message: 'Are you sure to sign out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No sign out');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Good bye!');
            this.cache.clearAll();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();

  }
}
