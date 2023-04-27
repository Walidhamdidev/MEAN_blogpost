import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthorComponent } from './pages/author/author.component';
import { ArticledetailComponent } from './pages/articledetail/articledetail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { CreatearticleComponent } from './pages/createarticle/createarticle.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'createarticle', component: CreatearticleComponent },
  { path: 'articledetails', component: ArticledetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
