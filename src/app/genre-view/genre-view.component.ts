import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  genre: any

  /**
   * Injects data from MovieViewComponent, MovieCardComponent, or ProfileViewComponent depending on which component calls this one
   * Injected data is used to call the api to receive the genre object
   * @param data 
   * @param fetchApiData 
   * @param dialog 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Name: string},
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getGenre()
  }

  /**
   * Retrieves genre data from api
   * @function getGenre
   * @returns genre data
   */
  getGenre(): any {
    const data = this.data;
    console.log(this.data);
    this.fetchApiData.getGenre(data.Name).subscribe((resp: any) => {
      this.genre = resp;
      console.log(this.genre);
      return this.genre;
    });
  }

}
