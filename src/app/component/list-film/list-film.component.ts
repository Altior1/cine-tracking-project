import { Component } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Movie } from '../../interface/movie';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-film',
  imports: [NgFor, RouterLink, ReactiveFormsModule],
  templateUrl: './list-film.component.html',
  styleUrl: './list-film.component.css'
})
export class ListFilmComponent {
  public filterForm: FormGroup;
  public page: number; // Default to the first page
  public movies: Movie[] = [];
  constructor(private filmService: FilmService, private router: Router, private fb: FormBuilder) {
    this.page = 1;
    this.filterForm = this.fb.group({
      title: ['']
    });
  }
  onFilter() {
    const filterValues = this.filterForm.value;
    this.filmService.getFilteredMovies(filterValues).subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Error fetching filtered movies:', err);
      }
    });
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
  ajouterFilm() {
    // Logic to add a film
    console.log('Add film button clicked');
    // Redirect to the add film page
    this.router.navigate(['/films/add']);
  }
}
