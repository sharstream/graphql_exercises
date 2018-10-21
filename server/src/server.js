import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
// import { graphql } from 'graphql';
import typeDefs from './typedefs.js';
import resolvers from './resolvers.js';
// import { findAuthorsByBookIdsLoader } from './author';
import loaders from './loader';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use(cors());

app.use('/graphql',
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
    context: {
      loaders: loaders()
    }
  }))
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(4000, () => {
  console.log(`Go to http://localhost:4000/graphiql to run queries!`);
});