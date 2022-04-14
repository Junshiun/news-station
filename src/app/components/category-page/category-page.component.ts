import { NewsFetchServiceService } from 'src/app/services/newsFetchService/news-fetch-service.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CATEGORY } from 'src/app/services/newsFetchService/news-fetch-service.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  category: any;
  categoryPageLoad: number = 0;
  categoryPageNews: any;

  constructor(private _route:ActivatedRoute, private _router:Router, private _newsFetchService:NewsFetchServiceService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe( paramMap => {
      this.category = paramMap.get('category');

      let categoryExists = CATEGORY.some((element:any) => {
        return (element === this.category)
      })
      
      if (categoryExists === false)
        this._router.navigate(['']);
      else 
        this._newsFetchService.fetchCategoryPageNews(this.category);
    })

    this._newsFetchService.categoryPageLoad$.subscribe(status => {
      this.categoryPageLoad = status;
    })

    this._newsFetchService.categoryPageNews$.subscribe(news => {
      console.log(news);
      this.categoryPageNews = news;
    })
  }
}
