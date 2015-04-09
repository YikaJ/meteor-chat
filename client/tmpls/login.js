
Template.login.events({
    //提交登陆表单
    'submit': function(event, template){
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
