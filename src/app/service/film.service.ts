import { Injectable } from '@angular/core';
import { Movie } from '../interface/movie';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private totalCount: string;
  private url: string = "http://localhost:3000/movies";
  constructor(private http: HttpClient) {
    this.totalCount = '0';
  }
  getTotalCount(): string | null {
    return this.totalCount;
  }
  getMovies(page: number, limit: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.url}?_page=${page}&_per_page=${limit}`, { observe: "response" }).
      pipe(
        map((response: any) => {
          return response?.body.data.map((data: any) => {
            let m: Movie = data;
            return m;
          });
        })
      );
  }
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`);
  }
  addFilm(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, movie).pipe(
      tap((newMovie: Movie) => {
        console.log(`Added movie with id=${newMovie.id}`);
      })
    );
  }
  deleteMovieById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => {
        console.log(`Deleted movie with id=${id}`);
      })
    );
  }
}
