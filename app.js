const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express(); //express static
hbs.registerPartials(__dirname + '/views/partials'); //partial views (include)
app.set('view engine', 'hbs'); //set configurations

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server log!');
        }
    });
    console.log(log);
    next();
}); //register middleware

// app.use((req, res, next) => {
//     res.render('maintenance.hbs'); //maintenance middleware
// });

app.use(express.static(__dirname + '/public')); //register static middleware

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});