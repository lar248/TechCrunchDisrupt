import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './posts.service';
<<<<<<< HEAD
import { AudioFilesService } from './audio-files.service';
=======
import { GenerateArticleSummaryService } from './generate-article-summary.service';
>>>>>>> 98f8bc2... Implement POS tagging and summary api endpoint

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent //NOTE: This is where PostsComponent is injected, for example
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
<<<<<<< HEAD
  providers: [PostsService, AudioFilesService], // Add the posts service
=======
  providers: [PostsService, GenerateArticleSummaryService], // Add the posts service
>>>>>>> 98f8bc2... Implement POS tagging and summary api endpoint
  bootstrap: [AppComponent]
})
export class AppModule { }
