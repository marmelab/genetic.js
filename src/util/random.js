define(function(require) {
    "use strict";

    function random(min, max) {
        if (![].slice.apply(arguments).length) {
            return Math.random();
        }

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return random;
});
