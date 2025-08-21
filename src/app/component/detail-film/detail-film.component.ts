import { Component } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { Movie } from '../../interface/movie';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-film',
  imports: [],
  templateUrl: './detail-film.component.html',
  styleUrl: './detail-film.component.css'
})
export class DetailFilmComponent {
  private movieId: string;
  public movie!: Movie;
  constructor(private filmService: FilmService, private route: ActivatedRoute) {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
  }
  onLoadingImageError(event: any) {
    const image = event.target as HTMLImageElement;
    image.src = 'image.png'; // Fallback image
  }
  goBack() {
    window.history.back();
  }

  ngOnInit() {
    this.filmService.getMovieById(this.movieId).subscribe({
      next: (data: any) => {
        this.movie = data;
      },
      error: (err: any) => {
        console.error('Error fetching movie details:', err);
      },
      complete: () => {
        console.log('Movie details fetching complete');
      }
    });
  }
}
