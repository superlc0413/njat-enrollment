export const getUrlParam = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = location.search.substr(1).match(reg)
  return r ? unescape(r[2]) : null
}

export const list2Map = (list, key = "value") => {
  return list.reduce((map, _) => (map[_[key]] = _, map), {})
}

export default { getUrlParam }
