import { ReservationForm } from "@/components/reservation-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ReservationPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <ReservationForm />
      </div>
      <Footer />
    </main>
  )
}
