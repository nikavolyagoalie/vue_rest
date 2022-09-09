import { createRouter, createWebHistory } from 'vue-router'
import CreateUser from '@/views/CreateUser.vue'
import UpdateUser from '@/views/UpdateUser.vue'

const routes = [
  {
    path: '/',
    name: 'CreateUser',
    component: CreateUser,
    meta: {
      created: true
    },
  },
  {
    path: '/update',
    name: 'UpdateUser',
    component: UpdateUser,
    meta: {
      toCreate: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let createUser = localStorage.getItem('usersList')
  let reqToCreate = to.matched.some(record => record.meta.toCreate)

  if (!createUser && reqToCreate) {
    next('/')
  } else {
    next()
  }
}) 

router.beforeEach((to, from, next) => {
  let createUser = localStorage.getItem('usersList')
  let reqCreated = to.matched.some(record => record.meta.created)

  if (createUser && reqCreated) {
    next('/update')
  } else {
    next()
  }
}) 

export default router
