var require = meteorInstall({"imports":{"components":{"todosList":{"todosList.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// imports/components/todosList/todosList.html                                                 //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
module.watch(require("./template.todosList.js"), {
  "*": module.makeNsSetter(true)
});

/////////////////////////////////////////////////////////////////////////////////////////////////

},"template.todosList.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// imports/components/todosList/template.todosList.js                                          //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //

  var templateUrl = "imports/components/todosList/todosList.html";
  angular.module('angular-templates')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put(templateUrl, "<header> <h1>Todo List ( {{$ctrl.incompleteCount}} )</h1> <label class=\"hide-completed\"> <input type=\"checkbox\" ng-model=\"$ctrl.hideCompleted\"> Hide Completed Tasks </label> <login-buttons></login-buttons> <form class=\"new-task\" ng-submit=\"$ctrl.addTask($ctrl.newTask)\" ng-show=\"$ctrl.currentUser\"> <input ng-model=\"$ctrl.newTask\" type=\"text\" name=\"text\" placeholder=\"Type to add new tasks\"> </form> </header> <ul> <li ng-repeat=\"task in $ctrl.tasks\" ng-class=\"{'checked': task.checked, 'private': task.private}\"> <button class=\"delete\" ng-click=\"$ctrl.removeTask(task)\">&times;</button> <input type=\"checkbox\" ng-checked=\"task.checked\" ng-click=\"$ctrl.setChecked(task)\" class=\"toggle-checked\"> <span class=\"text\"> <strong>{{task.username}}</strong> - {{task.text}} </span> <button class=\"toggle-private\" ng-click=\"$ctrl.setPrivate(task)\" ng-show=\"task.owner === $ctrl.currentUser._id\"> {{task.private == true ? \"Private\" : \"Public\"}} </button> </li> </ul>");
    }]);
  if (typeof exports !== 'undefined') {
    exports.__esModule = true;
    exports.default = templateUrl;
  }
  
/////////////////////////////////////////////////////////////////////////////////////////////////

},"todosList.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// imports/components/todosList/todosList.js                                                   //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var module1 = module;
var angular;
module1.watch(require("angular"), {
  "default": function (v) {
    angular = v;
  }
}, 0);
var angularMeteor;
module1.watch(require("angular-meteor"), {
  "default": function (v) {
    angularMeteor = v;
  }
}, 1);
var Meteor;
module1.watch(require("meteor/meteor"), {
  Meteor: function (v) {
    Meteor = v;
  }
}, 2);
var Tasks;
module1.watch(require("../../api/tasks.js"), {
  Tasks: function (v) {
    Tasks = v;
  }
}, 3);
var template;
module1.watch(require("./todosList.html"), {
  "default": function (v) {
    template = v;
  }
}, 4);

var TodosListCtrl =
/*#__PURE__*/
function () {
  function TodosListCtrl($scope) {
    $scope.viewModel(this);
    this.subscribe('tasks');
    this.hideCompleted = false;
    this.helpers({
      tasks: function () {
        var selector = {}; // If hide completed is checked, filter tasks

        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        } // Show newest tasks at the top


        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount: function () {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
      },
      currentUser: function () {
        return Meteor.user();
      }
    });
  }

  var _proto = TodosListCtrl.prototype;

  _proto.addTask = function () {
    function addTask(newTask) {
      // Insert a task into the collection
      Meteor.call('tasks.insert', newTask); // Clear form

      this.newTask = '';
    }

    return addTask;
  }();

  _proto.setChecked = function () {
    function setChecked(task) {
      // Set the checked property to the opposite of its current value
      Meteor.call('tasks.setChecked', task._id, !task.checked);
    }

    return setChecked;
  }();

  _proto.removeTask = function () {
    function removeTask(task) {
      Meteor.call('tasks.remove', task._id);
    }

    return removeTask;
  }();

  _proto.setPrivate = function () {
    function setPrivate(task) {
      Meteor.call('tasks.setPrivate', task._id, !task.private);
    }

    return setPrivate;
  }();

  return TodosListCtrl;
}();

module1.exportDefault(angular.module('todosList', [angularMeteor]).component('todosList', {
  templateUrl: 'imports/components/todosList/todosList.html',
  controller: ['$scope', TodosListCtrl]
}));
/////////////////////////////////////////////////////////////////////////////////////////////////

}}},"api":{"tasks.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// imports/api/tasks.js                                                                        //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
module.export({
  Tasks: function () {
    return Tasks;
  }
});
var Meteor;
module.watch(require("meteor/meteor"), {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var Mongo;
module.watch(require("meteor/mongo"), {
  Mongo: function (v) {
    Mongo = v;
  }
}, 1);
var check;
module.watch(require("meteor/check"), {
  check: function (v) {
    check = v;
  }
}, 2);
var Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function () {
    function tasksPublication() {
      return Tasks.find({
        $or: [{
          "private": {
            $ne: true
          }
        }, {
          owner: this.userId
        }]
      });
    }

    return tasksPublication;
  }());
}

Meteor.methods({
  'tasks.insert': function (text) {
    check(text, String); // Make sure the user is logged in before inserting a task

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  'tasks.remove': function (taskId) {
    check(taskId, String);
    var task = Tasks.findOne(taskId);

    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.setChecked': function (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    var task = Tasks.findOne(taskId);

    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'tasks.setPrivate': function (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
    var task = Tasks.findOne(taskId); // Make sure only the task owner can make a task private

    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {
        "private": setToPrivate
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup":{"accounts-config.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// imports/startup/accounts-config.js                                                          //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var Accounts;
module.watch(require("meteor/accounts-base"), {
  Accounts: function (v) {
    Accounts = v;
  }
}, 0);
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
/////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"template.main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// client/template.main.js                                                                     //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //

  var templateUrl = "undefined";
  angular.module('angular-templates')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put(templateUrl, "<button>Click Me</button> <p>You've pressed the button {{counter}} times.</p>");
    }]);
  if (typeof exports !== 'undefined') {
    exports.__esModule = true;
    exports.default = templateUrl;
  }
  
  var templateUrl = "undefined";
  angular.module('angular-templates')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put(templateUrl, "<h2>Learn Meteor!</h2> <ul> <li><a href=\"https://www.meteor.com/try\" target=\"_blank\">Do the Tutorial</a></li> <li><a href=\"http://guide.meteor.com\" target=\"_blank\">Follow the Guide</a></li> <li><a href=\"https://docs.meteor.com\" target=\"_blank\">Read the Docs</a></li> <li><a href=\"https://forums.meteor.com\" target=\"_blank\">Discussions</a></li> </ul>");
    }]);
  if (typeof exports !== 'undefined') {
    exports.__esModule = true;
    exports.default = templateUrl;
  }
  
/////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// client/main.js                                                                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var module1 = module;
var angular;
module1.watch(require("angular"), {
  "default": function (v) {
    angular = v;
  }
}, 0);
var angularMeteor;
module1.watch(require("angular-meteor"), {
  "default": function (v) {
    angularMeteor = v;
  }
}, 1);
var todosList;
module1.watch(require("../imports/components/todosList/todosList"), {
  "default": function (v) {
    todosList = v;
  }
}, 2);
module1.watch(require("../imports/startup/accounts-config.js"));
angular.module('simple-todos', [angularMeteor, todosList.name, 'accounts.ui']);
/////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
require("/client/template.main.js");
require("/client/main.js");