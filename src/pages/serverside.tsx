import { gql, useMutation, useQuery } from '@apollo/client';
import { GetServerSideProps, NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { client } from '~/apollo';
import { Book } from '~/types';

interface Props {
    books: Book[];
}

const ADD_BOOK = gql`
    mutation AddBook($name: String!, $authorId: Int!) {
        addBook(name: $name, authorId: $authorId) {
            id
            name
            author {
                name
            }
        }
    }
`;

const GET_ALL_BOOKS = gql`
    query Books {
        books {
            id
            name
            author {
                name
            }
        }
    }
`;

const Books: NextPage<Props> = ({ books }) => {
    const [dataToUse, setDataToUse] = useState(books);
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: GET_ALL_BOOKS }],
    });

    const [newBook, setNewBook] = useState({
        name: '',
        authorId: '',
    });

    const handleChange = (name: string, value: any) => {
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();

        await addBook({
            variables: {
                name: newBook.name,
                authorId: parseInt(newBook.authorId),
            },
        });
    };

    const getButtonText = () => {
        if (error) return 'Error!';
        if (loading) return 'Loading...';

        return 'Add book';
    };

    useEffect(() => {
        if (data) {
            setDataToUse([...dataToUse, { ...data.addBook }]);
        }
    }, [data]);

    return (
        <div>
            {dataToUse.map((book) => {
                return (
                    <div key={book.id}>
                        <h1>{book.name}</h1>
                        <h3>{book.author?.name}</h3>
                    </div>
                );
            })}
            <div
                style={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                onSubmit={handleSubmit}
            >
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '10rem',
                    }}
                >
                    <label htmlFor="bookName">Book Name</label>
                    <input
                        id="bookName"
                        name="name"
                        value={newBook.name}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                    />
                    <label htmlFor="authorId">Author Id</label>
                    <input
                        id="authorId"
                        name="authorId"
                        value={newBook.authorId}
                        onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                        }
                    />
                    <button
                        disabled={loading}
                        type="submit"
                    >
                        {getButtonText()}
                    </button>
                </form>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    // ...
    const { data } = await client.query({
        query: GET_ALL_BOOKS,
    });

    return {
        props: {
            books: data.books,
        },
    };
};

export default Books;
