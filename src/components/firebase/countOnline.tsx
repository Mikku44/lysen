'use client'
import { database } from '@/config/firebase/config'
import { ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'

export default function CountOnline () {
  const [OnlineCount, setOnlineCount] = useState(0)


  useEffect(() => {
    const usersRef = ref(database, 'onlineUsers')
    const unsubscribe = onValue(usersRef, snapshot => {
      const data = snapshot.val()
      const onlineCount = data ? Object.keys(data).length : 0
      //   console.log('Online users:', onlineCount)
      setOnlineCount(onlineCount)
    })

    return () => unsubscribe()
  }, [])

  return <>{OnlineCount}</>
}
