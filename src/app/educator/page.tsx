import { convertDateTime } from '@/helpers/convertDateTime'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'

const Educator = async () => {
  const fetchModuleData = async () => {
    "use server"
    const response = await prisma.modules.findMany();
    return response;
  }

  const datas = await fetchModuleData()

  return (
    <div className='flex flex-col justify-center items-center gap-10 my-10'>
      <div>
        <Link className="btn btn-error" href='/educator/golive'>Go Live</Link>
      </div>
      <div className="overflow-x-auto overflow-y-auto h-[51.5vh]">
        <table className="table table-zebra w-[60vw]">
          <thead>
            <tr className='bg-secondary text-white'>
              <th>Module Name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {datas ?
              datas.map((data) => {
                return (
                  <tr key={data.id}>
                    <td><Link href={`/educator/chapters/${data.id}`}>{data.moduleName}</Link></td>
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

export default Educator