import { useEffect } from 'react'
import {
  ref,
  onDisconnect,
  set,
  serverTimestamp
} from 'firebase/database'
import { database } from '@/config/firebase/config'

export default function useOnlinePresence(userId: string) {
  useEffect(() => {
    if (!userId) return

    const userStatusRef = ref(database, `onlineUsers/${userId}`)

   
    set(userStatusRef, {
      online: true,
      lastActive: serverTimestamp()
    })

   
    onDisconnect(userStatusRef).remove()

    return () => {
      set(userStatusRef, {
        online: false,
        lastActive: serverTimestamp()
      })
    }
  }, [userId])
}
