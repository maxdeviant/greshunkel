'use strict';

const path = require('path');
const Greshunkel = require('../lib/greshunkel').Greshunkel;

const greshunkel = new Greshunkel({
    directory: path.join(__dirname, 'views')
});

greshunkel.compile('index', {
    title: 'Test',
    body: 'Happy void day!'
}).then((html) => {
    console.log(html)
}).catch((err) => {
    console.log(err);
});
