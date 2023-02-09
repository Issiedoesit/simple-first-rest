require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require("body-parser")
/* resolves 
{ "message": "Subscriber validation failed: name: Path `name` is required., subscribedTo: Path `subscribedTo` is required."
}
*/

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => console.error(error) )

try {
db.once('open', () => console.log('Connected to Database') );
} catch (error) {
    console.error(error);
}

app.use(express.json())
app.use(cors())

const subscribersRouter = require('./routes/subscribers')

app.use('/subscribers', subscribersRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server Started on Port ${port}...`) )


