import express from 'express'
import appRenderer from './middleware/appRenderer'

const app = express()

app.use(express.static('public'))

app.use(appRenderer())

app.listen(process.env.PORT || 3000)
