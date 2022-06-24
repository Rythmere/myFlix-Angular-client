import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {
  movie: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Title: string},
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): any {
    const data = this.data;
    console.log(this.data);
    this.fetchApiData.getMovie(data.Title).subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
      return this.movie;
    });
  }

  openDirectorViewDialog(name: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name
      },
      width: '500pc'
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

}
