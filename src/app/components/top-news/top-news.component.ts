import { Component, OnInit } from '@angular/core';
import { NewsFetchServiceService } from 'src/app/services/newsFetchService/news-fetch-service.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {

  topNewsLoad: number = 1;
  topNews: any;

  constructor(private _newsFetchService:NewsFetchServiceService) { }

  ngOnInit(): void {

    this._newsFetchService.topNewsLoad$.subscribe(status => {
      this.topNewsLoad = status;
    })

    this._newsFetchService.topNews$.subscribe(news => {
      this.topNews = news;
    })

    this.fetchTopNews();

    //this.topNews = TEST_NEWS;
  }

  fetchTopNews() {
    this._newsFetchService.fetchTopNews();
  }
}