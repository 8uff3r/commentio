import { TypedPocketBase } from '@/types/pocketbase-types'
import PocketBase, { ClientResponseError } from 'pocketbase'
import Browser from 'webextension-polyfill'
const pb = new PocketBase(
  'https://commentio-5z1apftycw.liara.run'
) as TypedPocketBase
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
export { pb }

export async function getActiveTab() {
  const activeTab = (
    await Browser.tabs.query({
      currentWindow: true,
      active: true,
    })
  )?.at(0)
  return activeTab
}

export const isFirefox = navigator.userAgent.includes('Firefox')
// Function to check if the current browser is Chrome / Chromium
export function isChrome() {
  return typeof chrome !== 'undefined'
}
