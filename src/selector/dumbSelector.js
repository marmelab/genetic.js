define(function(require) {
    "use strict";

    function dumbSelector(data) {
        return data.slice(0, Math.floor(data.length/2));
    }

    return dumbSelector;
});
