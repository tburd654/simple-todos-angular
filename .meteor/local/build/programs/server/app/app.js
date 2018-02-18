var require = meteorInstall({"imports":{"api":{"tasks.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// imports/api/tasks.js                                                                          //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.export({
  Tasks: () => Tasks
});
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 1);
let check;
module.watch(require("meteor/check"), {
  check(v) {
    check = v;
  }

}, 2);
const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [{
        private: {
          $ne: true
        }
      }, {
        owner: this.userId
      }]
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String); // Make sure the user is logged in before inserting a task

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);

    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },

  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    const task = Tasks.findOne(taskId);

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

  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
    const task = Tasks.findOne(taskId); // Make sure only the task owner can make a task private

    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// server/main.js                                                                                //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.watch(require("../imports/api/tasks.js"));
///////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvdGFza3MuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIlRhc2tzIiwiTWV0ZW9yIiwid2F0Y2giLCJyZXF1aXJlIiwidiIsIk1vbmdvIiwiY2hlY2siLCJDb2xsZWN0aW9uIiwiaXNTZXJ2ZXIiLCJwdWJsaXNoIiwidGFza3NQdWJsaWNhdGlvbiIsImZpbmQiLCIkb3IiLCJwcml2YXRlIiwiJG5lIiwib3duZXIiLCJ1c2VySWQiLCJtZXRob2RzIiwidGV4dCIsIlN0cmluZyIsIkVycm9yIiwiaW5zZXJ0IiwiY3JlYXRlZEF0IiwiRGF0ZSIsInVzZXJuYW1lIiwidXNlciIsInRhc2tJZCIsInRhc2siLCJmaW5kT25lIiwicmVtb3ZlIiwic2V0Q2hlY2tlZCIsIkJvb2xlYW4iLCJ1cGRhdGUiLCIkc2V0IiwiY2hlY2tlZCIsInNldFRvUHJpdmF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsT0FBT0MsTUFBUCxDQUFjO0FBQUNDLFNBQU0sTUFBSUE7QUFBWCxDQUFkO0FBQWlDLElBQUlDLE1BQUo7QUFBV0gsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGVBQVIsQ0FBYixFQUFzQztBQUFDRixTQUFPRyxDQUFQLEVBQVM7QUFBQ0gsYUFBT0csQ0FBUDtBQUFTOztBQUFwQixDQUF0QyxFQUE0RCxDQUE1RDtBQUErRCxJQUFJQyxLQUFKO0FBQVVQLE9BQU9JLEtBQVAsQ0FBYUMsUUFBUSxjQUFSLENBQWIsRUFBcUM7QUFBQ0UsUUFBTUQsQ0FBTixFQUFRO0FBQUNDLFlBQU1ELENBQU47QUFBUTs7QUFBbEIsQ0FBckMsRUFBeUQsQ0FBekQ7QUFBNEQsSUFBSUUsS0FBSjtBQUFVUixPQUFPSSxLQUFQLENBQWFDLFFBQVEsY0FBUixDQUFiLEVBQXFDO0FBQUNHLFFBQU1GLENBQU4sRUFBUTtBQUFDRSxZQUFNRixDQUFOO0FBQVE7O0FBQWxCLENBQXJDLEVBQXlELENBQXpEO0FBSXBMLE1BQU1KLFFBQVEsSUFBSUssTUFBTUUsVUFBVixDQUFxQixPQUFyQixDQUFkOztBQUVQLElBQUlOLE9BQU9PLFFBQVgsRUFBcUI7QUFDakI7QUFDQTtBQUNBUCxTQUFPUSxPQUFQLENBQWUsT0FBZixFQUF3QixTQUFTQyxnQkFBVCxHQUE0QjtBQUNoRCxXQUFPVixNQUFNVyxJQUFOLENBQVc7QUFDZEMsV0FBSyxDQUFDO0FBQ0ZDLGlCQUFTO0FBQ0xDLGVBQUs7QUFEQTtBQURQLE9BQUQsRUFJRjtBQUNDQyxlQUFPLEtBQUtDO0FBRGIsT0FKRTtBQURTLEtBQVgsQ0FBUDtBQVNILEdBVkQ7QUFXSDs7QUFFRGYsT0FBT2dCLE9BQVAsQ0FBZTtBQUNYLGlCQUFnQkMsSUFBaEIsRUFBc0I7QUFDbEJaLFVBQU1ZLElBQU4sRUFBWUMsTUFBWixFQURrQixDQUdsQjs7QUFDQSxRQUFJLENBQUNsQixPQUFPZSxNQUFQLEVBQUwsRUFBc0I7QUFDbEIsWUFBTSxJQUFJZixPQUFPbUIsS0FBWCxDQUFpQixnQkFBakIsQ0FBTjtBQUNIOztBQUVEcEIsVUFBTXFCLE1BQU4sQ0FBYTtBQUNUSCxVQURTO0FBRVRJLGlCQUFXLElBQUlDLElBQUosRUFGRjtBQUdUUixhQUFPZCxPQUFPZSxNQUFQLEVBSEU7QUFJVFEsZ0JBQVV2QixPQUFPd0IsSUFBUCxHQUFjRDtBQUpmLEtBQWI7QUFNSCxHQWZVOztBQWdCWCxpQkFBZ0JFLE1BQWhCLEVBQXdCO0FBQ3BCcEIsVUFBTW9CLE1BQU4sRUFBY1AsTUFBZDtBQUVBLFVBQU1RLE9BQU8zQixNQUFNNEIsT0FBTixDQUFjRixNQUFkLENBQWI7O0FBQ0EsUUFBSUMsS0FBS2QsT0FBTCxJQUFnQmMsS0FBS1osS0FBTCxLQUFlZCxPQUFPZSxNQUFQLEVBQW5DLEVBQW9EO0FBQ2hEO0FBQ0EsWUFBTSxJQUFJZixPQUFPbUIsS0FBWCxDQUFpQixnQkFBakIsQ0FBTjtBQUNIOztBQUVEcEIsVUFBTTZCLE1BQU4sQ0FBYUgsTUFBYjtBQUNILEdBMUJVOztBQTJCWCxxQkFBb0JBLE1BQXBCLEVBQTRCSSxVQUE1QixFQUF3QztBQUNwQ3hCLFVBQU1vQixNQUFOLEVBQWNQLE1BQWQ7QUFDQWIsVUFBTXdCLFVBQU4sRUFBa0JDLE9BQWxCO0FBRUEsVUFBTUosT0FBTzNCLE1BQU00QixPQUFOLENBQWNGLE1BQWQsQ0FBYjs7QUFDQSxRQUFJQyxLQUFLZCxPQUFMLElBQWdCYyxLQUFLWixLQUFMLEtBQWVkLE9BQU9lLE1BQVAsRUFBbkMsRUFBb0Q7QUFDaEQ7QUFDQSxZQUFNLElBQUlmLE9BQU9tQixLQUFYLENBQWlCLGdCQUFqQixDQUFOO0FBQ0g7O0FBRURwQixVQUFNZ0MsTUFBTixDQUFhTixNQUFiLEVBQXFCO0FBQ2pCTyxZQUFNO0FBQ0ZDLGlCQUFTSjtBQURQO0FBRFcsS0FBckI7QUFLSCxHQTFDVTs7QUEyQ1gscUJBQW9CSixNQUFwQixFQUE0QlMsWUFBNUIsRUFBMEM7QUFDdEM3QixVQUFNb0IsTUFBTixFQUFjUCxNQUFkO0FBQ0FiLFVBQU02QixZQUFOLEVBQW9CSixPQUFwQjtBQUVBLFVBQU1KLE9BQU8zQixNQUFNNEIsT0FBTixDQUFjRixNQUFkLENBQWIsQ0FKc0MsQ0FNdEM7O0FBQ0EsUUFBSUMsS0FBS1osS0FBTCxLQUFlZCxPQUFPZSxNQUFQLEVBQW5CLEVBQW9DO0FBQ2hDLFlBQU0sSUFBSWYsT0FBT21CLEtBQVgsQ0FBaUIsZ0JBQWpCLENBQU47QUFDSDs7QUFFRHBCLFVBQU1nQyxNQUFOLENBQWFOLE1BQWIsRUFBcUI7QUFDakJPLFlBQU07QUFDRnBCLGlCQUFTc0I7QUFEUDtBQURXLEtBQXJCO0FBS0g7O0FBM0RVLENBQWYsRTs7Ozs7Ozs7Ozs7QUN0QkFyQyxPQUFPSSxLQUFQLENBQWFDLFFBQVEseUJBQVIsQ0FBYixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcclxuaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xyXG5pbXBvcnQgeyBjaGVjayB9IGZyb20gJ21ldGVvci9jaGVjayc7XHJcblxyXG5leHBvcnQgY29uc3QgVGFza3MgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndGFza3MnKTtcclxuXHJcbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcclxuICAgIC8vIFRoaXMgY29kZSBvbmx5IHJ1bnMgb24gdGhlIHNlcnZlclxyXG4gICAgLy8gT25seSBwdWJsaXNoIHRhc2tzIHRoYXQgYXJlIHB1YmxpYyBvciBiZWxvbmcgdG8gdGhlIGN1cnJlbnQgdXNlclxyXG4gICAgTWV0ZW9yLnB1Ymxpc2goJ3Rhc2tzJywgZnVuY3Rpb24gdGFza3NQdWJsaWNhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gVGFza3MuZmluZCh7XHJcbiAgICAgICAgICAgICRvcjogW3tcclxuICAgICAgICAgICAgICAgIHByaXZhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAkbmU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgb3duZXI6IHRoaXMudXNlcklkXHJcbiAgICAgICAgICAgIH0sIF0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuTWV0ZW9yLm1ldGhvZHMoe1xyXG4gICAgJ3Rhc2tzLmluc2VydCcgKHRleHQpIHtcclxuICAgICAgICBjaGVjayh0ZXh0LCBTdHJpbmcpO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIHVzZXIgaXMgbG9nZ2VkIGluIGJlZm9yZSBpbnNlcnRpbmcgYSB0YXNrXHJcbiAgICAgICAgaWYgKCFNZXRlb3IudXNlcklkKCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignbm90LWF1dGhvcml6ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRhc2tzLmluc2VydCh7XHJcbiAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgb3duZXI6IE1ldGVvci51c2VySWQoKSxcclxuICAgICAgICAgICAgdXNlcm5hbWU6IE1ldGVvci51c2VyKCkudXNlcm5hbWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgJ3Rhc2tzLnJlbW92ZScgKHRhc2tJZCkge1xyXG4gICAgICAgIGNoZWNrKHRhc2tJZCwgU3RyaW5nKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFzayA9IFRhc2tzLmZpbmRPbmUodGFza0lkKTtcclxuICAgICAgICBpZiAodGFzay5wcml2YXRlICYmIHRhc2sub3duZXIgIT09IE1ldGVvci51c2VySWQoKSkge1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdGFzayBpcyBwcml2YXRlLCBtYWtlIHN1cmUgb25seSB0aGUgb3duZXIgY2FuIGRlbGV0ZSBpdFxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdub3QtYXV0aG9yaXplZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFza3MucmVtb3ZlKHRhc2tJZCk7XHJcbiAgICB9LFxyXG4gICAgJ3Rhc2tzLnNldENoZWNrZWQnICh0YXNrSWQsIHNldENoZWNrZWQpIHtcclxuICAgICAgICBjaGVjayh0YXNrSWQsIFN0cmluZyk7XHJcbiAgICAgICAgY2hlY2soc2V0Q2hlY2tlZCwgQm9vbGVhbik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2sgPSBUYXNrcy5maW5kT25lKHRhc2tJZCk7XHJcbiAgICAgICAgaWYgKHRhc2sucHJpdmF0ZSAmJiB0YXNrLm93bmVyICE9PSBNZXRlb3IudXNlcklkKCkpIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIHRhc2sgaXMgcHJpdmF0ZSwgbWFrZSBzdXJlIG9ubHkgdGhlIG93bmVyIGNhbiBjaGVjayBpdCBvZmZcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignbm90LWF1dGhvcml6ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRhc2tzLnVwZGF0ZSh0YXNrSWQsIHtcclxuICAgICAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogc2V0Q2hlY2tlZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgJ3Rhc2tzLnNldFByaXZhdGUnICh0YXNrSWQsIHNldFRvUHJpdmF0ZSkge1xyXG4gICAgICAgIGNoZWNrKHRhc2tJZCwgU3RyaW5nKTtcclxuICAgICAgICBjaGVjayhzZXRUb1ByaXZhdGUsIEJvb2xlYW4pO1xyXG5cclxuICAgICAgICBjb25zdCB0YXNrID0gVGFza3MuZmluZE9uZSh0YXNrSWQpO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgb25seSB0aGUgdGFzayBvd25lciBjYW4gbWFrZSBhIHRhc2sgcHJpdmF0ZVxyXG4gICAgICAgIGlmICh0YXNrLm93bmVyICE9PSBNZXRlb3IudXNlcklkKCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignbm90LWF1dGhvcml6ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRhc2tzLnVwZGF0ZSh0YXNrSWQsIHtcclxuICAgICAgICAgICAgJHNldDoge1xyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZTogc2V0VG9Qcml2YXRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbn0pOyIsImltcG9ydCAnLi4vaW1wb3J0cy9hcGkvdGFza3MuanMnOyJdfQ==
