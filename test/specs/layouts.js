'use strict';

const path = require('path');
const should = require('should');
const Greshunkel = require('../greshunkel').Greshunkel;

let greshunkel = new Greshunkel({
    directory: path.join(__dirname, 'layouts')
});

describe('xXx Layouts xXx', () => {
    it('should be able to use a layout', () => {
        return greshunkel.compile('single').then((html) => {
            html.should.be.a.String();

            html.should.equal('<!DOCTYPE html>\n<html>\n<head>\n' +
                '    <title>V O I D</title>\n</head>\n<body>\n' +
                '    <p>Everything is meaningless.<p>\n</body>\n</html>\n');
        });
    });
});
