import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favourites: any[] = [];
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies()
    this.getFavourites()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openMovieViewDialog(title: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
      },
      width: '500px'
    });
  }

  openDirectorViewDialog(name: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name
      },
      width: '500px'
    });
  }

  openGenreViewDialog(name: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name
      },
      width: '500px'
    })
  }

  getFavourites(): void {
    this.fetchApiData.getFavourites().subscribe((resp: any) => {
      this.favourites = resp
      console.log(this.favourites);
    })
  }

  isFavourite(id: string): boolean {
    return this.favourites.includes(id);
  }

  addFavourite(id: string): void {
    this.fetchApiData.addFavourite(id).subscribe((resp: any) => {
      this.ngOnInit();
    })
  }

  removeFavourite(id: string): void {
    this.fetchApiData.removeFavourite(id).subscribe((resp: any) => {
      this.ngOnInit();
    })
  }

}
