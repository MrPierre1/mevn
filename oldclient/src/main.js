// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)




// import {
//   Vuetify,
//   VApp,
//   VNavigationDrawer,
//   VFooter,
//   VList,
//   VBtn,
//   VIcon,
//   VGrid,
//   VToolbar,
//   VCard,
//   VTextField,
//   VForm,
//   VDataTable,
//   VDivider,
//   VDialog,
//   transitions
// } from 'vuetify'
// import '../node_modules/vuetify/src/stylus/app.styl'

// Vue.use(Vuetify, {
//   components: {
//     VApp,
//     VNavigationDrawer,
//     VFooter,
//     VList,
//     VBtn,
//     VIcon,
//     VGrid,
//     VToolbar,
//     VCard,
//     VTextField,
//     VForm,
//     VDataTable, 
//     VDivider,
//     VDialog,
//     transitions
//   }
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
