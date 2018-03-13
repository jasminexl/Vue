<template>
    <nav>
      <ul class="nav-first">
        <li v-for="(item, index) in navList" :class="{firstli: item.id !== 1}">
          <a @click="dropdwon(item.id)" class="first-a">{{item.title}}</a>
          <transition name="collapse">
            <ul v-if="item.subnav" class="nav-second" :id="item.id">
              <li v-for="subitem in item.subnav"
                  @click="getId(subitem.id)"
                  :class="{ pinkbg : nowid === subitem.id }">
                <a @click="goto(subitem.url)">{{subitem.title}}</a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        menuid: 0,
        nowid: '',
        navList: [
          {
            id: 1,
            title: '大标题一',
            subnav: [
              {
                id: 11,
                title: '小标题一',
                url: 'one'
              },
              {
                id: 12,
                title: '小标题二',
                url: 'two'
              },
              {
                id: 13,
                title: '小标题三',
                url: 'three'
              }
            ]
          },
          {
            id: 2,
            title: '大标题二',
            subnav: [
              {
                id: 21,
                title: '订单测试',
                url: 'ordertest'
              },
              {
                id: 22,
                title: '小标题二',
                url: 'two'
              },
              {
                id: 23,
                title: '小标题三',
                url: 'three'
              }
            ]
          },
          {
            id: 3,
            title: '大标题二',
            subnav: [
              {
                id: 31,
                title: '订单测试',
                url: 'ordertest'
              },
              {
                id: 32,
                title: '小标题二',
                url: 'two'
              },
              {
                id: 33,
                title: '小标题三',
                url: 'three'
              }
            ]
          },
          {
            id: 4,
            title: '大标题二',
            subnav: [
              {
                id: 41,
                title: '订单测试',
                url: 'ordertest'
              },
              {
                id: 42,
                title: '小标题二',
                url: 'two'
              },
              {
                id: 43,
                title: '小标题三',
                url: 'three'
              }
            ]
          }
        ]
      }
    },
    methods: {
      dropdwon (id) {
        let sub = document.getElementById(id)
        if (sub.style.display === 'block') {
          sub.style.display = 'none'
        } else {
          sub.style.display = 'block'
        }
      },
      getId (id) {
        this.nowid = id
      },
      goto (param) {
        this.$router.push('/home/' + param)
      }
    }
  }
</script>

<style scoped>
  nav {
    position: absolute;
    top: 80px;
    bottom: 0;
    left: 0;
    width: 200px;
    background-color: #454A5D;
  }
  li {
    display: block;
    padding: 10px 0;
    width: 200px;
    cursor: pointer;
  }
  .firstli {
    margin-top: 10px;
  }
  .first-a {
    border-bottom: 1px solid #303340;
    /*border-bottom: 1px solid #ccc;*/
  }
  .nav-first a {
    padding: 10px 75px 10px 50px;
  }
  .nav-first li {
    font-size: 18px;
    color: #eb8f00;
  }
  .nav-first > li {
    padding: 10px 0 0 0;
  }
  .nav-second {
    display: none;
    background-color: #303340;
    margin-top: 10px;
    margin-bottom: -10px;
  }
  .nav-second li {
    font-size: 14px;
    color: #fff;
  }
  .nav-second li:hover {
    background-color: rgb(241, 108, 109);
  }
  .collapse-enter-active,
  .collapse-leave-active {
    transition: all 0.5s linear;
    height: 100%;
    height: auto;
    overflow: hidden;
  }
  .collapse-enter,
  .collapse-leave-to {
    overflow: hidden;
    padding-top: 0;
    padding-bottom: 0;
    height: 0;
    opacity: 0;
  }
  .pinkbg {
    background-color: rgb(241, 108, 109);
  }
  .open {
    display: block;
  }

</style>
