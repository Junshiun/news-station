import { Component, OnInit } from '@angular/core';
import { NewsFetchServiceService } from 'src/app/services/newsFetchService/news-fetch-service.service';

@Component({
  selector: 'app-top-news-bottom',
  templateUrl: './top-news-bottom.component.html',
  styleUrls: ['./top-news-bottom.component.scss']
})
export class TopNewsBottomComponent implements OnInit {

  constructor(private _newsFetchService:NewsFetchServiceService) { }

  topNews: any;
  topNewsLoad: number = 0;

  ngOnInit(): void {
    this._newsFetchService.topNewsLoad$.subscribe(state => {
      this.topNewsLoad = state
    })

    this._newsFetchService.topNews$.subscribe(news => {
      this.topNews = news.splice(1, 10);
    })
  }

}
