import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { user } from "@/store/module/user"
import { router } from "@/store/module/router"
import { dictionary } from "@/store/module/dictionary"
import { State } from '@/types/store'
export const key: InjectionKey<Store<State>> = Symbol()

// Create a new store instance.
const store = createStore({
    modules: {
        user,
        router,
        dictionary
    }
})

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}

export default store
