import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from '../models/Movies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  API_URI = 'https://nuevosmedios.herokuapp.com';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`${this.API_URI}/movies`);
  }

  getMovie(id: string) {
    return this.http.get(`${this.API_URI}/movies/${id}`);
  }

}
