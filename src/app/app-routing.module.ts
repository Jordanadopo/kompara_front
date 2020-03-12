import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRequeteComponent } from './search-requete/search-requete.component';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Routes = [
  /*{ path: 'result',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },*/
  { path: '',
  component: SearchRequeteComponent,
},
  /*{
    path: 'result',
    component: SearchResultsComponent
  }*/
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
