
const { PG } = require('./pg.js');

// Require the framework and instantiate it
const fastify = require('fastify')()

fastify.register(require('fastify-cors'))

// Declare a route
fastify.get('/', async (request, reply) => {
  return PG.generate(100);
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT, '0.0.0.0')
  } catch (err) {
    process.exit(1)
  }
}
start()