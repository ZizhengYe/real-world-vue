import EventService from '@/services/EventService.js'

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTSTOTAL(state, total) {
    state.eventsTotal = total
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + e.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw e
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((res) => {
        console.log('Total events are ' + res.headers['x-total-count'])
        commit('SET_EVENTS', res.data)
        commit('SET_EVENTSTOTAL', res.headers['x-total-count'])
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + e.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then((res) => {
          commit('SET_EVENT', res.data)
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + e.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
}
export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
  doneTodos: (state) => {
    return state.todos.filter((todo) => todo.done)
  },
  activeTodosCount: (state, getters) => {
    return state.todos.length - getters.doneTodos.length
  },
}
