'use strict';

module.exports.deepFreeze = (object) => {
    Object.freeze(object);

    Object.getOwnPropertyNames(object).forEach((property) => {
        if (
            object.hasOwnProperty(property)
            && object[property] !== null
            && (typeof object[property] === 'object' || typeof object[property] === 'function')
            && !Object.isFrozen(object[property])
        ) {
            deepFreeze(object[property]);
        }
    });

    return object;
};
