const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
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

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

app.listen(port, () => {
    console.log(`server on! http://locathost:${port}`);
});