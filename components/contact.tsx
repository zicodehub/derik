import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contactez-nous</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Adresse</h3>
                <p className="text-muted-foreground">
                  Boulevard de la République
                  <br />
                  Paris
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Téléphone</h3>
                <p className="text-muted-foreground">
                  +33 6 20 12 34 56
                  <br />
                  +33 6 08 09 10 11
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">
                  contact@bellalunahotels.com
                  <br />
                  reservation@bellalunahotels.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Input placeholder="Nom" className="bg-background" />
              </div>
              <div>
                <Input placeholder="Prénom" className="bg-background" />
              </div>
            </div>
            <div>
              <Input type="email" placeholder="Email" className="bg-background" />
            </div>
            <div>
              <Input type="tel" placeholder="Téléphone" className="bg-background" />
            </div>
            <div>
              <Textarea placeholder="Votre message" rows={5} className="bg-background" />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Envoyer le message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
