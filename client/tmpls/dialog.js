//模板初始化
Template.dialog.onRendered(function(){
    var _this = this;

    this.$(".chatting").scrollTop(10000);
    var currentRoomId = Router.current().params.roomId;

    //确定当前聊天室窗口
    this.$(".chatting").parents("body").find("#" + currentRoomId).addClass("active");

    //利用_uihooks来控制模板响应渲染，来获取到最新响应的数据.还支持insertElement，moveElement和removeElement。
    this.find(".chatting ul")._uihooks = {
        insertElement: function(node, next){
            $(node).hide().insertBefore(next).fadeIn();
            _this.$(".chatting").scrollTop(_this.$(".chatting ul").height() + 1000);
        }
    };

});

//模板数据
Template.dialog.helpers({
    //返回当前chatRoom的属性

    //返回roomName
    roomName: function(){
        if(Meteor.user()){
            return getRoomName(ChatRoom.findOne({_id: Router.current().params.roomId}));
        }
    },
    //返回record
    chatRoom: function(){
        //从url参数获取当前聊天room的Id
        var roomId = Router.current().params.roomId;
        //从本地数据库加载records数据
        return ChatRoom.findOne({_id: roomId});
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
    // 提交信息
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
        template.$('.sendMessage input').val("");

        //仅支持id更新,本地数据库的变化会推送到远程数据库
        ChatRoom.update(Router.current().params.roomId, {$push:{records: newRecord}}, function(){
            //更改浏览器状态
            template.$(".chatting").scrollTop(template.$(".chatting ul").height() + 1000);
        });
    },

    // 退出群聊
    "click .sendMessage button[type=button]": function(event, template){
        if(confirm("您确定将要退出此群聊吗？")){
            var roomId = Router.current().params.roomId;
            var members = ChatRoom.findOne(roomId).members;
            console.log(members);
            // 过滤出当前用户,退出群聊，若群聊成员为空，则删除该chatRoom
            ChatRoom.update(roomId, {$pull: {"members": Meteor.user().username}}, function(){
                //本地数据库已经没有该聊天室记录，需要提交到服务器验证是否为空
                Meteor.subscribe("clearEmptyRoom", roomId);
            });
            Router.go("/");
        }
    }

});
