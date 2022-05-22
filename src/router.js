import Vue from 'vue' // Include Vue
import Router from 'vue-router' // Include Vue Router libary
import EventCreate from '@/views/EventCreate'
import EventList from '@/views/EventList'
import EventShow from '@/views/EventShow'
import UserPage from '@/views/UserPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate,
    },
    {
      path: '/user/:username',
      name: 'user',
      component: UserPage,
      props: true,
    },
  ],
})
