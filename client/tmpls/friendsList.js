Template.friendsList.helpers({
    friends: function(){
        var currentUser = Meteor.users.findOne(Meteor.userId());
        if(currentUser && currentUser.friends){
            return currentUser.chatRooms.map(function(item){
                return {
                    name: item.roomName,
                    link: Meteor.absoluteUrl("dialog/" + item.roomId, {secure: false, replaceLocalhost: true})
                }
            });
        }
    }
});





