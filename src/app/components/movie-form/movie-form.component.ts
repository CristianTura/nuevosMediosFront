import { Component, HostBinding, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movies';
import { ActivatedRoute, Router } from '@angular/router';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  movie: any = {
    mov_id: undefined,
    mov_title: '',
    mov_img: '',
    mov_descript: '',
    mov_link: '',
    mov_labels: '',
    mov_dt_rel: '',
  };

  edit: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.moviesService.getMovie(params.id).subscribe(
        (res) => {
          console.log(res);
          this.movie = res;
          // this.edit = true;
        },
        (err) => console.error(err)
      );
    }
  }

}
