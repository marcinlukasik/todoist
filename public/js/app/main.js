(function() {
	'use strict';
	
	APP.init = function() {
		var projectsCollection = new APP.Collections.ProjectsCollection();
		projectsCollection.fetch();

		var projectItemsView = new APP.Views.ProjectItemsView({ model: projectsCollection });
		$('#app-projects').html(projectItemsView.render().$el);
	};

	$(document).ready(function() {
		APP.init();
	});
})();
