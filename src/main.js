import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vue3GoogleLogin, {
  clientId: '352166520225-70v3dfdk4nduvsv7j5eljqcm7a3pua5t.apps.googleusercontent.com'
})

app.mount('#app')
