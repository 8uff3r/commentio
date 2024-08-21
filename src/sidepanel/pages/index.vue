<script setup lang="ts">
import Browser from 'webextension-polyfill'

function openOptionsPage() {
  Browser.runtime.openOptionsPage()
}

const store = useAuthStore()
const postStore = usePostStore()
onMounted(async () => {
  const activeTab = await getActiveTab()
  if (activeTab?.url) postStore.getPosts(activeTab.url)
})
const comment = ref('')
const add = async () => {
  const activeTab = await getActiveTab()
  if (!activeTab?.url || comment.value.length < 10) return
  postStore.add(activeTab?.url, comment.value)
}
</script>

<template>
  <Button
    @click="store.logout()"
    class="m-2"
  >
    Logout
  </Button>
  <main class="w-full px-4 py-5 text-gray-700 flex flex-col gap-2">
    <Label
      for="cmnt"
      class="select-none"
    >
      Write your comment
    </Label>
    <Textarea
      name="cmnt"
      id="cmnt"
      v-model="comment"
      minlength="10"
      maxlength="600"
    />
    <Button @click="add()">Add comment</Button>

    <Label
      class="select-none"
      v-if="postStore.posts.length > 0"
    >
      Comments for this page from other users
    </Label>
    <Label
      class="select-none"
      v-else
    >
      You are the first one here, Add the first comment!
    </Label>
    <template
      v-for="(post, key) in postStore.posts"
      :key
    >
      <Comment
        v-bind="post"
        @upvote="(id: string) => postStore.upvote(id)"
        @downvote="(id: string) => postStore.downvote(id)"
      />
    </template>
  </main>
</template>
