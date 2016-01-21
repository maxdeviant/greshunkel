'use strict';

const Greshunkel = require('../lib/greshunkel').Greshunkel;

const greshunkel = new Greshunkel({
    directory: __dirname + '/partials'
});

greshunkel.compile('interpolation', {
    title: 'V O I D',
    content: 'AAAAAAAAAAAAAAAAAAAAA'
}).then((html) => {
    console.log(html);
}).catch((err) => {
    console.log(err);
});
