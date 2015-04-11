var users = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
//如果不存在数据,给予其初始数据
Meteor.startup(function(){
    if(Meteor.users.find().count() === 0){
        users.forEach(function(username){
            Accounts.createUser({
                username: username,
                password: '123'
            });
        });
    }

    users.forEach(function(currentUser){
        Meteor.users.update({username: currentUser}, {$set: {
            friends: users.filter(function(username){return username != currentUser})
        }});
    });
});

//聊天室数据初始化
if(ChatRoom.find().count() === 0){
    //导入 1对1 数据
    for(var i = 0; i < users.length - 1; i++){
        for(var j = i + 1; j < users.length; j++){
            ChatRoom.insert({
                roomType: 0,
                members: [users[i], users[j]],
                records: []
            });
        }
    }
}
