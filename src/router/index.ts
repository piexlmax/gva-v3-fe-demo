import { createRouter,createWebHistory} from "vue-router";
// 1. Define route components.
// These can be imported from other files

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.


const baseRoutes=[
  { path: 'layout',component:() => import("@/view/layout/layout.vue") },
]

const routes = [
  { path: '/',component:() => import("@/App.vue"),
    redirect: '/layout', 
    children: baseRoutes
  },
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})
 
export default router