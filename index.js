import express from 'express'
import winston from 'winston'
import expressWinston from 'express-winston'

const app = express()
app.use(express.json())

expressWinston.responseWhitelist.push('body')
expressWinston.requestWhitelist.push('body')

expressWinston.bodyBlacklist.push('secret')

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
}));

app.post('/test', (req, res) => {
  res.send({
    foo: 'bar',
    secret: 1
  })
})

app.listen(3000)