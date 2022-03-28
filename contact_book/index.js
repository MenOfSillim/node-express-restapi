const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// DB setting
mongoose.connect("mongodb://127.0.0.1:27017/contact_book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    "auth": {
        "authSource": "contact_book"
    },
    "user": "rubok",
    "pass": "213216"
}).then(() => 
    console.log('Successfully connected to mongoDB!')
).catch(e => 
    console.error(e)
);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`server on! http://locathost:${port}`);
});