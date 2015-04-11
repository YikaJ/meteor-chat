//用于储存聊天窗口
ChatRoom = new Mongo.Collection('chatRoom');

//用户属于该聊天室才可发言
//ChatRoom.allow({
//   update: function(username, members){
//       return members.some(function(username){
//           return username == username;
//       })
//   }
//});


