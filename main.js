//const { alert, error } = require("./lib/dialogs.js");
const {Color} = require("scenegraph");

function fillBlack(selection) {
  //let itemsNum = selection.items.length;

  //if(!itemsNum) {
  //  error("Ooops!", "You need to select at least one layer.");
  //  return;
  //}

  //for (let i = 0; i < itemsNum; i++) {
  //  let border = selection.items[i].stroke;
  //  let fill = selection.items[i].fill;
  //  if(border && fill) {
  //    selection.items[i].fill = border;
  //    selection.items[i].stroke = fill;
  //  }
  //}
  selection.items[0].fill = new Color("#000000");
}

function fillWhite(selection) {
  selection.items[0].fill = new Color("#ffffff");
}

module.exports = {
  commands: {
    fillBlack: fillBlack,
    fillWhite: fillWhite
  }
}
