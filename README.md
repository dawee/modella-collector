# modella-collector

[modella](http://github.com/modella/modella) plugin to enable collection attributes.

## Usage

```js
var modella = require('modella');

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

console.log(jack.discs()[0].artist()); // "The Beatles"
```