const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true });
const port = 8016;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

//   mongoose model iska mtlb schema ko final kr dia
  const contact = mongoose.model('contact', contactSchema);

// express static stuff
app.use('/static', express.static('static'));  //serving static files
app.use(express.urlencoded())                 // this function  is used so that out user data can be easily encoded to express


// pug specific stuff
app.set('view engine', 'pug');        // set the template engine as pug
app.set('views', path.join(__dirname, 'views'));   // set the views directory

// endpoints

app.get('/', (req, res) => {
    
    const params = { }
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
    
    const params = { }
    res.status(200).render('contact.pug', params)
})
app.post('/contact', (req, res) => {
    
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    // res.status(200).render('contact.pug')
})


// start the server
app.listen(port, () => {
    console.log(`the application started succesfully on port ${port}`)
});

