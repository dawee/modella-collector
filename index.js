var Collection = require('./lib/collection');


var collector = module.exports = function (Model) {
  
  var colAttrs = {};
  var setter = Model.prototype.set;

  var formatCollections = function (attrs) {
    Object.keys(attrs).forEach(function (key) {
      if (!colAttrs.hasOwnProperty(key)) return;

      attrs[key] = Collection({
        content: attrs[key],
        model: colAttrs[key]
      });
    });
  };

  Model.on('initializing', function (instance, attrs) {
    Object.keys(Model.attrs).forEach(function (key) {
      var spec = Model.attrs[key];

      if (spec.type && Array.isArray(spec.type)) {
        colAttrs[key] = spec.type[0];
      }
    });

    formatCollections(attrs); 
  });

  Model.prototype.set = function (attrs) {
    formatCollections(attrs);
    setter.apply(this, [attrs]);
  };

};
