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
          assetMap = {},
          prefixPath = opts.prefixPath || "";

      for(var assetIndex in hashedAssets) {
          var asset = prefixPath+hashedAssets[assetIndex].replace(opts.stripPath, "");
          var splitAsset = asset.split('.');
          if(splitAsset.length >= 2) {
              splitAsset.splice(splitAsset.length-2, 1);
              var unhashedName = splitAsset.join(".");
              assetMap[unhashedName] = asset;
          }
      }

      var mapFileName = opts.fileName || 'asset-hash-map.json';
      fs.writeFile(mapFileName, JSON.stringify(assetMap), function(err){
          if(err) throw err;
          grunt.log.writeln("Asset map written to '"+mapFileName+"' successfully");
          done();
      });
  });
};
