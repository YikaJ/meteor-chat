Template.chatList.onRendered(function(){
    var singletonFlag = false;
    var oldRecord = [];
    var _this = this;
    this.autorun(function(){
        var newRecord = [];
        // 通过单例模式获取初始数据
        if(!singletonFlag && oldRecord.length == 0 && ChatRoom.find().fetch().length > 0){
            oldRecord = ChatRoom.find().fetch();
            singletonFlag = true;
        }
        if(oldRecord.length > 0){
            newRecord = ChatRoom.find().fetch();
            // notification里是更新后的数据
            var notifyRecord = newRecord.filter(function(chatRoom, index){
                return !EJSON.equals(chatRoom, oldRecord[index]);
            });
            notifyRecord.forEach(function(chatRoom){
                // 取出不是当前对话框的roomId
                if(_this.$("#" + chatRoom._id + ":not(.active)").length > 0){
                    _this.$("#" + chatRoom._id + ":not(.active)").addClass("notify");
                }
            });
            oldRecord = newRecord;
        }
    });
});

Template.chatList.helpers({
    chatList: function(){
        if(Meteor.user()){
            return ChatRoom.find({members: Meteor.user().username}).map(function(chatRoom){
                return {
                    name: getRoomName(chatRoom),
                    roomId: chatRoom._id,
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
        template.$(event.currentTarget).removeClass("notify").addClass("active");
    }
});





