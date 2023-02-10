const { authors, books } = require('../../database');

const addBook = (parent, args) => {
    const book = {
        id: books.length + 1,
        name: args.name,
        authorId: args.authorId,
    };

    books.push(book);

    return book;
};

const addAuthor = (parent, args) => {
    const author = {
        id: authors.length + 1,
        name: args.name,
    };

    authors.push(author);

    return author;
};

const updateBook = (parent, args) => {
    const bookToUpdate = books.find((book) => book.id === args.id);

    if (!bookToUpdate) {
        return { message: 'unable to find book', errorCode: 404 };
    }

    bookToUpdate.name = args.name;

    return bookToUpdate;
};

module.exports = { addBook, addAuthor, updateBook };
