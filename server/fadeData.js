//如果不存在数据,给予其初始数据
if(Meteor.users.find().count() === 0){
    Accounts.createUser({
        username: 'admin',
        password: 'admin'
    });
    Meteor.users.update({username: 'admin'}, {$set: {
        friends: ['yika', 'jimklose', 'kelvin', 'youmei'],
        chatRooms: [
            {
                roomId: 1,
                roomName: 'yika',
                roomType: 0 //0为单人，1为多人。
            }
        ]
    }});
    Accounts.createUser({
        username: 'yika',
        password: '123'
    });
    Meteor.users.update({username: 'yika'}, {$set: {
        friends: ['admin', 'jimklose', 'kelvin', 'youmei'],
        chatRooms: [
            {
                roomId: 1,
                roomName: 'admin',
                roomType: 0 //0为单人，1为多人。
            }
        ]
    }});
}

//聊天室数据初始化
if(ChatRoom.find().count() === 0){
    ChatRoom.insert({
        roomId: '1',
        roomType: 0,
        members: ['admin', 'yika'],
        records: []
    })
}
