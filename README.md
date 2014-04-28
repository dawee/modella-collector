# modella-collector

[modella](http://github.com/modella/modella) plugin to enable collection attributes.

## Declaration

```js
var modella = require('modella');
var Child = modella('Child').attr('name');
var Mom = modella('Mom').attr('children', {type: [Child]});

var mom = new Dad({children: [
  {name: 'Pete'}, // Collection models can be initialized with data
  new Child({name: 'jack'}) // or with instance
]});
```

_This plugin is inspired by [this discussion](https://github.com/modella/modella/issues/24)_

## Usage

```js
var modella = require('modella');
var collector = require('modella-collector');

var Disc = modella('Disc')
  .attr('artist', {type: 'string'})
  .attr('name', {type: 'string'});

var Fan = modella('Fan')
  .attr('name', {type: 'string'})
  .attr('discs', {type: [Disc]})
  .use(collector);

var jack = new Fan({
  name: 'Jack',
  discs: [
    {artist: 'The Beatles', name: 'Sgt. Pepper\'s Lonely Hearts Club Band'},
    {artist: 'The Who', name: 'My Generation'}
  ]
});

console.log(jack.discs().first().artist()); // "The Beatles"
```

## Playing with Collections


### Collection#get(index)

Returns a model at a given index.

```js
mom.get('children').get(0).name(); // Pete
```

### Collection#first()

Returns the first model.

```js
mom.get('children').first().name(); // Pete
```

### Collection#last()

Returns the last model.

```js
mom.get('children').last().name(); // Jack
```

### Collection#add(model)

Adds a model

```js
mom.get('children').add({name: 'Mickael'}); // With data
mom.get('children').add(new Child({name: 'John'})); // With instance
```

### Collection#each(fn)

Iterates over the collection with the given function.

```js
mom.get('children').each(function (child) {
  console.log(child.name());
});
```

### Collection#every(fn)

Iterates over the collection.
Returns true if every predicates called returns true.

```js
mom.get('children').every(function (child) {
  return child.name().length > 3;
});
```
### Collection#some(fn)

Iterates over the collection.
Returns true if at least one predicate called returns true.

```js
mom.get('children').some(function (child) {
  return child.name() === 'John';
});
```


