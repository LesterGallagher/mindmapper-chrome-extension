
var openWebsite = document.getElementById('open-website');
var openMindmap = document.getElementById('open-mindmap');

var dim = "width=800,height=650";

openWebsite.onclick = function() {
    window.open('https://mindmapper.esstudio.site', '_blank');
}

chrome.storage.sync.get('room', function (ret) {
    var room = ret.room;
    if (room) {
        openMindmap.onclick = () => {
            window.open('https://mindmapper.esstudio.site/mindmapper.html?ispublic=true&room=' + room, "gc-popout-window", dim)
        }
        openMindmap.removeAttribute('disabled');
    } else {
        var obj = {
            static: {
                name: 'Created by chrome extension.',
                id: Math.random().toString(36),
            },
            elems: [
                {
                    key: 'default key',
                    id: 0,
                    type: 0,
                    leftpos: '80px',
                    toppos: '80px',
                    connected_elems: [],
                    'font-size': '25.6px',
                    content: 'new title'
                }
            ],
            lines: []
        };

        fetch('https://api.myjson.com/bins', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(data => {
                var urlPortions = data.uri.split('/');
                var id = urlPortions[urlPortions.length - 1];
                openMindmap.onclick = () => {
                    window.open('https://mindmapper.esstudio.site/mindmapper.html?ispublic=true&room=' + id, "gc-popout-window", dim)
                }
                openMindmap.removeAttribute('disabled');
                chrome.storage.sync.set({ room: id }, function () {
                    console.log("Id set");
                });
            }).catch(err => {
                alert("\nError: " + err.toString());
            })
    }
});




