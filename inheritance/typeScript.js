// typeScript extends
// 组合继承的另类写法，避免了父类构造函数的重复调用
var
    __extends = (this && this.__extends) || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
        // 中间函数，解决了原型链不能传参的问题，。。。
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };