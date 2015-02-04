/*
 * grunt-assets-map
 * https://github.com/Peterbyte/grunt-assets-map
 *
 * Copyright (c) 2015 Peter Bouquet
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {
  grunt.registerTask('assets_map', 'Creates a map of assets to versioned assets', function(){
      var done = this.async();
      var opts = this.options();
      var hashedAssets = grunt.file.expand(opts.paths),
          assetMap = {};

      for(var assetIndex in hashedAssets) {
          var asset = hashedAssets[assetIndex].replace(opts.stripPath, "");
          var splitAsset = asset.split('.');
          if(splitAsset.length >= 2) {
              splitAsset.splice(splitAsset.length-2, 1);
              var unhashedName = splitAsset.join(".");
              assetMap[unhashedName] = asset;
          }
      }

      fs.writeFile('asset-hash-map.json', JSON.stringify(assetMap), function(err){
          if(err) throw err;
          grunt.log.writeln("Sucessfully wrote asset-hash-map.json");
          done();
      });
  });

};