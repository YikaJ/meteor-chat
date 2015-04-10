var record = [{author: 'yika', content: 'yeah!'}];

Template.dialog.helpers({
    chatRecord: function(){
        return record;
    }
});

Template.dialog.events({
    'click .sendMessage button': function(event, template){
        event.preventDefault();

        var content = template.$('.sendMessage input').val();
        var author = Meteor.user().username;
        var newRecord = {
            author: author,
            content: content
        };
        console.log(record)
        Tracker.autorun(function(){
            record.push(newRecord);
        });

    }
});