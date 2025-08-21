import { Component } from '@angular/core';
import { FilmService } from '../../service/film.service';

import { NgFor } from '@angular/common';
import { Movie } from '../../interface/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-film',
  imports: [NgFor, RouterLink],
  templateUrl: './list-film.component.html',
  styleUrl: './list-film.component.css'
})
export class ListFilmComponent {
  public page: number; // Default to the first page
  public movies: Movie[] = [];
  constructor(private filmService: FilmService) {
    this.page = 1;
  }
  onImageError(event: any) {
    const img = event.target as HTMLImageElement;
    img.src = 'image.png'; // Fallback image
  }
  loadPrecedent() {

  }
  loadSuivant() {

  }
  ngOnInit() {
    this.filmService.getMovies(this.page, 10).subscribe({
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
