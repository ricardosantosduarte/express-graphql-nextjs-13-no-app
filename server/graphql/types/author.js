const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');
const { getBooksByAuthor } = require('../resolvers/queries').default;
const BookType = require('./book');

module.exports = AuthorType;
