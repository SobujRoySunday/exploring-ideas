import { convertDateTime } from '@/helpers/convertDateTime'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import React from 'react'
import Logout from '@/components/Logout'
import Live from '@/components/Live'
import CreateChapter from '@/components/CreateChapter'
import Home from '@/components/buttons/Home'

const Modules = async ({ params }: {
  params: { moduleToken: string }
}) => {
  const fetchChapterData = async () => {
    "use server"
    const response = await prisma.chapters.findMany({
      where: {
        moduleId: params.moduleToken
      }
    })
    return response
  }

  const datas = await fetchChapterData()

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-zinc-900 text-zinc-300'>
      <div className="overflow-x-auto h-[75vh]">
        <table className="table w-[60vw]">
          <thead>
            <tr className='bg-secondary text-white'>
              <th>Chapter Name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {datas ?
              datas.map((data) => {
                return (
                  <tr key={data.id}>
                    <td><Link href={`/educator/videos/${data.id}`}>{data.chapterName}</Link></td>
                    <td>{convertDateTime(data.isCreatedAt.toString())}</td>
                  </tr>
                )
              })
              :
              <p>No data available</p>}
          </tbody>
        </table>
      </div>
      <div className='absolute bottom-8 flex gap-2'>
        <Home />
        <CreateChapter moduleId={params.moduleToken} />
        <Live />
        <Logout />
      </div>
    </div>
  )
}

export default Modules