import Vue from 'vue'
import { Message } from 'element-ui'
// Vue.use(Message)
Vue.prototype.$message = Message
export default {
  log (param) {
    console.log(param[0])
    console.log(param[1])
  },
  clearParam (param) {
    if (typeof param === "object") {
      if (Array.isArray(param)) {
        param = []
      } else {
        for(let key in param) {
          param[key] = ''
        }
      }
    } else if (typeof param === 'undefined' || typeof param === 'boolean' || typeof param === 'number' || typeof param === 'string') {
      param = ''
    }
  },
  checkParam (obj) {
    if (obj.emptyLimit === 'false') {
      console.log('isempty-false')
      if (obj.type === 'max') {
        console.log('type-max')
        if (obj.param.length > obj.content) {
          console.log('type-max-error')
          Message.error(obj.msg)
          return false
        }
      } else if (obj.type === 'min') {
        console.log('type-min')
        if (obj.param.length < obj.content) {
          console.log('type-min-error')
          Message.error(obj.msg)
          return false
        }
      } else if (obj.type === 'regexp') {
        console.log('type-regexp')
        if (obj.content[1]) {
          console.log('type-regexp-2')
          if (obj.content[0].test(obj.param) || obj.content[1].test(obj.param)) {
            return true
          } else {
            console.log('type-regexp-2-error')
            // this.$message.error(msg)
            Message.error(obj.msg)
            return false
          }
        } else {
          console.log('type-regexp-1')
          if (!obj.content[0].test(obj.param)) {
            console.log('type-regexp-1-error')
            Message.error(obj.msg)
            return false
          }
        }
      }
    } else {
      console.log('isempty-true')
      if (obj.param) {
        console.log('param-true')
        if (obj.type === 'max') {
          console.log('type-max')
          if (obj.param.length > obj.content) {
            console.log('type-max-error')
            Message.error(obj.msg)
            return false
          }
        } else if (obj.type === 'min') {
          console.log('type-min')
          if (obj.param.length < obj.content) {
            console.log('type-min-error')
            Message.error(obj.msg)
            return false
          }
        } else if (obj.type === 'regexp') {
          console.log('type-regexp')
          if (obj.content[1]) {
            console.log('type-regexp-2')
            if (obj.content[0].test(obj.param) || obj.content[1].test(obj.param)) {
              return true
            } else {
              console.log('type-regexp-2-error')
              // this.$message.error(msg)
              Message.error(obj.msg)
              return false
            }
          } else {
            console.log('type-regexp-1')
            if (!obj.content[0].test(obj.param)) {
              console.log('type-regexp-1-error')
              Message.error(obj.msg)
              return false
            }
          }
        }
      } else {
        console.log('param-false')
        Message.error(obj.paramName + '不可为空')
        return false
      }
    }
  return true
  }
}
