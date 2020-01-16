// returns an rgba object from a string, e.g. rgba(255, 0, 0, 0.3) or rgb(123, 123, 123)
function getRGBA(str) {
  let r, g, b, a
  let re = /\d+/g
  let res = str.match(re)
  r = parseInt(res[0])
  g = parseInt(res[1])
  b = parseInt(res[2])
  if (res.length > 3) {
    a = parseInt(parseFloat(res[3] + "." + res[4])*255)
  } else {
    a = 255
  }
  return {
    r,
    g,
    b,
    a
  }
}

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
    elements[i].fill = color
    elements[i].fillEnabled = true
  }
}

module.exports = {
  getRGBA,
  fill
};

