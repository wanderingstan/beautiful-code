// Maybe better: https://stackoverflow.com/a/70001920/59913
// with: https://web.dev/file-system-access/#ask-the-user-to-pick-a-file-to-read

// https://stackoverflow.com/a/48550997/59913
function downloadText(elementId, filename = "default.txt") {
  var text = document.getElementById(elementId).value;
  text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
  var blob = new Blob([text], { type: "text/plain" });
  var anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target = "_blank";
  anchor.style.display = "none"; // just to be safe!
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function loadFile(elementId, fileUrl) {
  if (fileUrl === "PROMPT") {
    fileUrl = prompt(
      "Enter file URL:",
      "https://raw.githubusercontent.com/tree-sitter/tree-sitter/master/docs/assets/js/playground.js"
    );
  }
  $.get(fileUrl, function (result) {
    editor.getDoc().setValue(result);
  });
}
