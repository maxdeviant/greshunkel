'use strict';

const path = require('path');
const should = require('should');
const Greshunkel = require('../greshunkel').Greshunkel;

let greshunkel = new Greshunkel({
    directory: path.join(__dirname, 'variable-interpolation')
});

describe('xXx Variable Interpolation xXx', () => {
    it('should interpolate a single variable', () => {
        return greshunkel.compile('single-variable', {
            message: 'V O I D',
        }).then((html) => {
            html.should.be.a.String();

            html.should.equal('V O I D\n');
        });
    });

    it('should interpolate multiple instances of a single variable', () => {
        return greshunkel.compile('multiple-instances', {
            message: 'V O I D',
        }).then((html) => {
            html.should.be.a.String();

            html.should.equal('V O I D\nV O I D\n');
        });
    });

    xit('should allow two variables to be neighbors', () => {
        return greshunkel.compile('neighbors', {
            message: 'V O I D',
        }).then((html) => {
            html.should.be.a.String();

            html.should.equal('V O I D V O I D\n');
        });
    });
});
