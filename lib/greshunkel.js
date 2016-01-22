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
            variables = variables || {};

            let html;

            this._loadTemplate(template).then((templateHtml) => {
                html = templateHtml;

                return this._compileLayout(html);
            }).then((layoutHtml) => {
                if (layoutHtml) {
                    html = layoutHtml;
                }

                html = this._interpolate(html, variables);

                return resolve(html);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    _compileLayout(content) {
        return new Promise((resolve, reject) => {
            let pattern = /xXx\s*PARENT\s*=\s*([\w\/\.]+)\s*xXx/g;

            let match = pattern.exec(content);

            if (!match) {
                return resolve(content);
            }

            let layoutTag = new RegExp(match[0], 'g');
            let layoutPath = match[1];

            this._loadTemplate(layoutPath).then((layoutHtml) => {
                return resolve(layoutHtml);
            });
        });
    }

    _interpolate(content, variables) {
        let pattern = /xXx\s*@([\w\/]+)\s*xXx/g;

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
            template = this._appendFileExtension(template);

            let templatePath = path.join(this.options.directory, template);
            let reader = fs.createReadStream(templatePath, 'utf-8');
            let html = '';

            reader.on('data', (data) => {
                html += data;
            });

            reader.on('close', () => {
                return resolve(html);
            });

            reader.on('error', (err) => {
                return reject(err);
            });
        });
    }

    _appendFileExtension(filePath) {
        return filePath.endsWith('.gshkl') ? filePath : filePath + '.gshkl';
    }

}

let instance = new Greshunkel();

module.exports = {
    Greshunkel: Greshunkel,
    compile: instance.compile
};
