import { Post } from '../entities/post.entity';

export type UpdatePostDto = Omit<Post, 'id' | 'createdAt' | 'updatedAt'> & {};
