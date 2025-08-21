import { Routes } from '@angular/router';
import { ListFilmComponent } from './component/list-film/list-film.component';
import { DetailFilmComponent } from './component/detail-film/detail-film.component';
import { MovieAddComponentComponent } from './movie-add-component/movie-add-component.component';

export const routes: Routes = [
    { path: 'films', component: ListFilmComponent },
    { path: '', redirectTo: '/films', pathMatch: 'full' },
    { path: 'films/add', component: MovieAddComponentComponent },
    { path: 'films/:id', component: DetailFilmComponent },
];
