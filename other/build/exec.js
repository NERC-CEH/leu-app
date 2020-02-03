require('dotenv').config({ silent: true }); // get local environment variables from .env
// var keystorePassword = grunt.config('keystore');

module.exports = function (grunt) {
  return {
    data: {
      command() {
        return 'cd src/info/species/data && ' +
          'node make.js species &&' +
          'mkdir -p ../../../../dist/_build &&' +
          'mv *data.json ../../../../dist/_build';
      },
      stdout: true,
    },
    cordova_init: {
      command: './node_modules/.bin/cordova create dist/cordova',
      stdout: true,
    },
    cordova_resources: {
      command: `mkdir -p dist/resources &&
                cp -R other/designs/android dist/resources &&
                
                cp other/designs/android/*png dist/resources/android &&
                cp other/designs/*png dist/resources &&

                ./node_modules/.bin/cordova-res --resources dist/resources`,
      stdout: true,
    },
    cordova_clean_www: {
      command: 'rm -R -f dist/cordova/www/* && rm -f dist/cordova/config.xml',
      stdout: true,
    },
    cordova_rebuild: {
      command: 'cd dist/cordova/ && ../../node_modules/.bin/cordova prepare ios android',
      stdout: true,
    },
    cordova_android_build_dev: {
      command: 'cd dist/cordova/ && ../../node_modules/.bin/cordova build android',
      stdout: true,
    },
    cordova_copy_dist: {
      command: 'cp -R dist/main/* dist/cordova/www/',
      stdout: true,
    },
    cordova_add_platforms: {
      command: 'cd dist/cordova && cordova platforms add ios android',
      stdout: true,
    },
    /**
     * $ANDROID_KEYSTORE must be set up to point to your android certificates keystore
     */
    cordova_android_build: {
      command() {
        const pass = grunt.config('keystore-password');
        return `cd dist/cordova && 
            mkdir -p dist && 
            cordova --release build android && 
            cd platforms/android/app/build/outputs/apk/release/ &&
            jarsigner -keystore ${process.env.KEYSTORE}
              -storepass ${pass} app-release-unsigned.apk irecord &&
            zipalign 4 app-release-unsigned.apk main.apk &&
            mv -f main.apk ../../../../../../../dist/`;
      },

      stdout: true,
      stdin: true,
    },
  }
};
