const base = 'v1/'

export default {
  getCity (type) {
    return base + 'cities?type=' + type
  },
  getUser () {
    return base + 'users/list'
  }
}
