import { convertDateTime } from "@/helpers/convertDateTime"
import { prisma } from "@/lib/db/prisma"
import Link from "next/link"
import NewVideo from "./NewVideo"

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
    <div className="flex flex-col justify-center items-center w-full py-20 gap-5">
      <NewVideo chapterId={params.chapterToken} />
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
    </div>
  )
}

export default Videos