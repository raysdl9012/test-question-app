import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IQuestion } from 'src/app/interface/i.question';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  public correctResponse = 0
  public listResult: IQuestion[] = [];
  constructor(
    private _navCtrl: NavController,
    private _storage: StorageService) { }

  ngOnInit() {
    this.loadData();
  }

  public async loadData() {
    this.listResult = await this._storage.get('question');
    this.correctResponse = this.listResult.filter((item) => item.response).length;
  }

  public async cleanQuestion() {
    this.listResult.forEach((item) => item.response = null)
    this._storage.set('question', this.listResult);
    await this._storage.cleanDatabase();
  }

  private goToHomeApp() {
    this._navCtrl.navigateRoot('/splash', {
      animated: true,
      animationDirection: "forward",
    });
  }

  public restart() {
    this.cleanQuestion();
    this.goToHomeApp();
  }
}
