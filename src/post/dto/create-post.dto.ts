import { Post } from '../entities/post.entity';

export type CreatePostDto = Omit<Post, 'id' | 'createdAt' | 'updatedAt'> & {};
