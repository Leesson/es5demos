/**
 * shallow copy - 浅复制
 * from dojo.
 * 有待进一步封装
 */
(function (global, factory) {

    // Use AMD
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return new (factory(global, global.document))();
        });
    }
    // Use CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = new (factory(global, global.document))();
    }
    // Use Browser
    else {
        global.ModuleName = new (factory(global, global.document))();
    }

})(typeof window !== 'undefined' ? window : this, function (w, d) {

    var Module = function () {
        var self = this,
            bfiss, _extraNames, _extraLen,
            _mixin;

        //bug-for-in-skips-shadowed
        bfiss = (function(){
            // if true, the for-in iterator skips object properties that exist in Object's prototype (IE 6 - ?)
            for(var i in {toString: 1}){
                return 0;
            }
            return 1;
        })();

        _extraNames =
                bfiss ?
                    "hasOwnProperty.valueOf.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.constructor".split(".") : [];
        _extraLen = _extraNames.length;

        _mixin = function(dest, source, copyFunc){
            // summary:
            //		Copies/adds all properties of source to dest; returns dest.
            // dest: Object
            //		The object to which to copy/add all properties contained in source.
            // source: Object
            //		The object from which to draw all properties to copy into dest.
            // copyFunc: Function?
            //		The process used to copy/add a property in source; defaults to the Javascript assignment operator.
            // returns:
            //		dest, as modified
            // description:
            //		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
            //		found in Object.prototype, are copied/added to dest. Copying/adding each particular property is
            //		delegated to copyFunc (if any); copyFunc defaults to the Javascript assignment operator if not provided.
            //		Notice that by default, _mixin executes a so-called "shallow copy" and aggregate types are copied/added by reference.
            //      复制 source 中的所有属性和方法，但不包括对 Object.prototype 的非标准扩展。特殊属性克通过copyFUnc 复制； copyFunc默认是js 复制运算符;
            //      注意，默认情况下此方法执行的是浅复制
            var name, s, i, empty = {};
            for(name in source){
                // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
                // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
                // don't overwrite it with the toString() method that source inherited from Object.prototype
                s = source[name];
                if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                    dest[name] = copyFunc ? copyFunc(s) : s;
                }
            }

            //复制对浏览器内置对象的重写方法
            if(bfiss){
                if(source){
                    for(i = 0; i < _extraLen; ++i){
                        name = _extraNames[i];
                        s = source[name];
                        if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                            dest[name] = copyFunc ? copyFunc(s) : s;
                        }
                    }
                }
            }

            return dest; // Object
        };

        self.mixin = function(dest, sources){
            // summary:
            //		Copies/adds all properties of one or more sources to dest; returns dest.
            // dest: Object
            //		The object to which to copy/add all properties contained in source. If dest is falsy, then
            //		a new object is manufactured before copying/adding properties begins.
            // sources: Object...
            //		One of more objects from which to draw all properties to copy into dest. sources are processed
            //		left-to-right and if more than one of these objects contain the same property name, the right-most
            //		value "wins".
            // returns: Object
            //		dest, as modified
            // description:
            //		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
            //		found in Object.prototype, are copied/added from sources to dest. sources are processed left to right.
            //		The Javascript assignment operator is used to copy/add each property; therefore, by default, mixin
            //		executes a so-called "shallow copy" and aggregate types are copied/added by reference.
            // example:
            //		make a shallow copy of an object
            //	|	var copy = lang.mixin({}, source);
            // example:
            //		many class constructors often take an object which specifies
            //		values to be configured on the object. In this case, it is
            //		often simplest to call `lang.mixin` on the `this` object:
            //	|	declare("acme.Base", null, {
            //	|		constructor: function(properties){
            //	|			// property configuration:
            //	|			lang.mixin(this, properties);
            //	|
            //	|			console.log(this.quip);
            //	|			//	...
            //	|		},
            //	|		quip: "I wasn't born yesterday, you know - I've seen movies.",
            //	|		// ...
            //	|	});
            //	|
            //	|	// create an instance of the class and configure it
            //	|	var b = new acme.Base({quip: "That's what it does!" });
            // example:
            //		copy in properties from multiple objects
            //	|	var flattened = lang.mixin(
            //	|		{
            //	|			name: "Frylock",
            //	|			braces: true
            //	|		},
            //	|		{
            //	|			name: "Carl Brutanananadilewski"
            //	|		}
            //	|	);
            //	|
            //	|	// will print "Carl Brutanananadilewski"
            //	|	console.log(flattened.name);
            //	|	// will print "true"
            //	|	console.log(flattened.braces);

            if(!dest){ dest = {}; }
            for(var i = 1, l = arguments.length; i < l; i++){
                _mixin(dest, arguments[i]);
            }
            return dest; // Object
        };
    };

    return Module;

});