import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/luxury-hotel-resort-in-abidjan-with-palm-trees-and.jpg" alt="Bellaluna Hotel" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">Bienvenue à Bellaluna Hotel</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty">
            Découvrez l'hospitalité africaine dans un cadre luxueux au cœur de Paris
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/reservation">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                Réserver maintenant
              </Button>
            </a>

            <Link href="#chambres">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white hover:bg-white/20 text-lg px-8"
              >
                Découvrir nos chambres
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
