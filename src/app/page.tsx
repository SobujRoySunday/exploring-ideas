import Image from "next/image";
import Hero from './assets/hero.jpg'

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center py-64">
        <div className="flex flex-row gap-20 items-center max-w-[70vw]">
          <Image src={Hero} alt="Exploring ideas" width={1280} height={720} className="max-w-[36rem] rounded-lg" />
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold">Welcome to Exploring ideas!</h1>
            <h2 className="text-xl">Explore and share ideas, and help to bring the ideas to reality. Learn new technologies and build awesome project with teams.</h2>
          </div>
        </div>
      </div>
    </main>
  )
}
