// server.js
import {ApolloServer} from 'apollo-server-express';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import express from 'express';
import db from './utils/db';
import {checkAuth} from './utils/auth';
import helmet from 'helmet';

const port = process.env.HTTP_PORT || 3000;

(async () => {
  try {
    const server = new ApolloServer(
        {
          typeDefs,
          resolvers,
          context: async ({req}) => {
            if (req) {
              const user = await checkAuth(req);
              // const user = true;
              return {user, req};
            }
          },
        });

    const app = express();
    
    // allow Apollo Graphql API usage 
    app.use(
        helmet({
          crossOriginEmbedderPolicy: false,
          contentSecurityPolicy: false,
        }),
    );

    await server.start();

    server.applyMiddleware({app});

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    console.log(server.graphqlPath);
    db.on('connected', () => {
      if (process.env.NODE_ENV === 'production') {
        (async () => (await import('./utils/production')).default(app,
            port))();
      } else {
        (async () => (await import('./utils/localhost')).default(app,
            port))();
      }
    });

  } catch (e) {
    console.log('server error: ' + e.message);
  }
})();
