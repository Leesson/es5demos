
//Operator precedence: typeof > !=
typeof window != "undefined"; //true
typeof (window != "undefined"); //"boolean"

var isBrowser =
        // the most fundamental decision: are we in the browser?
        typeof window != "undefined" &&
        typeof location != "undefined" &&
        typeof document != "undefined" &&
        window.location == location && window.document == document;