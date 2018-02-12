(function() {
	'use strict';
	
	APP.Views.ProjectItemsView = Backbone.View.extend({
		id: 'projectItemsContainer',

		initialize: function(options) {
			if(!(options && options.model)) {
				throw new Error('model is not specified.');
			}

			this.model.on('add', this.onAddItem, this);
			this.model.on('remove', this.onRemoveTodoItem, this);

			APP.Routers.Router.on('all', this.onChangeRoute, this);
		},

	    onAddItem: function(item) {
			var view = new APP.Views.ProjectItemView({ model: item });
			this.$('#projectItems').append(view.render().$el);

			if(Backbone.history.fragment.length > 0) {
				this.$('li#' + Backbone.history.fragment).addClass('active');
			}
		},

		onRemoveTodoItem: function(item) {
			this.$('li#' + item.id).remove();
		},

		onChangeRoute: function(route, section) {
			if(Backbone.history.fragment.length > 0) {
				this.$('li').removeClass('active');
				this.$('li#' + Backbone.history.fragment).addClass('active');
			}
		},

	    events: {
			'click .add-section': 'onClickAdd',
			'click .save': 'onClickSave',
			'keypress .input-add-project-name': 'onKeySave',
			'click .cancel': 'onClickCancel'
		},

	    onClickAdd: function() {
			this.toggleClass();
		},

	    onClickCancel: function() {
	        this.toggleClass();
		},

	    onClickSave: function() {
	        this.save();
		},

		onKeySave: function(evt) {
	        if(evt.keyCode == 13) {
	            this.save();
	        }
		},

		toggleClass: function() {
			this.$('.form-section').toggleClass('is-hidden');
			this.$('.add-section').toggleClass('is-hidden');
		},

	    save: function() {
	        var input = this.$('.input-add-project-name');

			var projectItem = new APP.Models.ProjectModel({ name: input.val().trim() });
			this.model.create(projectItem, {wait: true});

			input.val('');
			this.toggleClass();
	    },

		render: function() {
			var template = $('#projectItemsTemplate').html();
			var html = Mustache.render(template);
			this.$el.html(html);

			return this;
		}
	});
})();
