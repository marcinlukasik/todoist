(function() {
	'use strict';
	
	APP.Collections.TasksCollection = Backbone.Collection.extend({
		model: APP.Models.TaskModel,

		url: APP.Config.apiUrl + 'tasks?token=' + APP.Config.token
	});
})();
