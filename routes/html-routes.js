/*
 * serves html files
 */
var path = require('path');

module.exports = (app) => {

    app.get('/', (req, res) => {
        console.log("Any route path");
        res.sendFile(path.join(__dirname, '../public/html/index.html'));
    });

    app.get('/contact', (req, res) => {
        console.log("Contact route");
        res.sendFile(path.join(__dirname, '../public/html/contact.html'));
    });

    app.get('/portfolio', (req, res) => {
        console.log("portfolio route");
        res.sendFile(path.join(__dirname, '../public/html/portfolio.html'));
    });

    app.get('/hangman', (req, res) => {
        console.log("hangman route");
        res.sendFile(path.join(__dirname, '../public/html/hangman.html'));
    });

};