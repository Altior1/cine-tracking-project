import { Routes } from '@angular/router';
import { ListFilmComponent } from './component/list-film/list-film.component';
import { DetailFilmComponent } from './component/detail-film/detail-film.component';

export const routes: Routes = [
    { path: 'films', component: ListFilmComponent },
    { path: '', redirectTo: '/films', pathMatch: 'full' },
    { path: 'films/:id', component: DetailFilmComponent }
];
