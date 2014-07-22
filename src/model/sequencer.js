/**
 * A sequencer execute a genetic computation
 */
define(function(require) {
    "use strict";

    var configurable = require('../util/configurable');
    var pool = require('./pool');

    return function sequencer (poolParent) {
        /**
         * @mixin
         */
        var config = {
            pool: poolParent,
            mergeCallback: null
        };

        function merge(pool1, pool2) {
            return pool(pool1).data(config.mergeCallback(
                pool1.data(),
                pool2.data()
            ));
        }

        var model = {
            step: function() {
                var resultPool = merge(
                    config.pool,
                    config.pool.sub().recombine().mutate()
                );

                if (resultPool.evaluate() > config.pool.evaluate()) {
                    config.pool = resultPool;
                }
            },
            run: function(delta) {
                var currentPool = config.pool,
                    count = 0;

                do {
                    model.step();
                    if (currentPool === config.pool) {
                        count++;
                    } else {
                        currentPool = config.pool;
                    }
                } while(1/count > delta);


                return currentPool;
            }
        };

        configurable(model, config);

        return model;
    };
});
