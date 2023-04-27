import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthorComponent } from './pages/author/author.component';
import { CreatearticleComponent } from './pages/createarticle/createarticle.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticledetailComponent } from './pages/articledetail/articledetail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CoverComponent } from './pages/home/cover/cover.component';
import { BlogListComponent } from './pages/home/blog-list/blog-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ArchiveComponent } from './pages/archive/archive.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, AboutComponent, AuthorComponent, CreatearticleComponent, HomeComponent, ArticledetailComponent, LoginComponent, RegisterComponent, NotfoundComponent, PrivacyComponent, CoverComponent, BlogListComponent, ContactComponent, ArchiveComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
