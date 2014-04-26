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

      assert.equal('Metallica', fan.discs()[0].artist());
      assert.equal('Black Album', fan.discs()[0].name());
    });

    it('should preserve instances', function () {
      var dookie = new Disc({name: 'Dookie', artist: 'Green Day'});
      var fan = new Fan({name: 'David', discs: [{
        name: 'Black Album',
        artist: 'Metallica'
      }, dookie]});

      assert.equal('Green Day', fan.discs()[1].artist());
      assert.equal('Dookie', fan.discs()[1].name());
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
      assert.equal('Metallica', fan.discs()[0].artist());
      assert.equal('Black Album', fan.discs()[0].name());
    });


  });

});