import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IQuestion } from 'src/app/interface/i.question';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  public indexQuestion = 0;
  public question: IQuestion;
  public listResult: IQuestion[] = [];

  constructor(
    private _navCtrl: NavController,
    private _storage: StorageService) { }

  ngOnInit() {
    this.loadData();
  }

  private async loadData() {
    this.indexQuestion = 0;
    this.listResult = await this._storage.get('question');
    this.updateQuestion();
  }

  public lastQuestion() {
    --this.indexQuestion;
    this.updateQuestion();
  }

  public nextQuestion() {
    ++this.indexQuestion;
    if (this.indexQuestion < 10) {
      this.updateQuestion();
    } else {
      this.indexQuestion = 9;
    }
  }

  public updateQuestion() {
    this.question = this.listResult[this.indexQuestion];
  }

  public responseQuestion(response: string) {
    this.listResult[this.indexQuestion].response = this.listResult[this.indexQuestion].correct_answer == response;
    this.nextQuestion();
  }

  public closeQuestion() {
    this.listResult.forEach((item) => item.response = null)
    this._navCtrl.back();
  }

  public showResult() {
    this._storage.set('question',this.listResult);
    this._navCtrl.navigateForward('/result', {
      animated: true,
      animationDirection: "forward",
    });
  }

}
