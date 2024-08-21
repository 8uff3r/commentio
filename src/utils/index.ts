import { TypedPocketBase } from '@/types/pocketbase-types'
import PocketBase, { ClientResponseError } from 'pocketbase'
import Browser from 'webextension-polyfill'
const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase
pb.autoCancellation(false)
pb.afterSend = (response, data) => {
  if (response.status != 200) {
    response
      .json()
      .then((s) => {
        console.log(s)
        throw new ClientResponseError({
          url: response.url,
          status: response.status,
          response: s,
        })
      })
      .catch(() => 'Error parsing json')
  }

  return data
}

export async function getActiveTab() {
  const activeTab = (
    await Browser.tabs.query({
      currentWindow: true,
      active: true,
    })
  )?.at(0)
  return activeTab
}
export { pb }
