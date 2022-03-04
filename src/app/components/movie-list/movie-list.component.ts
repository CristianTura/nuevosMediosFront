import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../../services/movies.service'
 
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any = []
  opcionSeleccionado: string = ''

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getMovies().subscribe(
      res => {
        this.movies = res
      },
      err => console.error(err)
    )
  }

  filterMovies() {

    if (this.opcionSeleccionado === 'Categoria'  ) {
      this.getMovies()
    } else {
      const filter = this.movies.filter((movie: { mov_labels: string | string[]; }) => {
        return movie.mov_labels.includes(this.opcionSeleccionado)
      })

      this.movies = filter
    }
  
  }


}
