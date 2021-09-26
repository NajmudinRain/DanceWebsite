const express= require('express');
const path=require('path');
// const fs=require('fs');
const app=express();
const port=80;
const mongoose = require('mongoose');
const bodyparse=require('body-parser')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
    
  });

  const Contact = mongoose.model('Contact', contactSchema);

 
// Express specific stuff 
app.use('/static',express.static('static')); //for serving static files
app.use(express.urlencoded());

//Pug specific stuff
app.set('view engine','pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory from where we want to read our template file

// ENDPOINTS 
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    }); 
    // res.status(200).render('contact.pug',);
}) 

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});