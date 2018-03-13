import format from './format'

export default {
  // 转换时间格式为YYYY-MM-DD
  getFormat (date) {
    return date.getFullYear() + '-' + format.changeDate(date.getMonth() + 1) + '-' + format.changeDate(date.getDate()) + ' ' + format.changeDate(date.getHours()) + ':' + format.changeDate(date.getMinutes()) + ':' + format.changeDate(date.getSeconds())
  }
}
