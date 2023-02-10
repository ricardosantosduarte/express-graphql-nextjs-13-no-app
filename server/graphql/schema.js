const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');
const {
    getAuthorByBook,
    findBookById,
    getAllBooks,
    findAuthorById,
    getBooksByAuthor,
    getAllAuthors,
} = require('./resolvers/queries');

const { addBook, addAuthor, updateBook } = require('./resolvers/mutations');

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt),
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        authorId: {
            type: GraphQLNonNull(GraphQLInt),
        },
        author: {
            type: AuthorType,
            resolve: getAuthorByBook,
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents the author that wrote the book',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt),
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        books: {
            type: GraphQLList(BookType),
            resolve: getBooksByAuthor,
        },
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A single Book',
            args: {
                id: {
                    type: GraphQLInt,
                },
            },
            resolve: findBookById,
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: getAllBooks,
        },
        author: {
            type: AuthorType,
            description: 'A single Author',
            args: {
                id: {
                    type: GraphQLInt,
                },
            },
            resolve: findAuthorById,
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: getAllAuthors,
        },
    }),
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: ' Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add book',
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString),
                },
                authorId: {
                    type: GraphQLNonNull(GraphQLInt),
                },
            },
            resolve: addBook,
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: addAuthor,
        },
        updateBook: {
            type: BookType,
            description: 'Update a book',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt),
                },
                name: {
                    type: GraphQLNonNull(GraphQLString),
                },
            },
            resolve: updateBook,
        },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

module.exports = schema;
