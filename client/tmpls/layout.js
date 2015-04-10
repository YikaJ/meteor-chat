Template.layout.helpers({

});

Template.layout.events({
    'click #logout': function(event, template){
        event.preventDefault();
        console.log('zhuxiao!');

        Meteor.logout(function(){
            console.log('zhuxiao!')
        });
    }
});