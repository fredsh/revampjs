
const revamp = (function() {
    'use strict';


    function extract(src, shape) {
      return Object.entries(shape).reduce(
        function(res, [newKey, valuePath]) {
          return Object.assign(
            res,
            {[newKey]: (
              valuePath.split('.').reduce(
                function(nestedObj, k) {
                  return (
                    nestedObj && k in nestedObj
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
      extract: extract
    }

}());

console.log(revamp)

module.exports = revamp;
