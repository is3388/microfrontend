import { createApp } from 'vue'
import Dashboard from './components/Dashboard.vue'

// use mount function to create a vue app and show it in html element el
const mount = (el) => {
  const app = createApp(Dashboard)
  app.mount(el) // this mount fn is tied to vue to tell vue to show a component inside the dom   

  }


// if our app is running in dev mode (see webpack config mode property and find html element with that id)
// use Browser history in standalone in DEV
if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_dashboard-dev-root')
  if (el) {
    mount(el) // immediately process and execute it in the browser 
  }
}

export { mount }
