import { TopNewsComponent } from './../../components/top-news/top-news.component';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

//export const NEWS_BASE = "https://newsapi.org/v2/";
//export const NEWS_COUNTRY = "country=";
//export const NEWS_CATEORY = "category=";
//export const API_KEY = "&apiKey=5f41530bfcff4873862d913339acc518";

//export const EVERY_NEWS = "everything";
//export const TOP_NEWS = "top-headlines";

export const NEWS_BASE = "https://content.guardianapis.com/";
export const NEWS_SEARCH = "search?";
export const NEWS_CATEGORY = "section=";
export const PAGE_SIZE = "page-size=";
export const API_KEY = "api-key=31b5604b-361c-4a18-9a6d-de6101cc3821";

export const SHOW_FIELD_THUMB = "show-fields=all";
export const CATEGORY = ["world", "technology", "business", "sport", "film"];

@Injectable({
  providedIn: 'root'
})
export class NewsFetchServiceService {

  private _topNewsLoad:BehaviorSubject<number> = new BehaviorSubject(0);
  topNewsLoad$ = this._topNewsLoad.asObservable();

  private _topNews:Subject<any> = new Subject();
  topNews$ = this._topNews.asObservable();

  private _categoryNewsLoad:BehaviorSubject<any> = new BehaviorSubject(Array(CATEGORY.length).fill(0));
  categoryNewsLoad$ = this._categoryNewsLoad.asObservable();

  private _categoryNews:Subject<any> = new Subject();
  categoryNews$ = this._categoryNews.asObservable();

  private _categoryPageLoad:BehaviorSubject<number> = new BehaviorSubject(0);
  categoryPageLoad$ = this._categoryPageLoad.asObservable();

  private _categoryPageNews:Subject<any> = new Subject();
  categoryPageNews$ = this._categoryPageNews.asObservable();

  constructor() { }

  async fetchTopNews() {
    let fetchedNews:any;
    this._topNewsLoad.next(0);

    //fetchedNews = await fetch(NEWS_BASE + endpoint + "?" + NEWS_COUNTRY + country + API_KEY).then(res => res.json());
    //fetchedNews = await fetch(NEWS_BASE + endpoint + "?" + country + API_KEY).then(res => res.json());
    fetchedNews = await fetch(NEWS_BASE + NEWS_SEARCH + SHOW_FIELD_THUMB + "&" + API_KEY).then(res => res.json());

    /*
    this._topNews.next(fetchedNews.articles.filter((element:any) => {
      return (element.urlToImage !== null)
    }).map((element:any) => {
      let date = new Date(element.publishedAt)
      return {
        ...element,
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    })
    );*/

    this._topNews.next(fetchedNews.response.results.map((element:any) => {
      let date = new Date(element.webPublicationDate)
      return {
        ...element,
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      }
    }));

    this._topNewsLoad.next(1);
  }

  async fetchCategoryNews(category: any) {
    
    let newsArray: any = [];
    let loadArray: any = Array(CATEGORY.length).fill(0);
    this._categoryNewsLoad.next(loadArray);

    for (let i=0; i<category.length; i++){

      let fetchedNews:any;
      let filteredFetchNews: any;

      //fetchedNews = await fetch(NEWS_BASE + endpoint + "?" + NEWS_COUNTRY + country + "&" + NEWS_CATEORY + category[i] + API_KEY).then(res => res.json());
      //fetchedNews = await fetch(NEWS_BASE + endpoint + "?" + country + API_KEY).then(res => res.json());
      fetchedNews = await fetch(NEWS_BASE + NEWS_SEARCH + SHOW_FIELD_THUMB + "&" + NEWS_CATEGORY + category[i] + "&" + PAGE_SIZE + "15" + "&" + API_KEY).then(res => res.json());
      //console.log(NEWS_BASE + NEWS_SEARCH + SHOW_FIELD_THUMB + "&" + NEWS_CATEGORY + category[i] + "&" + PAGE_SIZE + "50" + "&" + API_KEY);

      filteredFetchNews = fetchedNews.response.results.map((element:any) => {
        let date = new Date(element.publishedAt)
        return {
          ...element,
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        }
      })
        
      newsArray.push(
        {
          "category":category[i],
          "news": filteredFetchNews
        }
      )

      loadArray[i] = 1;

      this._categoryNews.next(newsArray);

      this._categoryNewsLoad.next(loadArray);
    }
  }

  async fetchCategoryPageNews(category: string) {
    let fetchedNews:any;
    let filteredFetchNews: any;

    this._categoryPageLoad.next(0);

    fetchedNews = await fetch(NEWS_BASE + NEWS_SEARCH + SHOW_FIELD_THUMB + "&" + NEWS_CATEGORY + category + "&" + PAGE_SIZE + "16" + "&" + API_KEY).then(res => res.json());

    this._categoryPageLoad.next(1);

    this._categoryPageNews.next(fetchedNews.response.results);
  }
}
