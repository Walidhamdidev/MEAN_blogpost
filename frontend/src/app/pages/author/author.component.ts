import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  author = {
    image: '',
    username: '',
    email: '',
    about: '',
  };

  authorArticles: any;

  ngOnInit(): void {
    const authorId = this.activeRoute.snapshot.paramMap.get('id');

    this.dataService
      .getArticles()
      .pipe(
        map((articles: any) =>
          Object.keys(articles).map((key) => ({ ...articles[key], id: key }))
        ),
        map((articles: any[]) =>
          articles.filter((article) => article.authorId === authorId)
        )
      )
      .subscribe(
        (res) => {
          this.authorArticles = res;
        },
        (error) => {
          console.log(error);
        }
      );

    this.dataService.getAuthorById(authorId).subscribe(
      (res: any) => {
        this.author = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
