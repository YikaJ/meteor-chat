// 储存当前用户数据
Meteor.publish("userData", function(){
    if(!this.userId) return this.ready();

    //返回用户的数据(MongoDB的第二个参数，字段为1则取，为0则过滤)
    return Meteor.users.find({_id: this.userId}, {"username": 1, "friends": 1, "chatRooms": 1});
});

// 绑定用户的聊天室数据
Meteor.publish("getChatRooms", function(username){
    if(!this.userId) return this.ready();
    return ChatRoom.find({members: username}); //将会遍历数组，存在的返回
});

// 更新用户数据(客户端不直接更新用户数据)
Meteor.publish("updateUser", function(newData){
    if(!this.userId) return this.ready();
    Meteor.users.update({_id: this.userId}, newData);
});

// 清空没有成员的空聊天室
Meteor.publish("clearEmptyRoom", function(roomId){
    ChatRoom.remove({"_id": roomId, "members": []});
});