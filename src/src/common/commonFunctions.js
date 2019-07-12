
export function insertTabTextArea(event) {
    let tabKeyCode = 9;
    let obj = event.target;
    let keycode;

    if (event.which)
        keycode = event.which;
    else
        keycode = event.keyCode;
    if (keycode === tabKeyCode) {
        if (event.type === "keydown") {
            if (obj.setSelectionRange) {
                let s = obj.selectionStart;
                let e = obj.selectionEnd;
                obj.value = obj.value.substring(0, s) + "\t" + obj.value.substr(e);
                obj.setSelectionRange(s + 1, s + 1);
                obj.focus();
            } else if (obj.createTextRange) {
                document.selection.createRange().text = "\t"
                obj.onblur = function () {
                    this.focus();
                    this.onblur = null;
                }
                    ;
            } else { }
        }
        if (event.returnValue)
            event.returnValue = false;
        if (event.preventDefault)
            event.preventDefault();
        return false;
    }
    return true;
}