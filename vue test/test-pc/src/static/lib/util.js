function getRandomCoords(bound) {
  const minX = bound.min.x
  const minY = bound.min.y
  const maxX = bound.max.x
  const maxY = bound.max.y
  var _x = Math.floor(Math.random() * (maxX - minX)) + minX
  var _y = Math.floor(Math.random() * (maxY - minY)) + minY
  return { x: _x, y: _y }
}

var _markers = []

function _randomDomMarker(map, num) {
  for (let index = 0; index < num; index++) {
    var domMarker = new fengmap.FMDomMarker({
      x: getRandomCoords(map.getBound()).x,
      y: getRandomCoords(map.getBound()).y,
      content: '<p class="my-popup">' + getRandomCoords(map.getBound()).x + '</p>',
      domWidth: 10,
      domHeight: 10
    })
    var level = map.getLevel()
    var floor = map.getFloor(level)
    domMarker.addTo(floor)
    _markers.push(domMarker)
  }
}

function _clearAllDomMarker() {
  _markers.forEach(marker => {
    marker.remove()
  })
}
