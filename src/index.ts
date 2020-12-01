import { Server, Request, ResponseToolkit } from '@hapi/hapi';

const init = async () => {
  const server: Server = new Server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
      return 'Hello world';
    },
  });

  server.route({
    method: 'GET',
    path: '/test',
    handler: (request: Request, h: ResponseToolkit) => {
      return 'Test route';
    },
  });

  server.ext('onRequest', (request: Request, h: ResponseToolkit) => {
    request.setUrl('/test');
    return h.continue;
  });

  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
