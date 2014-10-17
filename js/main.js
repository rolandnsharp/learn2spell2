var db = [{
    name: 'list 1',
    list: [{
        word: 'start',
        definition: 'Using Learn2Spell is easy. If, while.'
    }, {
        word: 'typing',
        definition: 'You can also add words manually with the inpbove.'
    }]
}, {
    name: 'english'
}, {
    name: 'french'
}];





$(document).ready(function() {

    $('#newList').click(function() {
        $(".tabs").append("<div class=\"btn-group\"><button type=\"button\" class=\"btn btn-default \">default list</button><button type=\"button\" class=\"btn btn-default \">x</button></div>");
    });


});
