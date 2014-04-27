var Collection = require('./lib/collection');


var collector = module.exports = function (Model) {
  
  var colAttrs = {};
  var setter = Model.prototype.set;

  var formatCollections = function (attrs) {
    Object.keys(colAttrs).forEach(function (key) {
      if (!attrs.hasOwnProperty(key)) return;

      attrs[key] = Collection({
        content: attrs[key],
        model: colAttrs[key]
      });

    });
  };

  Model.once('initializing', function (instance, attrs) {
    Object.keys(Model.attrs).forEach(function (key) {
      var spec = Model.attrs[key];

      if (spec.type && Array.isArray(spec.type)) {
        colAttrs[key] = spec.type[0];
      }
    });
  });

  Model.on('initialize', function (instance) {
    Object.keys(colAttrs).forEach(function (key) {
      instance.attrs[key] = instance.attrs[key] || [];
    });

    formatCollections(instance.attrs);
  });

  Model.prototype.set = function (attrs) {
    formatCollections(attrs);
    setter.apply(this, [attrs]);
  };

};
