<script setup lang="ts">
import Browser from 'webextension-polyfill'

const version = __VERSION__
const displayName = __DISPLAY_NAME__
const gitURL = __GITHUB_URL__
const gitCommit = __GIT_COMMIT__
const gitCommitURL = `${gitURL}/commit/${gitCommit}`
</script>

<template>
  <div class="p-8 flex flex-col items-center gap-2">
    <img
      src="/logo.png"
      class="object-cover h-10 p-1 mx-auto select-none"
    />
    <Button
      class="p-4"
      @click="Browser.sidebarAction.open()"
    >
      Open via sidebar
    </Button>
  </div>
</template>
