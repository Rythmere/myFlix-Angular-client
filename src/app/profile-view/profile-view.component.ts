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

  openEditDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: 'max-content'
    })
  }

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

  removeFavourite(id: string): void {
    this.fetchApiData.removeFavourite(id).subscribe((resp: any) => {
      this.ngOnInit();
      window.location.reload();
    })
  }

}
