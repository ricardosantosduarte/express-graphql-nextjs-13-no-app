const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');
const { getAuthorByBook } = require('../resolvers/queries').default;
const AuthorType = require('./author');

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

module.exports = BookType;
