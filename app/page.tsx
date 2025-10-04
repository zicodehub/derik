import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Rooms } from "@/components/rooms"
import { Amenities } from "@/components/amenities"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Contact />
      <Footer />
    </main>
  )
}
