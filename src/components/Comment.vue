<script setup lang="ts">
import IcOutlineThumbUp from '~icons/ic/outline-thumb-up'
import IcOutlineThumbDown from '~icons/ic/outline-thumb-down'
import IcBaselineThumbUp from '~icons/ic/baseline-thumb-up'
import IcBaselineThumbDown from '~icons/ic/baseline-thumb-down'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { PostsResponse } from '@/types/pocketbase-types'

defineProps<PostsResponse>()
const authStore = useAuthStore()
defineEmits(['upvote', 'downvote'])
const downVoted = ref(false)
const upVoted = ref(false)
</script>
<template>
  <Card class="px-0 py-0">
    <CardHeader class="px-2 py-2">
      <CardDescription>By: {{ commenter }}</CardDescription>
    </CardHeader>
    <CardContent>{{ comment }}</CardContent>
    <CardFooter>
      <div class="justify-end flex gap-2">
        <button
          class="px-2 py-2 h-fit min-h-fit btn btn-primary"
          :disabled="
            downvotes.includes(authStore.userModel?.id) || downVoted === true
          "
        >
          <IcBaselineThumbUp
            v-if="upvotes.includes(authStore.userModel?.id) || upVoted === true"
          />

          <IcOutlineThumbUp
            v-else
            @click="
              () => {
                upvotes.push(authStore.userModel?.id)
                upVoted = true
                $emit('upvote', id)
              }
            "
          />
        </button>
        <button
          class="px-2 py-2 h-fit min-h-fit btn btn-primary"
          :disabled="
            upvotes.includes(authStore.userModel?.id) || upVoted === true
          "
        >
          <IcBaselineThumbDown
            v-if="
              downvotes.includes(authStore.userModel?.id) || downVoted === true
            "
          />
          <IcOutlineThumbDown
            v-else
            @click="
              () => {
                downvotes.push(authStore.userModel?.id)
                downVoted = true
                $emit('downvote', id)
              }
            "
          />
        </button>
      </div>
    </CardFooter>
  </Card>
</template>
