```javascript
let comments = [];
let currentURL = '';

document.getElementById('saveButton').addEventListener('click', saveComment);
document.getElementById('optionsButton').addEventListener('click', openOptions);

function saveComment() {
    let commentText = document.getElementById('commentInput').value;
    let timestamp = new Date().getTime();
    let comment = { url: currentURL, timestamp: timestamp, text: commentText };
    comments.push(comment);
    chrome.storage.sync.set({ [currentURL]: comments }, function() {
        console.log('Comment saved');
    });
    document.getElementById('commentInput').value = '';
    loadComments();
}

function loadComments() {
    chrome.storage.sync.get([currentURL], function(result) {
        comments = result[currentURL] || [];
        let commentList = document.getElementById('commentList');
        commentList.innerHTML = '';
        comments.forEach(function(comment) {
            let listItem = document.createElement('li');
            listItem.textContent = comment.text;
            commentList.appendChild(listItem);
        });
    });
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}

function init() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        currentURL = tabs[0].url;
        loadComments();
    });
}

document.addEventListener('DOMContentLoaded', init);
```