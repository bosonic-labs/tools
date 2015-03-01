var fs = require('fs');

if (!process.env.SAUCE_USERNAME) {
  if (!fs.existsSync('sauce.json')) {
    console.log('Create a sauce.json with your credentials.');
    process.exit(1);
  } else {
    var credentials = JSON.parse(fs.readFileSync('sauce.json', 'utf8'));
    process.env.SAUCE_USERNAME = credentials.username;
    process.env.SAUCE_ACCESS_KEY = credentials.accessKey;
  }
}

var customLaunchers = {
  desktop: {
    sl_chrome_windows: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '40'
    },
    sl_firefox_windows: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 7',
      version: '35'
    },
    sl_chrome_linux: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Linux',
      version: '40'
    },
    sl_firefox_linux: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Linux',
      version: '35'
    }
  },
  android: {
    sl_android_44: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '4.4'
    }
  },
  safari: {
    sl_osx_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8.0'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.10',
      version: '8.1'
    }
  },
  ie: {
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  }
};

var defaults = {
  options: {
    basePath: '',
    frameworks: ['mocha', 'chai', 'effroi'],
    exclude: [],
    preprocessors: {},
    port: 9876,
    colors: true,
    autoWatch: true,
    reporters: ['dots', 'saucelabs'],
    singleRun: true,
    files: [],
    sauceLabs: {}
  },
  local: {
    browsers: ['Chrome', 'Firefox'],
    reporters: ['progress'],
    singleRun: false
  },
  ie: {
    customLaunchers: customLaunchers.ie,
    browsers: Object.keys(customLaunchers.ie),
  },
  safari: {
    customLaunchers: customLaunchers.safari,
    browsers: Object.keys(customLaunchers.safari),
  },
  android: {
    customLaunchers: customLaunchers.android,
    browsers: Object.keys(customLaunchers.android),
  }
};

function mergeConfig(defaults, config) {
  for (var k in config) {
    if (typeof config[k] === 'object') {
      defaults[k] = mergeConfig(defaults[k], config[k]);
    } else {
      defaults[k] = config[k];
    }
  }
  return defaults;
}

exports = module.exports = function(config) {
  return mergeConfig(defaults, config);
};
