export const news = Array(10)
  .fill({})
  .map((_, index) => ({
    publishedAt: `publishedAt-${index}`,
    content: `content-${index}`,
    source: `source-${index}`,
    author: `author-${index}`,
    title: `title-${index}`,
    image: `image-${index}`,
    url: `url-${index}`,
    id: `${index}`,
    __typename: 'Article',
  }));
