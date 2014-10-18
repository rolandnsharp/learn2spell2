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

chrome.storage.sync.get("chromeDB", function(localStorage) {
    if (localStorage.chromeDB === undefined) {
        chrome.storage.sync.set({
            "chromeDB": db
        });
    } else {
        db = localStorage.chromeDB;
    }
});

function renderTabs() {
    $('.tabs').empty();
    db.forEach(function(list, index) {
        $('.tabs').append("<div class=\"btn-group\"><button type=\"radio\" class=\"btn btn-default tab\" data-id='" +
            index + "'>" + list.name +
            "</button><button type=\"button\" class=\"btn btn-default options\" data-id='" +
            index + "'><span class=\"glyphicon glyphicon-cog\"></span></button></div>\n");
    });
    $("[data-id='" + activeList + "']").addClass('active');
}

function renderList() {
    $('#wordList').empty();
    // $('#activeWord').text(db[activeList].list[0].word);
    $('#define').text(db[activeList].list[0].definition);

    db[activeList].list.forEach(function(listObj, index) {
        if (index === 0) {
            $('#wordList').append('<h1 id="activeWord"></h1>');

            for (var d = 0; d < db[activeList].list[0].word.length; d = d + 1) {

                $('#activeWord').append("<h7>" + db[activeList].list[0].word.substring(d, d + 1) + "</h7>");
            }
        } else {
            $('#wordList').append('<h1>' + listObj.word + '</h1>').css('color', 'gray');
        }
    });
}

function next() {
    db[activeList].list.push(db[activeList].list.shift());
    renderList();
    textValue = "";
}



$(document).ready(function() {



    renderTabs();
    renderList();


    $('#newList').click(function() {
        var name = prompt('New list name.');
        if (name === null || name.length === 0) {
            return;
        }
        db.push({
            name: name,
            list: []
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

    $('#next').click(function() {
        next();
    });

});



var textValue = "";


// function noReset() {

//     $(document).keydown(function(e) {
//         if (e.which === 8) {
//             textValue = textValue.substring(0, textValue.length - 1);
//             $('#activeWord h7:nth-child(n+' + (textValue.length + 1) + ')').css({
//                 color: '#000000'
//             });
//         }
//     });

//     $(document).keypress(function(e) {
//         var c = String.fromCharCode(e.which);

//         if (textValue.length < db[activeList].list[0].word.length) {
//             textValue = textValue + c;
//         }

//         if (textValue.toLowerCase() === db[activeList].list[0].word.substring(0, textValue.length).toLowerCase()) {
//             $('#activeWord h7:nth-child(' + textValue.length + ')').css({
//                 color: '#5bd642'
//             });
//         } else {

//             $('#activeWord h7:nth-child(' + textValue.length + ')').css({
//                 color: '#e01432'
//             });
//         }

//         if (textValue.toLowerCase() === db[activeList].list[0].word.toLowerCase()) {
//             next();
//         }
//         console.log(textValue);
//     });
// }

// noReset();

// function whiteSpaceIndexes() {
// 	db[activeList].list[0].word.split();
//     for (var i = 0; i < db[activeList].list[0].word.length; i++) {
//         if
//         // textValue.indexOf(' ', i);
//     };
// }


// function getAllIndexes(str, val) {
//     var indexes = [], i;
//     for(i = 0; i < str.length; i++)
//         if (str.slice(i, i+1) === val)
//             indexes.push(i);
//     return indexes;
// }

function hideCurrentWord() {

    $(document).keydown(function(e) {
        if (e.which === 8) {
            textValue = textValue.substring(0, textValue.length - 1);
            $('#activeWord h7:nth-child(n+' + (textValue.length + 1) + ')').css({
                color: '#000000'
            });
        }
    });

    $(document).keypress(function(e) {
        var c = String.fromCharCode(e.which);

        // console.log(getAllIndexes(db[activeList].list[0].word, ' '));





        if (textValue.length < db[activeList].list[0].word.length) {
            textValue = textValue + c;
        }

        if (textValue.toLowerCase() === db[activeList].list[0].word.substring(0, textValue.length).toLowerCase()) {
        	//success
            $('#activeWord h7:nth-child(' + textValue.length + ')').css({
                color: '#5bd642'
            });
        } else {
        	//fail

        	var startOfWordIndex = textValue.lastIndexOf(' ', textValue.length) + 1;
        	textValue = textValue.slice(0, startOfWordIndex);
        	console.log(textValue);
            $('#activeWord h7:nth-child(n+' + (startOfWordIndex) + ')').css({
                color: '#000000'
            });
        }

        if (textValue.toLowerCase() === db[activeList].list[0].word.toLowerCase()) {
            next();
        }
        console.log(textValue);
    });
}

hideCurrentWord();









// todo : popup reminder
