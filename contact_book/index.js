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

// DB schema
const contactSchema = mongoose.Schema({
    name:{type:String, require:true, unique:true},
    email:{type:String},
    phone:{type:String}
})
const Contact = mongoose.model('contact', contactSchema);

// Routes
// Home
app.get('/', (req, res) => {
    res.redirect('/contact');
})
// Contact - Index
app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) return res.json(err);
        res.render('contacts/index', {contacts:contacts});
    });
});
// Contacts - new
app.get('/contacts/new', (req, res) => {
    res.render('contacts/new');
});
// Contacts - create
app.post('/contacts', (req, res) => {
    Contact.create(req.body, (err, contact) => {
        if (err) return res.json(err);
        res.redirect('/contacts');
    });
});
// Contacts - show
app.get('/contacts/:id', (req, res) => {
    Contact.findOne({_id:req.params.id}, (err, contact) => {
        if (err) return res.json(err);
        res.render('contacts/show', {contact:contact});
    });
});
// Contacts - edit
app.get('/contacts/:id/edit', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
      if(err) return res.json(err);
      res.render('contacts/edit', {contact:contact});
    });
  });
// Contacts - update
app.put('/contacts/:id', (req, res) => {
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, (err, contact) => {
        if (err) return res.json(err);
        res.redirect('/contacts/' + req.params.id);
    });
});
// Contacts - destroy
app.delete('/contacts/:id', (req, res) => {
    Contact.deleteOne({_id:req.params.id}, (err) => {
        if (err) return res.json(err);
        res.redirect('/contacts');
    });
});

app.listen(port, () => {
    console.log(`server on! http://locathost:${port}`);
});