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

    compile(template, variables) {
        return new Promise((resolve, reject) => {
            this._loadTemplate(template).then((content) => {
                content = this._interpolate(content, variables);

                return resolve(content);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    _interpolate(content, variables) {
        let pattern = /xXx.*@([A-Za-z]+).*xXx/g;

        let match;

        while ((match = pattern.exec(content)) !== null) {
            let variableTag = new RegExp(match[0], 'g');
            let variableKey = match[1];
            let variableValue = variables[variableKey];

            if (typeof variableValue === 'undefined') {
                throw new Error(`Undefined variable '${variableKey}'.`);
            }

            content = content.replace(variableTag, variableValue);
        }

        return content;
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
