(function() {
	'use strict';
	
	APP.Models.TaskModel = Backbone.Model.extend({
		idAttribute: 'id',

		defaults: {
			isEdit: false
		},

	    url: function() {
	        if(this.isNew()) {
	            return APP.Config.apiUrl + 'tasks?token=' + APP.Config.token;
	        } else {
	            return APP.Config.apiUrl + 'tasks/' + this.get('id') + '?token=' + APP.Config.token;
	        }
	    },

	    validate: function(attrs) {
			if(!attrs.content)
				return "Title is required.";
		},

	    toggleEdit: function() {
			this.set('isEdit', !this.get('isEdit'));
		},

		toggleCompleted: function() {
			this.set('completed', !this.get('completed'));
			var param = this.get('completed') ? 'close' : 'reopen';

			this.url = APP.Config.apiUrl + 'tasks/' + this.get('id') + '/' + param + '?token=' + APP.Config.token;
		}
	});
})();
