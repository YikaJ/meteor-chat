console.log(Meteor.user());

Template.friendsList.helpers({
    friends: function(){
        return Meteor.users.findOne(Meteor.userId()).friends;
    }
});

