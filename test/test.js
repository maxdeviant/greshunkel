'use strict';

const Greshunkel = require('../lib/greshunkel').Greshunkel;

const greshunkel = new Greshunkel({
    directory: __dirname + '/partials'
});

greshunkel.compile('interpolation', {
    locals: {
        title: 'V O I D'
    }
}).then((html) => {
    console.log(html);
}).catch((err) => {
    console.log(err);
});
