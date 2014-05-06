var assert = require('assert');
var modella = require('modella');
var collector = require('..')

describe('collector', function () {
  var Disc = modella('Disc')
    .attr('artist', {type: 'string'})
    .attr('name', {type: 'string'});

  var Fan = modella('Fan')
    .attr('name', {type: 'string'})
    .attr('discs', {type: [Disc]})
    .use(collector);

  describe('initialize', function () {

    it('should not alter the set behavior on others attrs', function () {
      var fan = new Fan({name: 'David', discs: []});

      assert.equal('David', fan.name());
    });

    it('should cast models', function () {
      var fan = new Fan({name: 'David', discs: [{
        name: 'Black Album',
        artist: 'Metallica'
      }]});

      assert.equal('Metallica', fan.get('discs').get(0).artist());
      assert.equal('Black Album', fan.get('discs').get(0).name());
    });

    it('should preserve instances', function () {
      var dookie = new Disc({name: 'Dookie', artist: 'Green Day'});
      var fan = new Fan({name: 'David', discs: [{
        name: 'Black Album',
        artist: 'Metallica'
      }, dookie]});

      assert.equal('Green Day', fan.get('discs').get(1).artist());
      assert.equal('Dookie', fan.get('discs').get(1).name());
    });

  });

  describe('set', function () {

    it('should not alter the set behavior on others attrs', function () {
      var fan = new Fan();

      fan.set({name: 'David'});
      assert.equal('David', fan.name());
    });

    it('should cast models', function () {
      var fan = new Fan({name: 'David'});

      fan.set({discs: [{
        name: 'Black Album',
        artist: 'Metallica'
      }]})
      assert.equal('Metallica', fan.get('discs').get(0).artist());
      assert.equal('Black Album', fan.get('discs').get(0).name());
    });

    it('should be able to empty the collection', function () {
      var fan = new Fan({discs: [{
        name: 'Black Album',
        artist: 'Metallica'
      }]});

      fan.set({discs: []});
      assert.equal(0, fan.get('discs').size());
    });

  });

  describe('add', function () {
    it('should cast models', function () {
      var fan = new Fan({name: 'David'});

      fan.get('discs')
        .add({name: 'Black Album', artist: 'Metallica'});

      assert.equal('Metallica', fan.get('discs').get(0).artist());
      assert.equal('Black Album', fan.get('discs').get(0).name());
    });    

    it('should be chainable', function () {
      var fan = new Fan({name: 'David'});

      fan.get('discs')
        .add({name: 'Black Album', artist: 'Metallica'})
        .add({name: 'Smash', artist: 'The Offsprings'});

      assert.equal('The Offsprings', fan.get('discs').get(1).artist());
      assert.equal('Smash', fan.get('discs').get(1).name());
    });    

  });

  describe('first', function () {
    it('should retreive the first element', function () {
      var fan = new Fan({name: 'David'});

      fan.get('discs')
        .add({name: 'Black Album', artist: 'Metallica'})
        .add({name: 'Smash', artist: 'The Offsprings'});

      assert.equal('Metallica', fan.get('discs').first().artist());
      assert.equal('Black Album', fan.get('discs').first().name());
    });    
  });

  describe('last', function () {
    it('should retreive the last element', function () {
      var fan = new Fan({name: 'David'});

      fan.get('discs')
        .add({name: 'Black Album', artist: 'Metallica'})
        .add({name: 'Smash', artist: 'The Offsprings'});

      assert.equal('The Offsprings', fan.get('discs').last().artist());
      assert.equal('Smash', fan.get('discs').last().name());
    });    
  });

  describe('toJSON', function () {
    it('should returns an array of items\' jsons', function () {
      var fan = new Fan({name: 'David'});

      fan.get('discs')
        .add({name: 'Black Album', artist: 'Metallica'})
        .add({name: 'Smash', artist: 'The Offsprings'});

      assert.equal('Metallica', fan.get('discs').toJSON()[0].artist);
    });

    it('should be in collection json', function () {
      var fan = new Fan({name: 'David'});

      fan.get('discs')
        .add({name: 'Black Album', artist: 'Metallica'})
        .add({name: 'Smash', artist: 'The Offsprings'});

      assert.equal('Metallica', fan.toJSON().discs[0].artist);
    });

  });

});