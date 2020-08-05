const {Color} = require("scenegraph")

const { getRGBA, fill, findReplaceElements, rgbaHTML, textHTML, fontColorHTML } = require("./utils.js");

// dialogs
let dialogs = {
  rgba: {
    element: null,
    html: rgbaHTML
  },
  text: {
    element: null,
    html: textHTML
  },
  fontColor: {
    element: null,
    html: null
  }
}

// initalizes dialog
function initDialog(dialog, selection) {
  if (dialog === 'fontColor') {
    dialogs[dialog].html = fontColorHTML(selection)
  }
  if (dialogs[dialog].element == null) {
    //  create the dialog
    dialogs[dialog].element = document.createElement("dialog");

    dialogs[dialog].element.innerHTML = dialogs[dialog].html
    document.body.appendChild(dialogs[dialog].element)
    // register click listeners
    /// cancel button
    const cancelButton = document.querySelector("#cancel");
    cancelButton.addEventListener("click", () => dialogs[dialog].element.close("reasonCanceled"));
    /// action button
    if (dialog !== 'fontColor') {
      const actionButton = document.querySelector("#action")
      actionButton.addEventListener("click", evt => {
        evt.preventDefault()
        dialogs[dialog].element.close("ok")
      })
    }
    const form = dialogs[dialog].element.querySelector("form");
    form.onsubmit = function(evt) {
      evt.preventDefault()
      dialogs[dialog].element.close("ok")
    }
  }
  // fontColorHTML
  if (dialog === 'fontColor') {
    dialogs[dialog].element.innerHTML = dialogs[dialog].html
  }

  return dialogs[dialog].element.showModal()
  .then(result => {
    if (result === 'ok') {
        let value = document.querySelector("input").value
        if (dialog === 'rgba') {
          // fill with rgba color
          // console.log('rgba', value)
          fill(selection, new Color(getRGBA(value)))
        } else if (dialog === 'text') {
          // set text
          // console.log('text', value)
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

function getFontColorDialog(selection) {
  return initDialog('fontColor', selection)
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
    batchText: getTextDialog,
    fontColor: getFontColorDialog
  }
}
