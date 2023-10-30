document.getElementById('toggleButton').addEventListener('click', function() {
    chrome.storage.local.get('contentScriptStatus', function(data) {
        let newStatus = !data.contentScriptStatus;
        chrome.storage.local.set({ 'contentScriptStatus': newStatus }, function() {
            updateIndicator(newStatus);
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "toggleContentScript", status: newStatus});
            });
        });
    });
});

function updateIndicator(status) {
    let indicatorElem = document.getElementById('indicator');
    if (status) {
        indicatorElem.textContent = 'Block On';
        indicatorElem.style.color = 'white';
        indicatorElem.style.fontWeight = 'bold';
        indicatorElem.style.fontSize = '18px'; 
        var audio = new Audio('../assets/audio/Goose_sound.mp3'); 
        audio.play();
    } else {
        indicatorElem.textContent = 'Block Off';
        indicatorElem.style.color = 'black';
        indicatorElem.style.fontWeight = 'bold'; 
        indicatorElem.style.fontSize = '18px';
    }
}

// On popup load, display the current status
window.onload = function() {
    chrome.storage.local.get('contentScriptStatus', function(data) {
        updateIndicator(data.contentScriptStatus);
    });
};
