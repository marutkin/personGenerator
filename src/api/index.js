/**
 * Robo-Person API.
 * Version: 1.0.5
 */
const { PG } = require('../lib/roboPersonGenerator.js');
const fastify = require('fastify')();

const localCache = PG.generate(100);

fastify.register(require('fastify-cors'));
fastify.get('/', async () => localCache).get('/generate', async () => PG.generate(100));

// Run the server!
const start = async () => {
  try {
    const port = process.env.PORT || 5051;
    console.log('Fastify start! Port: ' + port);
    await fastify.listen(port, '0.0.0.0')
  } catch (err) {
    process.exit(1)
  }
}

start();
