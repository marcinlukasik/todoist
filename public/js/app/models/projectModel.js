(function() {
	'use strict';
	
	APP.Models.ProjectModel = Backbone.Model.extend({
		idAttribute: 'id',

		defaults: {
			isEdit: false
		},

	    url: function() {
	        if(this.isNew()) {
	            return APP.Config.apiUrl + 'projects?token=' + APP.Config.token;
	        } else {
	            return APP.Config.apiUrl + 'projects/' + this.get('id') + '?token=' + APP.Config.token;
	        }
	    },

	    validate: function(attrs) {
			if(!attrs.name)
				return "Title is required.";
		},

	    toggleEdit: function() {
			this.set('isEdit', !this.get('isEdit'));
		}
	});
})();
