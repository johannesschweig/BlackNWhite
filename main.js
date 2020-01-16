const {Color} = require("scenegraph")

const { getRGBA, fill } = require("./utils.js");

// rgba dialog
let dialog;
//  lazy load the dialog
function getDialog(selection) {
  if (dialog == null) {
    //  create the dialog
    dialog = document.createElement("dialog");

    dialog.innerHTML = `
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
    document.body.appendChild(dialog)
    // register click listeners
    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => dialog.close("reasonCanceled"));
    const fillButton = document.querySelector("#fill")
    fillButton.addEventListener("click", evt => {
      evt.preventDefault()
      dialog.close("ok")
    })
    const form = dialog.querySelector("form");
    form.onsubmit = function(evt) {
      evt.preventDefault()
      dialog.close("ok")
    }
  }

  return dialog.showModal()
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
    fillRGBA: getDialog
  }
}
