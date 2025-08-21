import { Component } from '@angular/core';
import { FilmService } from '../../service/film.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { Movie } from '../../interface/movie';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-list-film',
  imports: [NgFor, RouterLink, ReactiveFormsModule],
  templateUrl: './list-film.component.html',
  styleUrl: './list-film.component.css',
  standalone: true
})

export class ListFilmComponent implements OnInit {
  public page: number; // Default to the first page
  public movies: Movie[] = [];
  public searchForm: FormGroup;
  public isLoading: boolean = false;
  public searchResults$: Observable<Movie[]> = new Observable<Movie[]>();

  constructor(private filmService: FilmService, private router: Router, fb: FormBuilder) {
    this.searchForm = fb.group({
      searchTerm: ['']
    });
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
  ngOnInit(): void {
    this.searchResults$ = this.searchForm.valueChanges.pipe(
      tap(() => console.log('Search term changed:', this.searchForm.valueChanges)),
      // 1. Attendre 300ms après la dernière frappe
      debounceTime(300),
      // 2. Ne pas lancer la recherche si le texte n'a pas changé
      distinctUntilChanged(),
      // 3. Afficher un indicateur de chargement
      tap(() => this.isLoading = true),
      // 4. Annuler la recherche précédente et lancer la nouvelle
      switchMap(searchTerm => this.filmService.getFilteredMovies(searchTerm)),
      // 5. Cacher l'indicateur de chargement
      tap(() => this.isLoading = false)
    );
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
