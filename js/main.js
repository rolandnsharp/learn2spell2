var db = [{
    name: 'list 1',
    options: '',
    list: [{
        word: 'start',
        definition: 'Using Learn2Spell is easy. If, while.'
    }, {
        word: 'typing',
        definition: 'You can also add words manually with the inpbove.'
    }, {
        word: 'typing33',
        definition: 'You can also add 333333333333333333333333th the inpbove.'
    }]
}, {
    name: 'english',
    list: [{
        word: 'start',
        definition: 'Using Learn2Spell is easy. If, while.'
    }, {
        word: 'typing',
        definition: 'You can also add words manually with the inpbove.'
    }]
}, {
    name: 'french'
}];

var activeList = 0;

function renderTabs() {
    $('.tabs').empty();
    db.forEach(function(list, index) {
        $('.tabs').append("<div class=\"btn-group\"><button type=\"radio\" class=\"btn btn-default tab\" data-id='" +
            index + "'>" + list.name +
            "</button><button type=\"button\" class=\"btn btn-default options\" data-id='" +
            index + "'><span class=\"glyphicon glyphicon-cog\"></span></button></div>\n");
    });
    $("[data-id='"+activeList+"']").addClass('active');
}

function renderList() {
    $('#wordList').empty();
    // $('#activeWord').text(db[activeList].list[0].word);
    $('#define').text(db[activeList].list[0].definition);

    db[activeList].list.forEach(function(listObj, index) {
        if (index === 0) {
            $('#wordList').append('<h1 id="activeWord">' + listObj.word + '</h1>');
        } else {
            $('#wordList').append('<h1>' + listObj.word + '</h1>').css('color', 'gray');
        }
    });
}



$(document).ready(function() {



    renderTabs();
    renderList();






    $('#newList').click(function() {
        db.push({
            name: 'list ' + (db.length + 1)
        });
        renderTabs();
    });

    $('body').on('click', ".tab", function(ev) {
        var clicked = $(ev.currentTarget);
        activeList = clicked.attr("data-id");
        renderTabs();
        renderList();
    });

    $('body').on('click', ".options", function(ev) {
        var clicked = $(ev.currentTarget);
        activeList = clicked.attr("data-id");
        $('#rename-input').attr("placeholder", db[activeList].name);
        $('#optionsModal').modal();
        renderTabs();
        renderList();
    });

    $('.delete-list').click(function() {
        if (confirm("Are you sure you want to delete list '" + db[activeList].name + "' ") === true) {
            db.splice(activeList, 1);
            activeList = 0;
            renderTabs();
            renderList();
            $('#optionsModal').modal('hide');
        //save
        }


    });

});



var textValue = "";

$(document).keypress(function(e) { /// need keypress for french characters . backspace needs fixing
    // if (wordObject.length <= 0) {
    //     return;
    // }
    // if (bodyPress === true) {
    //     $('.wordlist-container').hide();

    var c = String.fromCharCode(e.which);
    textValue = textValue + c;
    var fulltext = textValue;
    var lowText = fulltext.toLowerCase();

    $('#activeWord').empty();

    for (var d = 0; d < db[activeList].list[0].word.length; d = d + 1) {

        $('#activeWord').append("<h7>" + db[activeList].list[0].word.substring(d, d + 1) + "</h7>");
    }

    $('#activeWord h7:nth-child(' + (lowText.length + 1) + ')').css({
        "border": "1px dotted black"
    });


    console.log(lowText);

});
