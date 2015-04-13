// 获取聊天室名字
getRoomName = function(chatRoom){
    var roomName = "加载中...";
    //0为单人，1为多人
    if(chatRoom.roomType == 0){
        roomName = chatRoom.members.filter(function(username){
            return username != Meteor.user().username;
        })[0]
    }
    if(chatRoom.roomType == 1){
        var members = chatRoom.members;
        var names = members.length <= 3 ?
            members.toString() :
            members.slice(0, 3).toString() + "...等" + members.length + "位用户";
        roomName = "(" + names + ")";
    }
    return roomName;
};

// 数组without方法
arrayWithout = function(array){
    var target = [].slice.call(arguments, 1);
    return array.filter(function(originItem){
        return !target.some(function(kickItem){
            return originItem === kickItem;
        });
    })
};