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

// sorting from left to right, top to bottom
function sortXY(a, b) {
  let xDiff = a.globalBounds.x - b.globalBounds.x
  let yDiff = a.globalBounds.y - b.globalBounds.y
  return yDiff === 0 ? xDiff : yDiff
}

// replace text in elements
// the text is applied from left to right, top to bottom
function findReplaceElements(selection, textArr) {
  let elements = findElements(selection.items)
  let i = 0
  elements = elements.sort(sortXY)
  elements.forEach(function (e) {
    if (e.constructor.name === 'Text') {
      if (textArr[i]) {
        e.text = textArr[i]
        i += 1
      } else {
        e.text = textArr[i-1]
      }
    }
  })
}

const rgbaHTML = `
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

const textHTML = `
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

module.exports = {
  getRGBA,
  fill,
  findReplaceElements,
  rgbaHTML,
  textHTML
};

