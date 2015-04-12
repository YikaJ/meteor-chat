Template.newChatRoom.helpers({
    friends: function(){
        if(Meteor.user() && Meteor.user().friends){
            return Meteor.user().friends;
        }
    }
});

Template.newChatRoom.events({
    // 选择成员
    "click .selectMembers label": function(event, template){
        template.$(event.currentTarget).toggleClass("active");
        //  显示active数目
        template.$(".showCount output").html(template.$(".selectMembers label.active").length);
    },

    //发送选择成员
    "submit .selectMembers": function(event, template){
        event.preventDefault();
        var members = [Meteor.user().username];
        var checked = template.$("input[type=checkbox]:checked");
        if(checked.length <= 0) return alert("请选择要发起群聊的好友！");
        checked.each(function(index, item){
            members.push(item.value);
        });
        var roomNewId = ChatRoom.insert({
            roomType: 1,
            members: members,
            records: []
        }, function(){
            //更改用户只允许在服务器端
            Meteor.subscribe("updateUser", {$push: {"chatRooms": roomNewId}});
            Router.go("/dialog/" + roomNewId);
        });
    }
});
