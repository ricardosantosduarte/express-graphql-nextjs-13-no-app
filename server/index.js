const express = require('express');
const next = require('next');
const expressGraphql = require('express-graphql').graphqlHTTP;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const schema = require('./graphql/schema');

const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.use(
            '/graphql',
            expressGraphql({
                graphiql: true,
                schema,
            })
        );

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
