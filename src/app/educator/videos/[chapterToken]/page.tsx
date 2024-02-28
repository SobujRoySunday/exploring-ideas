import { convertDateTime } from "@/helpers/convertDateTime"
import { prisma } from "@/lib/db/prisma"
import Link from "next/link"
import Home from "@/components/buttons/Home"
import Live from "@/components/Live"
import Logout from "@/components/Logout"
import CreateVideo from "@/components/buttons/CreateVideo"

const Videos = async ({ params }: {
  params: { chapterToken: string }
}) => {
  const fetchVideoDatas = async () => {
    "use server"
    const response = await prisma.videos.findMany({
      where: {
        chapterId: params.chapterToken
      }
    })
    return response
  }

  const datas = await fetchVideoDatas()

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-900 text-zinc-300">
      <div className="overflow-x-auto h-[75vh]">
        <table className="table w-[60vw]">
          <thead>
            <tr className='bg-secondary text-white'>
              <th>Video Name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {datas ?
              datas.map((data) => {
                return (
                  <tr key={data.id}>
                    <td><Link href={`/educator/video/${data.id}`}>{data.videoName}</Link></td>
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
        <CreateVideo chapterId={params.chapterToken} />
        <Live />
        <Logout />
      </div>
    </div>
  )
}

export default Videos