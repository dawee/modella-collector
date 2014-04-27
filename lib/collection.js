var Collection = module.exports = function (opts) {
  if (opts.content instanceof Collection) return opts.content;
  if (! (this instanceof Collection)) return new Collection(opts);

  var self = this;
  this.model = opts.model;
  this.add.bind(this);
  this.models = []

  Array.apply(this, [1]);
  (opts.content || []).forEach(function (item) {
    self.add(item);
  });
};

Collection.prototype.add = function (item) {
  this.models.push(this.cast(item));
  return this;
};

Collection.prototype.each = function (fn) {
  this.models.forEach(fn);
};

Collection.prototype.every = function (fn) {
  this.models.every(fn);
};

Collection.prototype.some = function (fn) {
  this.models.some(fn);
};

Collection.prototype.get = function (index) {
  return this.models[index] || null;
};

Collection.prototype.first = function () {
  return this.get(0);
};

Collection.prototype.last = function () {
  return this.get(this.size() - 1);
};

Collection.prototype.size = function () {
  return this.models.length;
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
