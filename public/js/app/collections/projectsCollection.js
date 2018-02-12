(function() {
	'use strict';

	APP.Collections.ProjectsCollection = Backbone.Collection.extend({
		model: APP.Models.ProjectModel,

		url: APP.Config.apiUrl + 'projects?token=' + APP.Config.token
	});
})();
