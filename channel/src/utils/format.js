export default {
  // 将日期里一位数的变成两位数
  changeDate (date) {
    return (date.toString().length === 1 ? '0' + date : date)
  }
}
