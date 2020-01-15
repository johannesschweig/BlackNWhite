const {Color} = require("scenegraph");

// find all elements in a selection
function findElements(array) {
  let elements = []
  array.forEach(function (e) {
    if (e.constructor.name === "Group") {
      let a = findElements(e.children)
      elements = elements.concat(a)
    } else {
      elements.push(e)
    }
  })
  return elements
}

// fill all elements in selection with a color
function fill(selection, color) {
  let elements = findElements(selection.items)
  for (let i = 0; i < elements.length; i++) {
    elements[i].fill = color;
    elements[i].fillEnabled = true;
  }
}

function fillBlack(selection) {
  fill(selection, new Color("#000000"));
}

function fillWhite(selection) {
  fill(selection, new Color("#ffffff"));
}

module.exports = {
  commands: {
    fillBlack: fillBlack,
    fillWhite: fillWhite
  }
}
