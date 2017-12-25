
const revamp = (function() {
    'use strict';


    function pick(src, pickArray) {
      if (!pickArray || !src) {
        return {}
      }
      return Object.values(pickArray).reduce(
        function(res, picker) {
          return Object.assign(
            res,
            {[picker]: src[picker]}
          )
        },
        {}
      );
    }

    function extract(src, shape) {
      if (!shape || !src) {
        return {}
      }
      return Object.entries(shape).reduce(
        function(res, [newKey, valuePath]) {
          return Object.assign(
            res,
            {[newKey]: (
              valuePath.split('.').reduce(
                function(nestedObj, k) {
                  return (
                    nestedObj && typeof(nestedObj) !== 'string' && k in nestedObj
                    ? nestedObj[k]
                    : undefined
                  )
                },
                src
              )
            )}
          )
        },
        {}
      )
    }

    return {
      extract: extract,
      pick: pick
    }

}());

module.exports = revamp;
