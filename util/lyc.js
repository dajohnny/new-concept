let txt = ''
const findTags = (index, strArray, number) => {
  /**
   * 查找标签（包括任何扩展的标签）
   * 此方法能匹配所有格式的标签
   * 因为此方法是在后面写的，所以时间标签并没有使用此方法
   */
  number = number || txt.length
  number = (number > txt.length) ? txt.length : number
  var i = 0
  var complete = 0
  var value1 = 0
  var obj = {}
  obj.booble = false
  obj.value = '['
  for (i = index; i < number; i++) {
    if (txt.substr(i, 1) === strArray[complete].s) {
      complete += 1
      if (complete > 1) {
        if (complete < strArray.length) {
          obj.value += '{value:"' + txt.substr(value1 + 1, i - value1 - 1) + '"},'
        } else {
          obj.value += '{value:"' + txt.substr(value1 + 1, i - value1 - 1) + '"}]'
        }
      }
      if (complete === strArray.length) {
        obj.txt = txt.substr(index, i - index + 1)
        // obj.value = eval('(' + obj.value + ')')
        obj.value = `${obj.value}`
        obj.index = i + 1
        obj.booble = true
        break
      }
      value1 = i
    } else if (txt.substr(i, 1) === '\n') {
      obj.booble = false
      return obj
    } else if (txt.substr(i, 1) === strArray[0].s && complete > 0) {
      // 遇到2次开始标志就退出
      obj.booble = false
      return obj
    }
  }
  if (value1) {
  }
  return obj
}

// 查找歌词： 有则返回 歌词、继续查找的位置， 否则只返回继续查找的位置
export const findlyric = (index) => {
  var obj = {}
  var str = txt
  var i
  for (i = index; i < str.length; i++) {
    if (str.charAt(i) === '[') {
      var _obj = findTags(i, [{s: '['}, {s: ':'}, {s: ']'}])
      if (_obj.booble) {
        // i + _obj.txt.length;
        obj.index = i
        obj.lyric = str.substr(index, i - index)
        return obj
      }
    } else if (str.charAt(i) === '\n') {
      obj.index = i + 1
      obj.lyric = str.substr(index, i - index)
      return obj
    }
  }
  // 专处理最后一句歌词（最后一句歌词比较特殊）
  if (i === str.length) {
    obj.index = i + 1
    obj.lyric = str.substr(index, i - index)
    return obj
  }
  obj.index = i
  return obj
}
