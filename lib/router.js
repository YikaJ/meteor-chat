//APP路由的基本配置
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        // Making sure setting_one and setting_two are available (which they won't be initially)
        var userData = Meteor.user() && Meteor.user().profile;

        // Subscribe to the published version of the server side collections
        return [
            Meteor.subscribe("userData", userData)
        ];
    }
});

//路由地址,与其对应的路由模板
Router.route('/', {
    name: 'app'
});
Router.route('/login', {name: 'login'});

//路由Hook拦截
var requireLogin = function() {
    if(!Meteor.userId()){
        this.render('login');
    }else{
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {expect: ['login']});