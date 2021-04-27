import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private _navCtrl: NavController,
  ) { }

  ngOnInit() {

  }

  public goToQuestion() {
    
    this._navCtrl.navigateForward('/question', {
      animated: true,
      animationDirection: "forward",
    });
  }
}
