
const revamp = (function() {
    'use strict';


    function pick(src, pickArray, isSrcImmutable=false) {
      if (!pickArray || !src) {
        return {}
      }
      return Object.values(pickArray).reduce(
        function(res, picker) {
          return Object.assign(
            res,
            {[picker]: (isSrcImmutable ? src.get(picker) : src[picker])}
          )
        },
        {}
      );
    }

    function extract(src, shape, isSrcImmutable=false) {
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
                  if (nestedObj === undefined) {
                    return undefined
                  }
                  if (isSrcImmutable) {
                    return nestedObj.get(k)
                  }
                  return (
                    typeof(nestedObj) === 'object' && k in nestedObj
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
