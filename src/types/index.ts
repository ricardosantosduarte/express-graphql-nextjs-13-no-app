export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** This represents the author that wrote the book */
export type Author = {
  __typename?: 'Author';
  books: Maybe<Array<Maybe<Book>>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** This represents a book written by an author */
export type Book = {
  __typename?: 'Book';
  author: Maybe<Author>;
  authorId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

/**  Root Mutation */
export type Mutation = {
  __typename?: 'Mutation';
  /** Add an author */
  addAuthor: Maybe<Author>;
  /** Add book */
  addBook: Maybe<Book>;
  /** Update a book */
  updateBook: Maybe<Book>;
};


/**  Root Mutation */
export type MutationAddAuthorArgs = {
  name: Scalars['String'];
};


/**  Root Mutation */
export type MutationAddBookArgs = {
  authorId: Scalars['Int'];
  name: Scalars['String'];
};


/**  Root Mutation */
export type MutationUpdateBookArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** Root Query */
export type Query = {
  __typename?: 'Query';
  /** A single Author */
  author: Maybe<Author>;
  /** List of All Authors */
  authors: Maybe<Array<Maybe<Author>>>;
  /** A single Book */
  book: Maybe<Book>;
  /** List of All Books */
  books: Maybe<Array<Maybe<Book>>>;
};


/** Root Query */
export type QueryAuthorArgs = {
  id: InputMaybe<Scalars['Int']>;
};


/** Root Query */
export type QueryBookArgs = {
  id: InputMaybe<Scalars['Int']>;
};
