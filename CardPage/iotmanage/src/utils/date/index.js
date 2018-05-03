// export function formatDate(date) {
//   return date.getFullYear() + '-' + changeDate(date.getMonth() + 1) + '-' + changeDate(date.getDate()) + ' ' + changeDate(date.getHours()) + ':' + changeDate(date.getMinutes()) + ':' + changeDate(date.getSeconds())
// }
//
// function changeDate(date) {
//   return (date.toString().length === 1 ? '0' + date : date)
// }
// export function formatDate (date, fmt) {
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }
//   let o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   };
//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + '';
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//     }
//   }
//   return fmt;
// }
//
// function padLeftZero (str) {
//   return ('00' + str).substr(str.length);
// }
export default {
  formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt
  }
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
