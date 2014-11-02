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
    name: 'french',
    list: []
}];

function loadLocalStorage() {
    chrome.storage.sync.get("chromeDB", function(localStorage) {
        if (localStorage.chromeDB === undefined) {
            chrome.storage.sync.set({
                "chromeDB": db
            });
        } else {
            db = localStorage.chromeDB;
        }
    });
}
loadLocalStorage();

function openTab(filename) {
    var myid = chrome.i18n.getMessage("@@extension_id");
    chrome.windows.getCurrent(
        function(win) {
            chrome.tabs.query({
                    'windowId': win.id
                },
                function(tabArray) {
                    for (var i in tabArray) {
                        if (tabArray[i].url == "chrome-extension://" + myid + "/" + filename) {
                            // console.log("already opened");
                            chrome.tabs.update(tabArray[i].id, {
                                active: true
                            });
                            return;
                        }
                    }
                    chrome.tabs.create({
                        url: chrome.extension.getURL(filename)
                    });
                });
        });
}

chrome.browserAction.onClicked.addListener(function(activeTab) {
    var tabs = chrome.extension.getViews({
        type: "tab"
    });
    var newURL = "index.html";
    if (tabs[0] === undefined) {
        chrome.tabs.create({
            url: newURL
        });
    } else {
        openTab("index.html");
    }
});

db.forEach(function(listItem, index) {
    chrome.contextMenus.create({
        title: "Add '%s' to " + listItem.name,
        contexts: ["selection"],
        onclick: function(info) {
            var word = info.selectionText;
            chrome.storage.sync.get("chromeDB", function(localStorage) {
                db = localStorage.chromeDB;
                db[index].list.unshift({
                    word: word
                });
                chrome.storage.sync.set({
                    "chromeDB": db
                });
                var tabs = chrome.extension.getViews({
                    type: "tab"
                });
                if (tabs[0] !== undefined) {
                    tabs[0].renderList(true);
                }
            });
        }
    });
});
