import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  author = {
    username: '',
    email: '',
    password: '',
    about: '',
  };

  image: any;

  selectFile(event: any) {
    this.image = event.target.value;
  }

  register() {
    const formData = new FormData();
    formData.append('username', this.author.username);
    formData.append('email', this.author.email);
    formData.append('password', this.author.password);
    formData.append('about', this.author.about);
    formData.append('image', this.image);

    this.authService.registerAuthor(formData).subscribe(
      (res: any) => {
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
