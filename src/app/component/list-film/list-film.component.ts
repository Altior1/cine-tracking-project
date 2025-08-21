import { Component } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { nextTick } from 'process';
import { error } from 'console';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-film',
  imports: [NgFor],
  templateUrl: './list-film.component.html',
  styleUrl: './list-film.component.css'
})
export class ListFilmComponent {
  public movies: Movie[] = [];
  constructor(private filmService: FilmService) {

  }
  ngOnInit() {
    this.filmService.getMovies(1, 10).subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      },
      complete: () => {
        console.log('Movie fetching complete');
      }
    });
  }
}
