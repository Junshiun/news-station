import { NewsFetchServiceService } from './../../services/newsFetchService/news-fetch-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _newsFetchService: NewsFetchServiceService, private _router:Router) { }

  ngOnInit(): void {
    this._newsFetchService.currentCategory$.subscribe(category => {

      let target:any = document.getElementsByClassName("categoriesList")[0].childNodes;
      //console.log(target);

      let array:any = Array.from(target);

      for (let i=0; i < array.length; i++) {
        if (array[i].innerHTML === category.toUpperCase()) {
          target[i].classList.add("active");
        }
        else 
          target[i].classList.remove("active");
      }
    })
  }

  linkClick(target:any) {
    let value = target.getAttribute("value");

    this._router.navigate([value]).then(() => {
      window.location.reload()
    });
  }
}
