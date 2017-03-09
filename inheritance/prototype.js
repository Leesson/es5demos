var Super = function () {
    this.name = "super";
    this.getName = function () {
        return this.name;
    }
};

var Sub = function () {
    this.name = "sub";
};

Sub.prototype = new Super();

var instance = new Sub();
console.log(instance.getName());