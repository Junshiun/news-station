import { NewsFetchServiceService } from 'src/app/services/newsFetchService/news-fetch-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//const CATEGORY = ["general", "business", "science", "technology", "health", "sports", "entertainment"]
import { CATEGORY } from 'src/app/services/newsFetchService/news-fetch-service.service';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.scss']
})
export class MainCategoriesComponent implements OnInit {

  categoryNewsLoad: any;
  categoryNews: any;

  constructor(private _newsFetchService: NewsFetchServiceService, private _router:Router) { }

  ngOnInit(): void {
    this._newsFetchService.categoryNewsLoad$.subscribe(status =>
      this.categoryNewsLoad = status
    )

    this._newsFetchService.categoryNews$.subscribe(object => {
      //console.log(object);
      this.categoryNews = object
    })

    //this.categoryNews = TEST_NEWS;

    this._newsFetchService.fetchCategoryNews(CATEGORY);
  }

  linkClick(target: string) {
    this._router.navigate([target]).then(() => {
      window.location.reload()
    });
  }

}
