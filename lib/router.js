//APP路由的基本配置
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        var userData = Meteor.user() && Meteor.user().profile;

        return [
            Meteor.subscribe("userData", userData)
        ];
    }
});

//路由地址,与其对应的路由模板
Router.route('/');
Router.route('/dialog/:username', {
    name: 'dialog',
    //data数据可以传到相应的render模板上，以字典的形式.
    data: function(){
        return {
            chatRoomName: this.params.username
        }
    }
});

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