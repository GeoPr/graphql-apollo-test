require('dotenv').config()
const app = require('express')()
const mongoose = require('mongoose')
const { port, mongoUri } = require('./config')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const cors = require('cors')

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    app.listen(port, () => {
      console.log(`server has been started on ${port} port`)
    })
  } catch (e) {
		console.log(`server error ${e.message}`);
	}
}

start()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)