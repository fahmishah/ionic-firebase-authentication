import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { CacheService } from 'ionic-cache';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public cache: CacheService) {

                
  }
}
