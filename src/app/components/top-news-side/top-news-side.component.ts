import { Component, OnInit } from '@angular/core';
import { NewsFetchServiceService } from 'src/app/services/newsFetchService/news-fetch-service.service';

@Component({
  selector: 'app-top-news-side',
  templateUrl: './top-news-side.component.html',
  styleUrls: ['./top-news-side.component.scss']
})
export class TopNewsSideComponent implements OnInit {

  constructor(private _newsFetchService:NewsFetchServiceService) { }

  topNews: any;
  topNewsLoad: number = 1;

  ngOnInit(): void {
    
    this._newsFetchService.topNewsLoad$.subscribe(state => {
      this.topNewsLoad = state
    })

    this._newsFetchService.topNews$.subscribe(news => {
      this.topNews = news.splice(1, 10);
    })
    

    //this.topNews = TEST_NEWS.splice(1,10);
  }

}
