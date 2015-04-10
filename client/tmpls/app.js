Template.layout.helpers({

});

Template.app.events({
    'click #logout': function(event, template){
        event.preventDefault();

        Meteor.logout(function(){
            Router.go("/");
        });
    }
});