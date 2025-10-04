import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bellaluna Hotels</h3>
            <p className="text-secondary-foreground/80 text-sm">
              L'excellence de l'hospitalité africaine au cœur de Paris
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <a href="/" className="hover:text-secondary-foreground transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#chambres" className="hover:text-secondary-foreground transition-colors">
                  Chambres
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-secondary-foreground transition-colors">
                  FAQ
                </a>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/80">
          <p>&copy; 2025 Bellaluna Hotels. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
