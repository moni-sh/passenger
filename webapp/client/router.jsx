FlowRouter.route('/', {
    action: function(params) {
        ReactLayout.render(PickLine);
    }
});

FlowRouter.route('/directions/:number', {
    action: function(params) {
        ReactLayout.render(PickDirection, params);
    }
});

FlowRouter.route('/wait/:number/:direction', {
    action: function(params) {
        ReactLayout.render(Wait, params);
    }
});
