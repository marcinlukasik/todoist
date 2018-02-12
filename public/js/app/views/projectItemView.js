(function() {
	'use strict';
	
	APP.Views.ProjectItemView = Backbone.View.extend({
		tagName: 'li',

	    className: 'list-group-item',

		initialize: function(options) {
			if (!(options && options.model))
				throw new Error('model is not specified.');

			this.model.on('change', this.render, this);
		},

		events: {
			'click .project-name': 'onClickLink',
			'click .edit': 'onClickEdit',
			'click .delete': 'onClickDelete',
			'click .save': 'onClickSave',
			'keypress .input-name': 'onKeySave',
			'click .cancel': 'onClickCancel'
		},

		onClickLink: function(evt) {
			var url = $(evt.target).attr('data-url');
			APP.Routers.Router.navigate(url, {trigger: true});
		},

		onClickEdit: function() {
			this.model.toggleEdit();
		},

	    onClickSave: function() {
	        this.update();
		},

	    onKeySave: function(evt) {
	        if(evt.keyCode == 13) {
	            this.update();
	        }
		},

	    onClickCancel: function() {
			this.model.toggleEdit();
		},

	    onClickDelete: function(){
			this.model.destroy({}, {wait: true});

			if(this.$el.hasClass('active')) {
				APP.Routers.Router.navigate('', {trigger: true});
			}
		},

	    update: function() {
	        var input = this.$el.find('.input-name');

	        this.model.set({name: input.val().trim()});
	        this.model.toggleEdit();
			this.model.save({}, {type: 'POST', wait: true});
	    },

		render: function(){
			this.$el.attr('id', this.model.id);

			var template = $('#projectItemTemplate').html();
			var html = Mustache.render(template, this.model.toJSON());
			this.$el.html(html);

			return this;
		}
	});
})();
