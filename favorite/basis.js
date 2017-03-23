/**
 * are we in browser?
 */
var isBrowser =
    // the most fundamental decision: are we in the browser?
    typeof window != "undefined" &&
    typeof location != "undefined" &&
    typeof document != "undefined" &&
    window.location == location && window.document == document;

/**
 * define our module base on current environment
 */
(function (global, factory) {

    'use strict';

    /* Use AMD */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return new (factory(global, global.document))();
        });
    }
    /* Use CommonJS */
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = new (factory(global, global.document))();
    }
    /* Use Browser */
    else {
        global.ModuleName = new (factory(global, global.document))();
    }

})(typeof window !== 'undefined' ? window : this, function (w, d) {
    /* module code */
});