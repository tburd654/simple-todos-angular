//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package['templating-runtime'].Template;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var HTML = Package.htmljs.HTML;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"dotansimha:accounts-ui-angular":{"accounts-ui-angular.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////
//                                                                    //
// packages/dotansimha_accounts-ui-angular/accounts-ui-angular.js     //
//                                                                    //
////////////////////////////////////////////////////////////////////////
                                                                      //
var module1 = module;
var checkNpmVersions;
module1.watch(require("meteor/tmeasday:check-npm-versions"), {
  checkNpmVersions: function (v) {
    checkNpmVersions = v;
  }
}, 0);

if (!window.angular) {
  require("angular");
}

checkNpmVersions({
  'angular': '^1.2.27'
});
angular.module('accounts.ui', []);
////////////////////////////////////////////////////////////////////////

},"login-buttons-directive.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////
//                                                                    //
// packages/dotansimha_accounts-ui-angular/login-buttons-directive.js //
//                                                                    //
////////////////////////////////////////////////////////////////////////
                                                                      //
angular.module('accounts.ui').directive('loginButtons', function () {
  return {
    restrict: 'EA',
    scope: true,
    template: '<div></div>',
    link: function (scope, element) {
      Blaze.render(Template.loginButtons, element[0]);
    }
  };
});
////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/node_modules/meteor/dotansimha:accounts-ui-angular/accounts-ui-angular.js");
require("/node_modules/meteor/dotansimha:accounts-ui-angular/login-buttons-directive.js");

/* Exports */
Package._define("dotansimha:accounts-ui-angular");

})();
