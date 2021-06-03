import { UserState } from "@/types/store/module/user"
export const user = {
  state(): UserState {
    return {
      count: 0,
    }
  },
  mutations: {
    increment(state: UserState) {
      state.count++
    }
  },
  getters: {
    GetCount: (state: UserState): number => state.count
  }
}
