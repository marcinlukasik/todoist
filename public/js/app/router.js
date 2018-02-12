(function() {
    'use strict';
    
    $(document).ready(function() {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'showIndex',
                ':id': 'showProjectById'
            },

            showIndex: function() {
                $('#app-tasks').html('');
            },

            showProjectById: function(id) {
                var tasksCollection = new APP.Collections.TasksCollection();
                tasksCollection.fetch({data: {project_id: id}});

                var view = new APP.Views.TaskItemsView({ model: tasksCollection, project_id: id });
                $('#app-tasks').html(view.render().$el);
            }
        });

        APP.Routers.Router = new AppRouter();
        Backbone.history.start();
    });
})();
