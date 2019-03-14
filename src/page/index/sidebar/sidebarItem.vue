<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in menu">
      <el-menu-item v-if="validatenull(item.children)"
                    :index="filterPath(item.href,index)"
                    @click="open(item)"
                    :key="item.label">
        <i :class="item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-else
                  :index="filterPath(item.label,index)"
                  :key="item.label">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title"
                :class="{'el-menu--display':isCollapse}">{{item.label}}</span>
        </template>
        <template v-for="(child,cindex) in item.children">
          <el-menu-item :class="{'siderbar-active':nowTagValue==child.href}"
                        :index="filterPath(child.href,cindex)"
                        @click="open(child)"
                        v-if="validatenull(child.children)"
                        :key="child.label">
            <i :class="child.icon"></i>
            <span slot="title">{{child.label}}</span>
          </el-menu-item>
          <sidebar-item v-else
                        :menu="[child]"
                        :key="cindex"
                        :isCollapse="isCollapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath, setUrlPath } from '@/util/util'
import { validatenull } from '@/util/validate';
export default {
  name: 'SidebarItem',
  data () {
    return {}
  },
  props: {
    menu: {
      type: Array
    },
    isCollapse: {
      type: Boolean
    }
  },
  created () { },
  mounted () { },
  computed: {
    nowTagValue: function () {
      return setUrlPath(this.$route)
    }
  },
  methods: {
    validatenull (val) {
      return validatenull(val);
    },
    filterPath (path, index) {
      return path == null ? index + '' : path
    },
    open (item) {

      this.$router.push({
        path: resolveUrlPath(item.href, item.label),
        query: item.query
      })
    }
  }
}
</script>
<style lang="scss" scoped>
//刷新激活状态
.siderbar-active {
  i,
  span {
    color: #409eff;
  }
}
</style>

