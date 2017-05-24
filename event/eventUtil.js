/**
 * cross-browser DOM event handle
 * this methods did not consider every browsers' character. for example, variable this point to window rather than the element.
 * but it is enough for add/remove event
 * @type {{addHandler: EventUtil.addHandler, removeHandler: EventUtil.removeHandler}}
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            // DOM2. see: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
            // @param
            //     type: A string representing the event type to listen out for. such as "click", "mouseon"
            //     handler: The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs.
            //         This must be an object implementing the EventListener interface, or a JavaScript function.
            //     options, optional. rarely used.
            //     useCapture, optional. A Boolean which indicates that events of this type will be dispatched to the registered listener.
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            // IE
            // events will be dispatched on bubbling phase, and in reverse subscribed order
            // variable 'this' point to window in handler
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
    },

    getEvent: function (event) {
        return event ? event : window.event;
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function (event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};