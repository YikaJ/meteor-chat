//如果不存在数据,给予其初始数据
if(Meteor.users.find().count() === 0){
    Accounts.createUser({
        username: 'admin',
        password: 'admin'
    });
    Meteor.users.update({username: 'admin'}, {$set: {friends: ['yika', 'jimklose', 'kelvin', 'youmei']}});
    Accounts.createUser({
        username: 'yika',
        password: '123'
    });
    Meteor.users.update({username: 'yika'}, {$set: {friends: ['admin', 'jimklose', 'kelvin', 'youmei']}});
}
