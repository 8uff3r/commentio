<script setup lang="ts">
const store = useAuthStore()
</script>
<template>
  <template v-if="store.isAuthed">
    <img
      src="/logo.png"
      class="object-cover h-10 p-1 mx-auto select-none"
    />
    <RouterView />
  </template>
  <template v-else>
    <div
      class="p-2 flex flex-col justify-center h-[100svh] w-full items-center gap-3"
    >
      <img
        src="/logo.png"
        class="object-cover w-full max-w-52 p-1 mx-auto select-none"
      />
      <Auth />
    </div>
  </template>
</template>
