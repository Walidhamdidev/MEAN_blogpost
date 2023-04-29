import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  email: any;
  password: any;

  login() {
    this.authService.loginAuthor(this.email, this.password).subscribe(
      (res) => {
        localStorage.setItem('author', JSON.stringify(res));
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {}
}
