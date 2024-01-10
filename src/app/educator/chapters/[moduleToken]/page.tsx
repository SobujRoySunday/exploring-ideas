import { convertDateTime } from '@/helpers/convertDateTime'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import React from 'react'
import NewChapter from './NewChapter'

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
    <div className='flex flex-col justify-center items-center w-full py-20 gap-10'>
      <NewChapter moduleId={params.moduleToken} />
      <div className="overflow-x-auto h-[52.3vh]">
        <table className="table table-zebra w-[60vw]">
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
    </div>
  )
}

export default Modules