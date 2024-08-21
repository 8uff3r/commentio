<script setup lang="ts">
enum Mode {
  REGISTER,
  LOGIN,
}

const store = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const submit = async () => {
  if (password.value.length < 8) {
    error.value = 'Password must have more than 8 characters'
    return
  }
  error.value = ''
  loading.value = true
  if (mode.value === Mode.REGISTER) {
    const res = await store.signup(email.value, password.value)
    if (res === true) {
      emit('signedUp')
    }
  } else {
    await store.signin(email.value, password.value)
    emit('signedIn')
  }
  loading.value = false
}
const emit = defineEmits(['signedIn', 'signedUp'])
const loading = ref(false)
const mode = ref(Mode.REGISTER)
const toggleMode = () => {
  mode.value === Mode.REGISTER
    ? (mode.value = Mode.LOGIN)
    : (mode.value = Mode.REGISTER)
  store.authError = ''
  error.value = ''
}
</script>

<template>
  <template v-if="!loading">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          {{ mode === Mode.REGISTER ? 'Sign up' : 'Login' }}
        </CardTitle>
        <CardDescription>
          Enter your Username and password below to
          {{
            mode === Mode.REGISTER
              ? 'register a new account'
              : 'login to your account'
          }}.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input
            id="username"
            type="username"
            v-model="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            v-model="password"
            id="password"
            type="password"
            required
          />
          <div
            v-if="error.length > 0"
            class="bg-red-500 px-4 py-1 text-red-50 border border-red-300 rounded text-sm text-center"
          >
            {{ error }}
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex flex-col">
        <Button
          class="w-full"
          @click="submit"
        >
          {{ mode === Mode.REGISTER ? 'Sign up' : 'Log in' }}
        </Button>
        <Button
          variant="link"
          @click="toggleMode()"
        >
          {{
            mode === Mode.REGISTER
              ? 'Already have an account?'
              : "Don't have an account?"
          }}
        </Button>
        <div
          v-if="store.authError.length > 0"
          class="bg-red-500 px-4 py-1 text-red-50 border border-red-300 rounded text-sm text-center"
        >
          {{ store.authError }}
        </div>
      </CardFooter>
    </Card>
  </template>
  <template v-else>
    <div class="w-full h-full flex justify-center items-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  </template>
</template>
