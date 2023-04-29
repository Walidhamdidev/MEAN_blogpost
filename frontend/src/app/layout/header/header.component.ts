import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  authorId: any;
  isLoggedIn = false;
  getIdFromLocal() {
    const result = localStorage.getItem('author');
    if (result) {
      this.authorId = JSON.parse(result)['author']['authorId'];
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('author');
  }

  ngOnInit(): void {
    this.getIdFromLocal();
  }
}
