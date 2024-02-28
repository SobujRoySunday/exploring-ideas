import { convertDateTime } from '@/helpers/convertDateTime'
import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import Logout from '@/components/Logout'
import Live from '@/components/Live'
import CreateModule from '@/components/CreateModule'

const Educator = async () => {
  const fetchModuleData = async () => {
    "use server"
    const response = await prisma.modules.findMany();
    return response;
  }

  const datas = await fetchModuleData()

  return (
    <div className='flex flex-col justify-center items-center gap-10 py-10 bg-zinc-950 h-screen text-zinc-300'>
      <div className="overflow-x-auto overflow-y-auto h-[75vh]">
        <table className="table w-[60vw]">
          <thead>
            <tr className='bg-secondary text-white'>
              <th>Module Name</th>
              <th>Author</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {datas ?
              datas.map((data) => {
                return (
                  <tr key={data.id}>
                    <td><Link href={`/educator/chapters/${data.id}`}>{data.moduleName}</Link></td>
                    <td>Sorbopriyo Roy</td>
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
        <CreateModule />
        <Live />
        <Logout />
      </div>
    </div>
  )
}

export default Educator