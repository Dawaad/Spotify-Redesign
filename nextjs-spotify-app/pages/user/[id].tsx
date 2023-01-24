import React from 'react'
import { useRouter } from 'next/router'
function User() {
    const router = useRouter()
    const {id}  = router.query;
  return (
    <div>{id}</div>
  )
}

export default User