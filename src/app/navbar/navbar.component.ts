import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = localStorage.getItem('user');
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Routes to movies page
   */
  toMovies(): void {
    this.router.navigate(['movies'])
  }

  /**
   * Routes to user profile page
   */
  toProfile(): void {
    this.router.navigate(['profile'])
  }
  
  /**
   * Log user out
   * clears local storage
   * re-routes to welcome page
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }
}
