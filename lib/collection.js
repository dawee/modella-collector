var Collection = module.exports = function (opts) {
  if (opts.content instanceof Collection) return opts.content;
  if (! (this instanceof Collection)) return new Collection(opts);

  var index = 0;
  var content = opts.content || [];
  this.model = opts.model;

  for (index = 0; index < content.length; index++) {
    content[index] = this.cast(content[index]);
  }

  this.push.apply(this, content);
};

Collection.prototype.__proto__ = Array.prototype;

Collection.prototype.cast = function (data) {
  if (data.model === this.model) return data;
  return new this.model(data);
};

Collection.prototype.toJSON = function () {
  var dump = [];

  this.forEach(function (item) {
    dump.push(item.toJSON());
  });

  return dump;
};