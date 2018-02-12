(function() {
	'use strict';
	
	APP.Views.TaskItemView = Backbone.View.extend({
		tagName: 'li',
	    className: 'list-group-item',

		initialize: function(options) {
			if (!(options && options.model))
				throw new Error('model is not specified.');

			this.model.on('change', this.render, this);
		},

		events: {
			'click .edit': 'onClickEdit',
			'click .delete': 'onClickDelete',
			'click .save': 'onClickSave',
			'keypress .input-content': 'onKeySave',
			'click .cancel': 'onClickCancel',
			'click .task-content': 'onClickTask'
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
		},

		onClickTask: function() {
			this.model.toggleCompleted();
			this.model.save({}, {type: 'POST', wait: true});
		},

	    update: function() {
	        var input = this.$el.find('.input-content');

	        this.model.set({content: input.val().trim()});
	        this.model.toggleEdit();
			this.model.save({}, {type: 'POST', wait: true});
	    },

		render: function(){
			this.$el.attr('id', this.model.id);

			var template = $('#taskItemTemplate').html();
			var html = Mustache.render(template, this.model.toJSON());
			this.$el.html(html);

			return this;
		}
	});
})();
