/**
 * Robo-Person API.
 * Version: 1.0.5
 */
const { PG } = require('../lib/roboPersonGenerator.js');
const fastify = require('fastify')();

const localCache = PG.generate(100);

fastify
.register(require('fastify-cors'))
.get('/', async (request) => {
  const { from, to } = request.query;
  if(from && to) {
    const nFrom = Number(from);
    const nTo = Number(to);
    if(nFrom >= 0 && nTo <= 100) {
      return localCache.slice(nFrom, nTo);
    }
  }
  return localCache;
})
.get('/generate', async () => PG.generate(100))
.get('/get/:count', async (request, reply) => {
  const { count } = request.params;
  if ( count && count > 0 && count <= 100 ) {
    return localCache.slice(0, count);
  }
  return localCache;
})
.get('/help', async () => 'API commands are: 1) /get/:count (-- take data partialy ) 2) /generate (-- generate new list ) 3) /?from=value&to=value (-- slice data from one index to another and get it )');

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
