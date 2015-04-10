//路由处理
if(Meteor.userId()){
    Router.go('app');
}

//Template.events和backbone的事件处理十分相像
Template.login.events({
    //提交登陆表单
    'submit #userForm': function(event, template){
        event.preventDefault();

        var username = template.$('[name=username]').val();
        var password = template.$('[name=password]').val();

        //account-password包提供的login
        Meteor.loginWithPassword(username, password, function(err){
            if(err){
                return alert(err.reason);
            }
            Router.go('app');
        });
    }
});

