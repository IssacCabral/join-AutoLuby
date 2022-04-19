import express, {json} from 'express'
import mainRouter from './routes/mainRouter'

import Role from './app/models/Role'
import Permission from './app/models/Permission'

const PORT = process.env.SERVER_PORT
const app = express()

app.use(json())
app.use(mainRouter)

app.listen(PORT, async() => {
    // await connection.sync()
    console.log(`Listening on port ${PORT}`)
})

