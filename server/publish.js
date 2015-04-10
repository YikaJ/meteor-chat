//储存当前用户数据
Meteor.publish("userData", function(){
    if(!this.userId) return this.ready();

    //返回用户的数据(MongoDB的第二个参数，字段为1则取，为0则过滤)
    return Meteor.users.find({_id: this.userId}, {"username": 1, "friends": 1, "chatRoom": 1});
});


//提取单个聊天记录,发布数据库数据
Meteor.publish("getRecords", function(roomId){
    if(!this.userId) return this.ready();
    return ChatRoom.find({roomId: roomId});
});