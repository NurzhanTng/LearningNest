import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private posts: Post[];
  private lastIndex: number;

  constructor() {
    this.posts = [];
    this.lastIndex = 0;
  }

  create(createPostDto: CreatePostDto): Post {
    console.log(
      `This action adds a new post: ${JSON.stringify(createPostDto)}`,
    );

    const currentTime = new Date().toISOString();
    const newPost = {
      id: this.lastIndex,
      createdAt: currentTime,
      updatedAt: currentTime,
      ...createPostDto,
    };

    this.posts.push(newPost);
    this.lastIndex += 1;
    return newPost;
  }

  findAll(): Post[] {
    console.log(`This action returns all post`);
    return this.posts;
  }

  findOne(id: number): Post | undefined {
    console.log(`This action returns a #${id} post`);
    return this.posts.find((post) => post.id === id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(
      `This action updates a #${id} post: ${JSON.stringify(updatePostDto)}`,
    );
    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new NotFoundException(`Post with id #${id} not found`);
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostDto,
      updatedAt: new Date().toISOString(),
    };

    return this.posts[postIndex];
  }

  remove(id: number) {
    console.log(`This action removes a #${id} post`);

    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new NotFoundException(`Post with id #${id} not found`);
    }

    this.posts.splice(postIndex, 1);
  }
}
