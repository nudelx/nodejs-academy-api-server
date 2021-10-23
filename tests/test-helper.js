const { server } = require('../server')

after(() => {
  server.close()
})
