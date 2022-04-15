import { NewsFetchServiceService } from 'src/app/services/newsFetchService/news-fetch-service.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CATEGORY } from 'src/app/services/newsFetchService/news-fetch-service.service';

import { PAGE_NUM } from 'src/app/services/newsFetchService/news-fetch-service.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  category: any;
  categoryPageLoad: number = 0;
  categoryPageNews: any;
  categoryPage: number = 0;

  loopsNum: any = Array(5);
  private _status: number = 0;
  subscribes: any = [];

  constructor(private _route:ActivatedRoute, private _router:Router, private _newsFetchService:NewsFetchServiceService) {
  }

  ngOnInit(): void {
    this._status = 0;
   
    this.pageNavigate();

    this._newsFetchService.categoryPageLoad$.subscribe(status => {
      this.categoryPageLoad = status;
    })

    this.subscribes.push(this._newsFetchService.categoryPageNews$.subscribe(news => {
      console.log(news);
      this.categoryPageNews = news;
    }))

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ngAfterViewInit() {
    this._status = 1;
    this.buttonsActive();
  }

  ngOnDestroy() {
    this.subscribes.forEach((element:any) => {
      element.unsubscribe();
    });
  }

  pageNavigate() {

    this._route.paramMap.subscribe( paramMap => {
      this.category = paramMap.get('category');

      let categoryExists = CATEGORY.some((element:any) => {
        return (element === this.category)
      })

      this._route.queryParams.subscribe(params => {
        let page = params["page"];

        if (page == this.categoryPage){
          return;
        }
        else if ((page > 0) && (page < 6))
          this.categoryPage = page;
        else
          this.categoryPage = 1;

        if (this._status === 1)
          this.buttonsActive();

        if (categoryExists === false)
          this._router.navigate(['']);
        else 
          this._newsFetchService.fetchCategoryPageNews(this.category, this.categoryPage);
      })
    })
  }

  pageClick(target:any) {

    if ((target === undefined) || (target === this.categoryPage))
      return

    this._router.navigate(["."], {
      relativeTo: this._route,
      queryParams: {
        page: target
      },
      //queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      //skipLocationChange: true
      // do not trigger navigation
    }).then(() => {
      window.location.reload();
    });
  }

  buttonsActive() {
    for (let i=0; i<this.loopsNum.length; i++) {

      let button:any = document.getElementById("pageButton-" + i);

      if ((i+1) == this.categoryPage)
        button.classList.add("active");
      else
        button.classList.remove("active");
    }
  }
}
