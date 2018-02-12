(function() {
	'use strict';
	
	APP.Views.TaskItemsView = Backbone.View.extend({
		id: 'taskItemsContainer',

		initialize: function(options) {
			if(!(options && options.model)) {
				throw new Error('model is not specified.');
			}

			this.model.on('add', this.onAddItem, this);
			this.model.on('remove', this.onRemoveTodoItem, this);

			this.options = options;
		},

	    onAddItem: function(item) {
			var view = new APP.Views.TaskItemView({ model: item });
			this.$('#taskItems').append(view.render().$el);
		},

		onRemoveTodoItem: function(item) {
			this.$('li#' + item.id).remove();
		},

	    events: {
			'click .add-section': 'onClickAdd',
			'click .save': 'onClickSave',
			'keypress .input-add-task-content': 'onKeySave',
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
	        var input = this.$('.input-add-task-content');

	        var taskItem = new APP.Models.TaskModel({
				content: input.val().trim(),
				project_id: parseInt(this.options.project_id)
			});
			this.model.create(taskItem, {wait: true});

			input.val('');
			this.toggleClass();
	    },

		render: function() {
			var template = $('#taskItemsTemplate').html();
			var html = Mustache.render(template, {project_name: this.options.project_id});
			this.$el.html(html);

			return this;
		}
	});
})();
