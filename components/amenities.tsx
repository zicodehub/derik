import { Utensils, Wifi, Car, Dumbbell, Waves, Sparkles } from "lucide-react"

const amenities = [
  {
    icon: Utensils,
    title: "Restaurant Gastronomique",
    description: "Savourez une cuisine africaine et internationale raffinée",
  },
  {
    icon: Waves,
    title: "Piscine à Débordement",
    description: "Détendez-vous dans notre magnifique piscine avec vue",
  },
  {
    icon: Dumbbell,
    title: "Centre de Fitness",
    description: "Équipements modernes disponibles 24h/24",
  },
  {
    icon: Wifi,
    title: "Wifi Haut Débit",
    description: "Connexion internet gratuite dans tout l'hôtel",
  },
  {
    icon: Car,
    title: "Parking Sécurisé",
    description: "Stationnement gratuit pour nos clients",
  },
  {
    icon: Sparkles,
    title: "Spa & Bien-être",
    description: "Massages et soins traditionnels africains",
  },
]

export function Amenities() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Nos Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Profitez d'une gamme complète de services pour rendre votre séjour inoubliable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{amenity.title}</h3>
                <p className="text-muted-foreground text-pretty">{amenity.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
