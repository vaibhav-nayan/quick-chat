import DashNav from '@/components/dashboard/DashNav'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions, CustomnSession } from '../api/auth/[...nextauth]/options'

const dashboard = async () => {

    const session : CustomnSession|null = await getServerSession(authOptions)
  return (
    <div>
        <p>{JSON.stringify(session, null, 2)}</p>
        <DashNav name={session?.user?.name!} image={session?.user?.image ?? undefined}/>
    </div>
  )
}

export default dashboard