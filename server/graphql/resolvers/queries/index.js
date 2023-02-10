const { authors, books } = require('../../database');

const getAllBooks = () => {
    return books;
};

const getAllAuthors = () => {
    return authors;
};

const getBooksByAuthor = (author) => {
    return books.filter((book) => book.authorId === author.id);
};

const findBookById = (parent, args) => {
    return books.find((book) => book.id === args.id);
};

const getAuthorByBook = (book) => {
    return authors.find((author) => author.id === book.authorId);
};

const findAuthorById = (parent, args) =>
    authors.find((author) => author.id === args.id);

module.exports = {
    getAllAuthors,
    getBooksByAuthor,
    getAuthorByBook,
    findBookById,
    getAllBooks,
    findAuthorById,
};
