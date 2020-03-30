const {Color} = require("scenegraph")

const { getRGBA, fill, findReplaceElements, rgbaHTML, textHTML } = require("./utils.js");

// dialogs
let dialogs = {
  rgba: {
    element: null,
    html: rgbaHTML
  },
  text: {
    element: null,
    html: textHTML
  }
}

// initalizes dialog
function initDialog(dialog, selection) {
  if (dialogs[dialog].element == null) {
    //  create the dialog
    dialogs[dialog].element = document.createElement("dialog");

    dialogs[dialog].element.innerHTML = dialogs[dialog].html
    document.body.appendChild(dialogs[dialog].element)
    // register click listeners
    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => dialogs[dialog].element.close("reasonCanceled"));
    const fillButton = document.querySelector("#fill")
    fillButton.addEventListener("click", evt => {
      evt.preventDefault()
      dialogs[dialog].element.close("ok")
    })
    const form = dialogs[dialog].element.querySelector("form");
    form.onsubmit = function(evt) {
      evt.preventDefault()
      dialogs[dialog].element.close("ok")
    }
  }

  return dialogs[dialog].element.showModal()
  .then(result => {
    if (result === 'ok') {
        let value = document.querySelector("input").value
        if (dialog === 'rgba') {
          // fill with rgba color
          fill(selection, new Color(getRGBA(value)))
        } else if (dialog === 'text') {
          // set text
          let textArr = value.split(';')        
          findReplaceElements(selection, textArr)
        }
    }
  })
  .catch(err => {
    console.error(err.message)
  })
}

function getRGBADialog(selection) {
  return initDialog('rgba', selection)
}

function getTextDialog(selection) {
  return initDialog('text', selection)
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
