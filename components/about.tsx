export function About() {
  return (
    <section className="py-20 bg-background african-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            L'Excellence de l'Hospitalité Africaine
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
            Situé en périphérie de Paris, Bellaluna incarne le parfait équilibre entre le luxe moderne et
            l'authenticité africaine. Notre hôtel vous offre une expérience unique où le confort rencontre la culture,
            et où chaque détail est pensé pour votre bien-être.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Chambres de luxe</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">4.9</div>
              <p className="text-muted-foreground">Note moyenne</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Service client</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
