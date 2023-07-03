```javascript
let comments = [];
let currentURL = '';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments: [] });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    currentURL = changeInfo.url;
    chrome.storage.sync.get(['comments'], (result) => {
      comments = result.comments.filter(comment => comment.url === currentURL);
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    let newComment = {
      url: currentURL,
      timestamp: new Date().getTime(),
      text: request.text
    };
    comments.push(newComment);
    chrome.storage.sync.set({ comments: comments }, () => {
      sendResponse({ message: 'Comment saved' });
    });
  } else if (request.message === 'LOAD_COMMENTS') {
    sendResponse({ comments: comments });
  }
  return true;
});
```