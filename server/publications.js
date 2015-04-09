Meteor.publish("userData", function () {
    if (this.userId) {
        //返回用户的数据
        return Meteor.users.find({_id: this.userId});
    } else {
        this.ready();
    }
});