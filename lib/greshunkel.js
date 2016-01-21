'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

class Greshunkel {

    constructor(options) {
        this.options = {
            directory: process.cwd()
        };

        _.extend(this.options, options);
    }

    compile(template) {
        return new Promise((resolve, reject) => {
            this._loadTemplate(template).then((content) => {
                return resolve(content);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    _loadTemplate(template) {
        return new Promise((resolve, reject) => {
            template = template.endsWith('.gshkl') ? template : template + '.gshkl';

            let templatePath = path.join(this.options.directory, template);
            let reader = fs.createReadStream(templatePath, 'utf-8');
            let content = '';

            reader.on('data', (data) => {
                content += data;
            });

            reader.on('close', () => {
                return resolve(content);
            });

            reader.on('error', (err) => {
                return reject(err);
            });
        });
    }

}

let instance = new Greshunkel();

module.exports = {
    Greshunkel: Greshunkel,
    compile: instance.compile
};
