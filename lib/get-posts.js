import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export default () => {
  let dir;
  try {
    dir = fs.readdirSync('./posts/');
  } catch (err) {
    // No posts yet
    return [];
  }
  const posts = dir
    .filter((file) => path.extname(file) === '.md')
    .map((file) => {
      const postContent = fs.readFileSync(`./posts/${file}`, 'utf8');
      const { data, content } = matter(postContent);

      if (data.published === false) {
        return null;
      }

      return { ...data, body: content, title: data.title.replace(' ', ' ') };
    })
    // filter by date wip
    .sort((a, b) => {
      new Date(b.date) - new Date(a.date);
    });
  // filter by slug
  // .filter(Boolean)
  // .sort((a, b) => a.slug.localeCompare(b.slug));

  return posts;
};
