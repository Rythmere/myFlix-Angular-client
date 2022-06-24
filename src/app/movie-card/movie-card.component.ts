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

  /**
   * Retrieves all movies from the api
   * @function getMovies
   * @returns all movies data
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens dialog displaying movie details
   * @param title 
   */
  openMovieViewDialog(title: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        Title: title,
      },
      width: '500px'
    });
  }

  /**
   * opens dialog displaying director details
   * @param name 
   */
  openDirectorViewDialog(name: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name
      },
      width: '500px'
    });
  }

  /**
   * opens dialog displaying genre details
   * @param name 
   */
  openGenreViewDialog(name: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name
      },
      width: '500px'
    })
  }

  /**
   * Retrieves users favourite movies
   * @function getFavourites
   * @returns users favourite movies
   */
  getFavourites(): void {
    this.fetchApiData.getFavourites().subscribe((resp: any) => {
      this.favourites = resp
      console.log(this.favourites);
    })
  }

  /**
   * Checks if movie is favourited
   * @function isFavourite
   * @param id 
   * @returns true or false depending if the movie is favourited
   */
  isFavourite(id: string): boolean {
    return this.favourites.includes(id);
  }

  /**
   * Adds movie to user's favourites
   * @function addFavourite
   * @param id 
   */
  addFavourite(id: string): void {
    this.fetchApiData.addFavourite(id).subscribe((resp: any) => {
      this.ngOnInit();
    })
  }

  /**
   * Removes movie from user's favourites
   * @function removeFavourite
   * @param id 
   */
  removeFavourite(id: string): void {
    this.fetchApiData.removeFavourite(id).subscribe((resp: any) => {
      this.ngOnInit();
    })
  }

}
