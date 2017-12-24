import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component ({
  moduleId: module.id,
  selector: 'user',
  templateUrl: 'user.component.html',
  providers: [PostsService]
})

export class UserComponent {

  name: string;
  address: address;
  hobbies: string[];
  showHobbies: boolean;
  posts: Posts[];

  constructor(private postsService: PostsService) {
    this.name = 'João';
    this.address = {
      street: 'Gerhard Heinrichs',
      city: 'Curitiba',
      state: 'PR'
    };
    this.hobbies = ['Hide de bicible', 'Play video games'];

    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  toggleHobbies() {
    this.showHobbies = !this.showHobbies;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
  }

  deleteHobby(i) {
    this.hobbies.splice(i, 1);
  }
}

interface address {
  street: string,
  city: string,
  state: string
}

interface Posts() {
  id: number,
  title: string,
  body: string
}
