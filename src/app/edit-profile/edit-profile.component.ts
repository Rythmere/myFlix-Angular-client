// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: any = {};

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar) { }
  

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user's curent data
   * @function getUser
   * @returns The current user data
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    })
  }

  /**
   * Updates user data
   * Displays success message
   * Reloads the page
   * @function editUser
   * @returns updated user data
   */
  editUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((resp) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     localStorage.setItem('user', resp.Username);
     this.snackBar.open('Profile updated', 'OK', {
        duration: 2000
     });
     window.location.reload();
    });
  }
}
