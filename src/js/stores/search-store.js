var Actions = require('../actions/actions');
var Reflux = require('reflux');
var apiRequests = require('../utils/api-requests');

var SearchStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._results = undefined;
  },

  onMakeSearch: function (keywords) {
    apiRequests
      .get('https://api.github.com/search/repositories?q=' + keywords + '&sort=stars&order=desc')
      .end(function (err, response) {
        if (response.ok) {
          console.log(response.body.items);
          Actions.makeSearch.completed(response.body.items);
        } else {
          console.log(response);
          Actions.makeSearch.failed(err);
        }
      });
  },

  onMakeSearchCompleted: function (results) {
    console.log('Make Search - Success!.');
    this._results = results;
    this.trigger(this._results);
  },

  onMakeSearchFailed: function (errors) {
    console.log('Make Search - Error!.');
    Action.searchErrors(errors);
  }

});

module.exports = SearchStore;
