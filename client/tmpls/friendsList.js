Template.friendsList.helpers({
    friends: function(){
        return Meteor.users.findOne(Meteor.userId()).friends.map(function(item){
            return {
                name: item,
                link: Meteor.absoluteUrl("dialog/" + item, {secure: false, replaceLocalhost: true})
            }
        });
    }
});

