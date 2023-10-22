document.getElementById('readHtml').addEventListener('click', function() {
    console.log("Button clicked");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['content_scripts/content.js']
        }, (injectionResults) => {
            for (const frameResult of (injectionResults ?? [])) {
                if(chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    return;
                }
                console.log(`Injected script into frame ${frameResult.frameId}`);
            }
        });
        console.log(tabId);
    });
});
