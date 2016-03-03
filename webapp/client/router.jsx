FlowRouter.route('/', {
    action: function(params) {
        ReactLayout.render(WelcomeComponent, {name: "Arunoda"});
    }
});
