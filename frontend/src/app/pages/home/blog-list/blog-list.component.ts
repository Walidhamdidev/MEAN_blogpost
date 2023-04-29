import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  constructor(private dataService: DataService) {}
  articles: any = [];

  ngOnInit(): void {
    this.dataService.getArticles().subscribe(
      (res: any) => {
        this.articles = res;
        console.log(this.articles);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
