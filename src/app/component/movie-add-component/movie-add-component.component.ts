import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from '../../interface/movie';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmService } from '../../service/film.service';

@Component({
  selector: 'app-movie-add-component',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './movie-add-component.component.html',
  styleUrl: './movie-add-component.component.css'
})
export class MovieAddComponentComponent {
  public movieForm: FormGroup;

  constructor(private fb: FormBuilder, private filmService: FilmService, private router: Router) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      releaseDate: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.movieForm.valid) {
      const movie: Movie = this.movieForm.value;
      this.filmService.addFilm(movie).subscribe({
        next: () => {
          this.router.navigate(['/films']);
        },
        error: (err: any) => {
          console.error('Error adding movie:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
