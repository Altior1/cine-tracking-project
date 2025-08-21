import { Injectable } from '@angular/core';
import { Movie } from '../interface/movie';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private totalCount: string | null = null;
  private url: string = "http://localhost:3000/movies";
  constructor(private http: HttpClient) { }
  getMovies(page: number, limit: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.url}?_page=${page}&_limit=${limit}`, { observe: "response" }).
      pipe(
        tap((res) => this.totalCount = res.headers.get("X-Total-Count")),
        map((response: any) => {
          return response?.body.map((data: any) => {
            let m: Movie = data;
            return m;
          });
        })
      );
  }
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`);
  }
}
