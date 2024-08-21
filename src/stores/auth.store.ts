import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const name = useStorage('name', '')

  // You should probably use chrome.storage API instead of localStorage since localStorage history can be cleared by the user.
  // See https://developer.chrome.com/docs/extensions/reference/api/storage
  const authError = ref('')
  const isAuthed = ref(pb.authStore.isValid)
  const userModel = ref(pb.authStore.model)
  pb.authStore.onChange((_, model) => {
    isAuthed.value = pb.authStore.isValid
    userModel.value = model
  })
  const signin = async (email: string, password: string) => {
    const res = await pb.collection('users').authWithPassword(email, password)
    name.value = res.record.name

    if (pb.authStore.isValid) return true
    return false
  }
  const signup = async (username: string, password: string) => {
    try {
      const res = await pb.collection('users').create({
        username,
        password,
        passwordConfirm: password,
      })
      name.value = res.username

      return true
    } catch (err) {
      const userNameErr = (err as any)?.response?.data?.username?.message
      const passErr = (err as any)?.response?.data?.password?.message
      if (userNameErr) {
        authError.value = userNameErr
      } else if (passErr) {
        authError.value = passErr
      }
      console.error((err as any).message)
    }
  }

  const logout = () => {
    pb.authStore.clear()
  }
  return {
    signin,
    signup,
    logout,
    authError,
    name,
    isAuthed,
    userModel,
  }
})
