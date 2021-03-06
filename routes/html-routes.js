/*
 * serves html files
 */
var path = require('path');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/index.html'));
    });

    app.get('/contact', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/contact.html'));
    });

    app.get('/portfolio', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/portfolio.html'));
    });

    app.get('/hangman', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/hangman.html'));
    });

    app.get('/crystals', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/crystals.html'));
    });

    app.get('/trivial', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/trivial.html'));
    });

    app.get('/giphy', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/giphy.html'));
    });

    app.get('/rps-multiplayer', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/rps-multiplayer.html'));
    });

    app.get('/teameich', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/html/teameich.html'));
    });
};