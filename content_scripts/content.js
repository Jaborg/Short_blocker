console.log("Content script loaded");

function removeShorts() {
    let targetSpan = Array.from(document.querySelectorAll('span#title.style-scope.ytd-rich-shelf-renderer')).find(span => span.textContent.trim() === 'Shorts');

    if (targetSpan) {
        let parentDivWithIdContent = targetSpan.closest('div#content');
        console.log(parentDivWithIdContent);

        if (parentDivWithIdContent) {
            parentDivWithIdContent.remove();
        }
    }

    console.log("Shorts removal attempted");
}

// Check the status on content script load:
chrome.storage.local.get('contentScriptStatus', function(data) {
    if (data.contentScriptStatus) {
        removeShorts();
    }
});

// Listen for changes to the status:
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "toggleContentScript") {
        if (message.status) {
            removeShorts();
        }else{
            location.reload();
        }
        // If disabling, you might need to reload the page or reverse any changes made.
        // For example: location.reload();
    }
});
