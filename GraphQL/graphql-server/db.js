export const books = [
  {
    id: 1,
    title: 'The Awakening',
    price: 22,
    author: 'abc',
    publishedOn: new Date(),
  },
  {
    id: 2,
    title: 'City of Glass',
    price: 55,
    author: 'pqr',

    publishedOn: new Date(2023, 12, 25),
  },
  {
    id: 3,
    title: 'The Awakening Part 2',
    price: 24,
    author: 'abc',
    publishedOn: new Date(2025, 10, 25),
  },
];

export const authors = [
  { id: 1, name: 'abc', bookId: [1, 3] },
  { id: 2, name: 'pqr', bookId: [1, 2] },
];

export const reviews = [
  { id: 1, review: 'Good book', bookId: 1 },
  { id: 2, review: 'Very Good book', bookId: 1 },
  { id: 3, review: 'Good book', bookId: 2 },
  { id: 4, review: 'Bad book', bookId: 2 },
];
