import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: any = {}
  movies: any[] =[]
  favourites: any[] = []

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar : MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  /**
   * Retrieves user data from api
   * @function getUser
   */
  getUser(): void {
    let movies: any[] = [];
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.Favourites.includes(movie._id)) {
              this.favourites.push(movie);
              console.log(this.favourites)
            }
          });
        });
      });
    }
  }

  /**
   * opens dialog displaying a form to update account info
   */
  openEditDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: 'max-content'
    })
  }

  /**
   * Deletes user's account
   * Displays a confirmation pop up
   * Displays a success message
   * clears local storage
   * @function deleteUser
   */
  deleteUser(): void {
    if (confirm('Delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackbar.open('Your account was deleted', 'OK', {
          duration: 3000,
        });
        this.fetchApiData.deleteUser().subscribe(() => {
          localStorage.clear();
        })
      })
    }
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
   * Removes movie from user's favourites
   * reloads the page
   * @function removeFavourite
   * @param id 
   */
  removeFavourite(id: string): void {
    this.fetchApiData.removeFavourite(id).subscribe((resp: any) => {
      this.ngOnInit();
      window.location.reload();
    })
  }

}
