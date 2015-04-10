Meteor.publish("userData", function () {
    if(this.userId){
        //返回用户的数据
        return Meteor.users.find({_id: this.userId});
    }else{
        this.ready();
    }
});

Meteor.publish("chatRecord", function(roomId){
    if(this.userId){
        return ChatRoom.find({_id: roomId});
    }else{
        this.ready();
    }
});