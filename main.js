const {Color} = require("scenegraph");

// fill all elements in selection with a color
function fill(selection, color) {
  let itemsNum = selection.items.length;
  for (let i = 0; i < itemsNum; i++) {
    selection.items[i].fill = color;
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
