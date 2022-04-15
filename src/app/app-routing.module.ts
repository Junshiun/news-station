import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';

const routes: Routes = [
  { path: '', 
    component: MainPageComponent,
  },
  { path: ':category', 
    component: CategoryPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [MainPageComponent];
