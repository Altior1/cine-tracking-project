import { Component } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { Movie } from '../../interface/movie';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail-film',
  imports: [],
  templateUrl: './detail-film.component.html',
  styleUrl: './detail-film.component.css',
  standalone: true
})
export class DetailFilmComponent implements OnInit {
  private movieId: string;
  public movie!: Movie;
  constructor(private filmService: FilmService, private route: ActivatedRoute, private router: Router) {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
  }
  onLoadingImageError(event: any) {
    const image = event.target as HTMLImageElement;
    image.src = 'image.png'; // Fallback image
  }
  goBack() {
    this.router.navigate(['/films']);
  }
  onDeleteMovie() {
    if (window.confirm()) {
      this.filmService.deleteMovieById(this.movieId).subscribe({
        next: () => {
          console.log('Movie deleted successfully');
          this.goBack(); // Navigate back after deletion
        },
        error: (err: any) => {
          console.error('Error deleting movie:', err);
        }
      });
    }
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
