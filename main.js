import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$eventHub = new Vue();
// this.$eventHub.$emit('goBlack',true);
// this.$eventHub.$on('goBlack', (data) => {})

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
