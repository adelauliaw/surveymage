const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
//require model disini 




app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})