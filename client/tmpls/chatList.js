Template.chatList.helpers({
    chatList: function(){
        if(Meteor.user()){
            return ChatRoom.find({members: Meteor.user().username}).map(function(chatRoom){
                return {
                    name: getRoomName(chatRoom),
                    //secure->是否链接为https ， replaceLocalhost->若localhost无法映射127.0.0.1开启
                    link: Meteor.absoluteUrl("dialog/" + chatRoom._id, {secure: false, replaceLocalhost: true})
                }
            });
        }
    }
});
//新建一个群聊
Template.chatList.events({
    "click #newChatRoom": function(event, template){
        template.$(".friendsList li a").removeClass("active");
        Router.go("newChatRoom");
    },
    "click .friendsList li a": function(event, template){
        template.$(".friendsList li a").removeClass("active");
        template.$(event.currentTarget).addClass("active");
    }
});





