//APP路由的基本配置
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        //先从服务器加载聊天数据，这里得到的数据并不能直接使用，而是存入miniMongo中。
        return [
            Meteor.subscribe("userData"), // 用户数据
            Meteor.subscribe("getChatRooms", Meteor.user() && Meteor.user().username) // 当前用户所属的聊天室数据
        ]
    }
});

//路由地址,与其对应的路由模板
Router.route('/');
Router.route('newChatRoom', {name: 'newChatRoom'});
Router.route('/dialog/:roomId', {name: 'dialog'});

//路由Hook拦截
//var requireLogin = function() {
//    if(!Meteor.userId()){
//        Router.go('login');
//        this.next();
//    }else{
//        this.next();
//    }
//};
//
//Router.onBeforeAction(requireLogin, {expect: ['login']});