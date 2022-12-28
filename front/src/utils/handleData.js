/**
 *
 * @param {list} 数组
 * @param {id} 唯一key
 * @param {pid} 父节点id
 * @param {subArr} 子节点数组字段名
 * @returns
 */
function listToTree(list, id = "id", pid = "pid", subArr = "sub") {
  var map = {},
    data,
    tree = [],
    i,
    len = list.length;
  map = new Map(list.map((item) => [item[id], item]));
  for (i = 0; i < len; i++) {
    data = list[i];
    let curData = map.get(data[pid]);
    if (curData && data.level != 1) {
      if (curData[subArr]) {
        curData[subArr].push(data);
      } else {
        curData[subArr] = [data];
      }
    } else {
      tree.push(data);
    }
  }
  return tree;
}
export { listToTree };
