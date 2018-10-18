import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

const typeDefs = `
schema {
  query: Query
}
type Query {
  hello: String
  name: String
}
`;

const resolvers = {
  Query: {
    hello: () => 'World',
    name: () => 'James',
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(4000, () => {
  console.log(`Go to http://localhost:4000/graphiql to run queries!`);
});