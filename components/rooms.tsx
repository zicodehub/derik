import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, Tv, Wind, Coffee, WavesIcon, ParkingCircle, MartiniIcon, ActivityIcon, BabyIcon, BriefcaseBusinessIcon, PresentationIcon, SquareStackIcon, HandPlatterIcon } from "lucide-react"
import Link from "next/link"

const rooms = [
  // {
  //   id: 1,
  //   name: "Chambre Standard",
  //   description: "Confort et élégance pour un séjour agréable",
  //   price: "45,000",
  //   image: "/modern-hotel-room-with-african-decor-and-city-view.jpg",
  //   amenities: ["Wifi", "TV", "Climatisation", "Petit-déjeuner"],
  // },
  // {
  //   id: 2,
  //   name: "Chambre Deluxe",
  //   description: "Espace généreux avec vue panoramique",
  //   price: "75,000",
  //   image: "/luxury-hotel-suite-with-african-art-and-ocean-view.jpg",
  //   amenities: ["Wifi", "TV", "Climatisation", "Petit-déjeuner"],
  // },
  {
    id: 3,
    name: "Suite Mansa",
    description: "Le summum du luxe et du raffinement",
    price: "300",
    image: "/presidential-suite-with-african-luxury-decor-and-b.jpg",
    amenities: ["Wifi", "TV", "Climatisation", "Petit-déjeuner"],
  },
]

export function Rooms() {
  return (
    <section id="chambres" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Nos Chambres</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choix unique ! Toutes nos suites conçues pour votre confort
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="pt-0 flex-grow max-md:w-full lg:min-w-[600px] overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{room.name}</CardTitle>
                <CardDescription className="text-base">{room.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary flex flex-row gap-2 items-center justify-between">
                  <div>
                    {room.price} <span className="text-lg text-muted-foreground">€/nuit</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">03 nuits minimum</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/reservation?room=${room.id}`} className="w-full">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Réserver cette chambre
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          <div className="flex-grow p-4 flex flex-col gap-4" >

            <h3 className="text-xl font-bold text-foreground">Comodités exclusives</h3>
            <div className="flex flex-wrap gap-5 mb-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <WavesIcon className="w-4 h-4" />
                <span>Jacuzzi</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MartiniIcon className="w-4 h-4" />
                <span>Mini-bar privé</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <HandPlatterIcon className="w-4 h-4" />
                <span>Room service 24h/24</span>
              </div>
            </div>
                
            
            
            <h3 className="text-xl font-bold text-foreground">Business</h3>
            <div className="flex flex-wrap gap-5 mb-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <SquareStackIcon className="w-4 h-4" />
                <span>Service secrétariat</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BriefcaseBusinessIcon className="w-4 h-4" />
                <span>Salle de réunion</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Wifi className="w-4 h-4" />
                <span>Wifi ultra haut débit</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <PresentationIcon className="w-4 h-4" />
                <span>Équipements vidéo/audio de pointe</span>
              </div>    
            </div>
                
            <h3 className="text-xl font-bold text-foreground">Autres</h3>
            <div className="flex flex-wrap gap-5 mb-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <ParkingCircle className="w-4 h-4" />
                <span>Parking surveillé</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BabyIcon className="w-4 h-4" />
                <span>Service pour bébés</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <ActivityIcon className="w-4 h-4" />
                <span>Salle de sport</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Tv className="w-4 h-4" />
                <span>TV</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Wind className="w-4 h-4" />
                <span>Climatisation</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Coffee className="w-4 h-4" />
                <span>Petit-déj</span>
              </div>    
            </div>
                

          </div>
        </div>
      </div>
    </section>
  )
}
