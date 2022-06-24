import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  toMovies(): void {
    this.router.navigate(['movies'])
  }

  toProfile(): void {
    this.router.navigate(['profile'])
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }
}
