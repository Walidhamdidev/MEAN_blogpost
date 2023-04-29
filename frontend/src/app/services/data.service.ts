import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.BLOGPOST_API;

  createArticle(article: any) {
    return this.http.post(`${this.apiUrl}/article`, article);
  }

  getAuthorById(id: any) {
    return this.http.get(`${this.apiUrl}/author/${id}`);
  }

  getArticles() {
    return this.http.get(`${this.apiUrl}/article`);
  }
}
