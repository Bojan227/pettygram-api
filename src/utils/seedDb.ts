import { faker } from '@faker-js/faker';
import Post from '../models/postModel';

export default async function seedDB() {
  // Connection URL

  try {
    const posts = [];

    for (let i = 0; i < 20; i++) {
      const createdBy = '634559e08c04c0d02ad68d97';
      const imageUrl = [faker.image.city(1234, 2345, true)];
      const imageId = [i];
      const text = faker.lorem.text();
      const likes: string[] = [];
      const createdAt = new Date();
      const newPost = {
        createdBy,
        createdAt,
        imageUrl,
        text,
        imageId,
        likes,
      };

      posts.push(newPost);
    }
    Post.insertMany(posts);

    console.log('Database seeded! :)');
  } catch (err) {
    console.log(err.stack);
  }
}
