import Image from "next/image";
import Hero from './assets/hero.jpg'
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center h-screen bg-zinc-950 text-zinc-300">
        <div className="flex flex-row gap-20 items-center max-w-[70vw]">
          <Image src={Hero} alt="Exploring ideas" width={1280} height={720} className="max-w-[36rem] rounded-lg opacity-60" />
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold">Welcome to Sharing ideas!</h1>
            <h2 className="text-xl">Explore and share ideas, and help to bring the ideas to reality. Learn new technologies and build awesome project with teams.</h2>
            <div className="flex flex-row gap-5">
              <Link href="/signin" className="btn btn-primary hover:btn">Login</Link>
              <Link href="/signup" className="btn hover:btn-ghost">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
