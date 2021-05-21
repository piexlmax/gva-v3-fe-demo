import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { user } from "@/store/module/user"
import { State } from '@/store/types'
export const key: InjectionKey<Store<State>> = Symbol()

// Create a new store instance.
const store = createStore({
    modules: {
        user
    }
})

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}

export default store
