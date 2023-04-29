import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.BLOGPOST_API;

  registerAuthor(author: any) {
    return this.http.post(`${this.apiUrl}/author/signup`, author);
  }

  loginAuthor(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/author/signin`, { email, password });
  }
}
