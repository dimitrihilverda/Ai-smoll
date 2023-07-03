// Options.js

// Function to save options
function saveOptions() {
  let commentInput = document.getElementById('commentInput').value;
  chrome.storage.sync.set({
    commentInput: commentInput
  }, function() {
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Function to restore options
function restoreOptions() {
  chrome.storage.sync.get({
    commentInput: ''
  }, function(items) {
    document.getElementById('commentInput').value = items.commentInput;
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);