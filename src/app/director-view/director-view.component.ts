import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  director: any

  /**
   * Injects data from MovieViewComponent, MovieCardComponent, or ProfileViewComponent depending on which component calls this one
   * Injected data is used to call the api to receive director object
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
    this.getDirector()
  }

  /**
   * Retrieves director data from the api 
   * @function getDirector
   * @returns director data
   */
  getDirector(): any {
    const data = this.data;
    console.log(this.data);
    this.fetchApiData.getDirector(data.Name).subscribe((resp: any) => {
      this.director = resp;
      console.log(this.director);
      return this.director;
    });
  }

}
