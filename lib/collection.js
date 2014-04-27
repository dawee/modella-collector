var Collection = module.exports = function (opts) {
  if (opts.content instanceof Collection) return opts.content;
  if (! (this instanceof Collection)) return new Collection(opts);

  var self = this;
  this.model = opts.model;
  this.add.bind(this);

  (opts.content || []).forEach(function (item) {
    self.add(item);
  });
};

Collection.prototype.add = function (item) {
  item = this.cast(item);

  Array.prototype.push.apply(this, [item]);
  return this;
};

Collection.prototype.each = function (fn) {
  Array.prototype.forEach.apply(this, [fn]);
};

Collection.prototype.first = function () {
  return this[0] || null;
};

Collection.prototype.last = function () {
  return this[this.length -1] || null;
};

Collection.prototype.cast = function (data) {
  if (data.model === this.model) return data;
  return new this.model(data);
};

Collection.prototype.toJSON = function () {
  var dump = [];

  this.each(function (item) {
    dump.push(item.toJSON());
  });

  return dump;
};
