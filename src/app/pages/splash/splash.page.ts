import { Component, OnInit } from '@angular/core';
import { MESSAGE } from 'src/app/enums/e.message';
import { END_POINTS, HTTP_METHODS } from 'src/app/enums/e.request';
import { IQuestion } from 'src/app/interface/i.question';
import { RequestService } from 'src/app/services/request.service';
import { PresentersService } from 'src/app/services/utils/presenters.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private _request: RequestService,
    private _presenters: PresentersService) { }

  ngOnInit() {
    this.makeRequest();
  }

  private makeRequest() {
    this._presenters.showLoading();
    this._request.makeRequest(HTTP_METHODS.GET, END_POINTS.API, null, '?amount=10&difficulty=hard&type=boolean').then((response) => {
      if(response.status == 200){
        let listResult: IQuestion[] = response.body.results;
      }else{
        this._presenters.showToast(MESSAGE.NOT_STATUS_CODE);
      }
    }).catch((err) => {
      this._presenters.showToast(err);
    }).finally(() => {
      this._presenters.stopLoading();
    })
  }

}
