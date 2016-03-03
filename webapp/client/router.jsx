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
