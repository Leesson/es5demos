/**
 * cross-browser DOM event handle
 * this methods did not consider every browsers' character. for example, variable this point to window rather than the element.
 * but it is enough for add/remove event
 * @type {{addHandler: EventUtil.addHandler, removeHandler: EventUtil.removeHandler}}
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            // DOM2
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            // IE
            // variable this point to window in handler
            element.attachEvent("on" + type, handler);
        } else {
            // DOM0
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};