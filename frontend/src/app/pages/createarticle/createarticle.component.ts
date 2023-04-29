import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css'],
})
export class CreatearticleComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}
  article = {
    title: '',
    description: '',
    content: '',
    tag: '',
  };
  image: any;
  authorId: any;
  tags: string[] = [];

  selectFile(event: any) {
    this.image = event.target.value;
  }

  addTag() {
    if (this.article.tag !== '') this.tags.push(this.article.tag);
    this.article.tag = '';
  }

  create() {
    const result = localStorage.getItem('author');
    if (result) this.authorId = JSON.parse(result)['author']['authorId'];

    const formData = new FormData();
    formData.append('title', this.article.title);
    formData.append('description', this.article.description);
    formData.append('content', this.article.content);
    for (let i = 0; i < this.tags.length; i++) {
      formData.append('tags[]', this.tags[i]);
    }
    formData.append('image', this.image);
    formData.append('authorId', this.authorId);

    this.dataService.createArticle(formData).subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
