const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/hello', (req, res) => {
    res.render('hello', {name:req.query.nameQuery});
});

app.get('/hello/:nameParam', (req, res) => {
    res.render('hello', {name:req.params/nameParam});
});

app.listen(port, () => {
    console.log(`server on! http://localhost:${port}`);
});