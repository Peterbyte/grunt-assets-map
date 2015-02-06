/*
 * grunt-assets-map
 * https://github.com/Peterbyte/grunt-assets-map
 *
 * Copyright (c) 2015 Peter Bouquet
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

var _buildMap = function(grunt, opts){
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
  return JSON.stringify(assetMap);
}

module.exports = function(grunt) {
  grunt.registerTask('assets_map', 'Creates a map of assets to versioned assets', function(){
      var opts = this.options();
      var fileName = opts.fileName || 'asset-hash-map.json';

      if(!opts.async){
        fs.writeFileSync(fileName, _buildMap(grunt, opts));
        grunt.log.writeln("Asset map written to '"+fileName+"' successfully");
      }
      else{
        var done = this.async();
        fs.writeFile(fileName, _buildMap(grunt, opts), function(err){
          if(err) throw err;
          grunt.log.writeln("Asset map written to '"+fileName+"' successfully");
          done();
        });
      }

  });
};
