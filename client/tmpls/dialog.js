//模板初始化
Template.dialog.onRendered(function(){

    this.$(".chatting").scrollTop(10000);
});

//模板数据
Template.dialog.helpers({
    //返回roomName
    chatRoomName: function(){
        var roomName = "";
        var roomId = Router.current().params.roomId;
        Meteor.users.findOne(Meteor.userId()).chatRooms.forEach(function(room){
            if(room.roomId == roomId){
                return roomName = room.roomName
            }
        });
        return roomName;
    },
    //返回record
    chatRecord: function(){
        //从url参数获取当前聊天room的Id
        var roomId = Router.current().params.roomId;
        //加载records数据
        return ChatRoom.findOne({roomId: roomId}) && ChatRoom.findOne({roomId: roomId}).records;
    },
    //判断是否是自己发的
    isYourself: function(author){
        if(author == Meteor.user().username){
            return "yourself";
        }
    }
});

//DOM事件处理
Template.dialog.events({
    'submit .sendMessage': function(event, template){
        event.preventDefault();

        //填充数据
        var content = template.$('.sendMessage input').val();
        var author = Meteor.user().username;
        var createTime = moment().format("YYYY-MM-DD, HH:mm:ss");
        var newRecord = {
            author: author,
            content: content,
            createTime: createTime
        };

        //仅支持id更新
        var _id = ChatRoom.findOne({roomId: Router.current().params.roomId})._id;
        ChatRoom.update(_id, {$push:{records: newRecord}}, function(){
            //更改浏览器状态
            template.$('.sendMessage input').val("");
            template.$(".chatting").scrollTop(10000);
        });
    }
});
