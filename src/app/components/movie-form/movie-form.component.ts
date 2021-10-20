import { Component, HostBinding, OnInit } from '@angular/core';
import { Movie }from 'src/app/models/Movies'
import { ActivatedRoute, Router } from '@angular/router'

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  movie: any = {
    mov_id: undefined,
    mov_title: '',
    mov_year: '',
    mov_time: '',
    mov_lang: '',
    mov_dt_rel: new Date(),
    mov_rel_country: '',
  }

  edit: boolean = false;

  constructor(private moviesService: MoviesService, private router: Router, private activedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id){
      this.moviesService.getMovie(params.id).subscribe(
        res => {
          console.log(res)
          this.movie = res;
          this.movie.mov_dt_rel = this.movie.mov_dt_rel.substring(0, 10);
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewMovie(){
    delete this.movie.mov_id;

    this.moviesService.saveMovie(this.movie)
        .subscribe(
          res => {
            console.log(res)
            this.router.navigate(['/movies']);
          },
          err => console.error(err)
        )
  }

  updateMovie(){
    this.moviesService.updateMovie(this.movie.mov_id, this.movie)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/movies']);
        },
        err => console.log(err)
      )
  }

}
