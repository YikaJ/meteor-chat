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

