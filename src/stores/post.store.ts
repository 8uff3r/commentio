import { PostsResponse } from '@/types/pocketbase-types'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
  const posts = ref<PostsResponse[]>([])
  const getPosts = async (url: string) => {
    const res = await pb.collection('posts').getList(1, 20, {
      filter: pb.filter('url = {:url}', { url }),
    })
    posts.value = res.items
  }
  const userUpVotes = useStorage('userUpVotes', new Set<string>([]))
  const userDownVotes = useStorage('userDownVotes', new Set<string>([]))
  const add = async (url: string, comment: string) => {
    if (!pb.authStore.isValid || !pb.authStore.model?.id) return
    await pb.collection('posts').create({
      url,
      comment,
      commenter: pb.authStore.model.id,
    })
    getPosts(url)
  }
  const upvote = (id: string) => {
    const userId = pb.authStore.model?.id
    if (!userId) return
    userDownVotes.value.delete(id)
    userUpVotes.value.add(id).add(id)
    pb.collection('posts').update(id, {
      'upvotes+': userId,
    })
  }
  const downvote = (id: string) => {
    const userId = pb.authStore.model?.id
    if (!userId) return
    userUpVotes.value.delete(id)
    userDownVotes.value
    pb.collection('posts').update(id, {
      'downvotes+': userId,
    })
  }
  return { downvote, upvote, add, getPosts, posts, userDownVotes, userUpVotes }
})
