function copy(text) {
  try {
    var range = document.createRange();
    var selection = document.getSelection();

    var mark = document.createElement("mark");
    mark.textContent = text;
    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
  } catch(err) {
    console.error('unable to copy, trying IE specific stuff');
    try {
      window.clipboardData.setData("Text", text);
    } catch(err) {
      console.error('unable to copy, falling back to prompt');
      window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }
  } finally {
    if (typeof selection.removeRange == 'function') {
      selection.removeRange(range);
    } else {
      selection.removeAllRanges();
    }
    document.body.removeChild(mark);
  }
}
module.exports = copy;