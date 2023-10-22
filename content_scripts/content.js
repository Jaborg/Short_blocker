console.log("Content script started");

// Find the specific span element with id="title" and content "Shorts"


// Find the specific span element with id="title" and content "Shorts"
let targetSpan = Array.from(document.querySelectorAll('span#title.style-scope.ytd-rich-shelf-renderer')).find(span => span.textContent.trim() === 'Shorts');

// If the span is found, traverse upwards to find the closest parent <div> with id="content"
if (targetSpan) {
    let parentDivWithIdContent = targetSpan.closest('div#content');
    console.log(parentDivWithIdContent);


    // If the parent <div> with id="content" is found, delete it
    if (parentDivWithIdContent) {
        parentDivWithIdContent.remove();
    }
}


console.log("Content script finished");