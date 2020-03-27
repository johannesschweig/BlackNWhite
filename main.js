const {Color} = require("scenegraph")

const { getRGBA, fill, findReplaceElements } = require("./utils.js");

// rgba dialog
let rgbaDialog;
//  lazy load the dialog
function getRGBADialog(selection) {
  if (rgbaDialog == null) {
    //  create the dialog
    rgbaDialog = document.createElement("dialog");

    rgbaDialog.innerHTML = `
      <style>
        label {
          margin: 0 8px;
        }
        input {
          width: 100%;
        }
      </style>
      <form method="dialog">
        <h1>
            <span>Fill with rgba</span>
        </h1>
        <hr />
        <p>Paste the rgb or rgba code copied from your browser</p>
        <label>
            <input type="text" placeholder="e.g. rgba(255, 0, 0, 0.3)" />
        </label>
        <footer>
            <button id="cancel" uxp-variant="primary">Cancel</button>
            <button id="fill" type="submit" uxp-variant="cta">Fill</button>
        </footer>
      </form>
    `
    document.body.appendChild(rgbaDialog)
    // register click listeners
    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => rgbaDialog.close("reasonCanceled"));
    const fillButton = document.querySelector("#fill")
    fillButton.addEventListener("click", evt => {
      evt.preventDefault()
      rgbaDialog.close("ok")
    })
    const form = rgbaDialog.querySelector("form");
    form.onsubmit = function(evt) {
      evt.preventDefault()
      rgbaDialog.close("ok")
    }
  }

  return rgbaDialog.showModal()
  .then(result => {
    if (result === 'ok') {
        // fill with rgba color
        let value = document.querySelector("input").value
        fill(selection, new Color(getRGBA(value)))
    }
  })
  .catch(err => {
    console.error(err.message)
  })
}

// text dialog
let textDialog;
function getTextDialog(selection) {
  if (textDialog == null) {
    //  create the dialog
    textDialog = document.createElement("dialog");

    textDialog.innerHTML = `
      <style>
        label {
          margin: 0 8px;
        }
        input {
          width: 100%;
        }
      </style>
      <form method="dialog">
        <h1>
            <span>Set text</span>
        </h1>
        <hr />
        <p>Write text for elements separated with semicolon (;)</p>
        <label>
            <input type="text" placeholder="e.g. 1;2;3;4" />
        </label>
        <footer>
            <button id="cancel" uxp-variant="primary">Cancel</button>
            <button id="fill" type="submit" uxp-variant="cta">Set text</button>
        </footer>
      </form>
    `
    document.body.appendChild(textDialog)
    // register click listeners
    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => textDialog.close("reasonCanceled"));
    const fillButton = document.querySelector("#fill")
    fillButton.addEventListener("click", evt => {
      evt.preventDefault()
      textDialog.close("ok")
    })
    const form = textDialog.querySelector("form");
    form.onsubmit = function(evt) {
      evt.preventDefault()
      textDialog.close("ok")
    }
  }

  return textDialog.showModal()
  .then(result => {
    if (result === 'ok') {
        // set text
        let value = document.querySelector("input").value
        let textArr = value.split(';')        
        findReplaceElements(selection, textArr)
    }
  })
  .catch(err => {
    console.error(err.message)
  })
}

function fillBlack(selection) {
  fill(selection, new Color("#000000"))
}

function fillWhite(selection) {
  fill(selection, new Color("#ffffff"))
}

module.exports = {
  commands: {
    fillBlack: fillBlack,
    fillWhite: fillWhite,
    fillRGBA: getRGBADialog,
    batchText: getTextDialog
  }
}
