import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AudioFilesService } from '../audio-files.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // instantiate posts to an empty array
  posts: any = [];
  hasAllAudiosFilesCompleted: boolean = null;

  constructor(private postsService: PostsService, private audioFilesService: AudioFilesService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });

    this.audioFilesService.getAllAudioFiles().subscribe(hasAllAudiosFilesCompleted => {
      this.hasAllAudiosFilesCompleted = hasAllAudiosFilesCompleted;
    })
  }
}
