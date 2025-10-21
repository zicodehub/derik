"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BanknoteIcon, CalendarIcon, CreditCard, Loader, Smartphone, Wallet } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

const rooms = [
  { id: "1", name: "Suite Mansa", price: 300 },
  // { id: "2", name: "Chambre Deluxe", price: 75000 },
  // { id: "3", name: "Suite Présidentielle", price: 150000 },
]

const paymentMethods = [
  { id: "mobile-money", name: "Mobile Money", icon: Smartphone, isActive: false },
  { id: "paypal", name: "PayPal", icon: Wallet, isActive: true },
  { id: "card", name: "Carte Bancaire", icon: CreditCard, isActive: false },
  { id: "bank", name: "Virement bancaire", icon: BanknoteIcon, isActive: true },
]
const totalSteps = 3

export function ReservationForm() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [selectedRoom, setSelectedRoom] = useState("1")
  const [guests, setGuests] = useState("1")
  const [paymentMethod, setPaymentMethod] = useState()
  const [step, setStep] = useState(1)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const [paypalScreen, setPaypalScreen] = useState<File | null>(null)
  const [paypalEmail, setPaypalEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !selectedRoom) return 0
    const room = rooms.find((r) => r.id === selectedRoom)
    if (!room) return 0
    let nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    nights = Math.max(3, nights)
    return room.price * nights
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (step === 1) {
      setStep(2)
    } else {
      // Process payment
      alert("Réservation confirmée ! Vous recevrez un email de confirmation.")
    }
    e.preventDefault()
  }

  useEffect(() => {
    if (checkIn && checkOut && checkOut < checkIn) {
      setCheckOut(new Date(checkIn.getTime() + 1000 * 60 * 60 * 24) )
    }
  }, [checkIn, checkOut])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if(!firstName || !email){
        alert("Veuillez remplir tous les champs")
        return
      }
      setStep(2)
    } else if(step === 2) {
      if(!paypalScreen){
        alert("Veuillez ajouter la capture d'écran de votre transaction")
        return
      }
      // Process payment
      setIsSubmiting(true)
      
      try {
        const payload = {
          room: selectedRoom,
          firstName,
          lastName,
          email,
          paypalEmail,
          guests,
          checkIn,
          checkOut,
          paymentMethod,
          total: calculateTotal(),
        }
        const formData = new FormData()
        for (const [key, value] of Object.entries(payload)) {
          formData.append(key, value)
        }
        formData.append("files", paypalScreen!)
        
        const response = await fetch("/api/book", {
          method: "POST",
          body: formData,
        })
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.log(error)
        setIsSubmiting(false)
      } finally {
        setIsSubmiting(false)
      }
      setStep(3)
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Réservez votre séjour</h1>
        <p className="text-lg text-muted-foreground">Complétez le formulaire pour réserver votre chambre</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{step === 1 ? "Détails de la réservation" : "Paiement"}</CardTitle>
          <CardDescription>Étape {step} sur {totalSteps}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Room Selection */}
                <div className="space-y-2">
                  <Label htmlFor="room">Type de chambre</Label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom} required>
                    <SelectTrigger id="room">
                      <SelectValue placeholder="Sélectionnez une chambre" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - {room.price.toLocaleString()} €/nuit
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date d'arrivée *</Label>
                    <Input 
                      type="date" 
                      required
                      value={checkIn ? format(checkIn, "yyyy-MM-dd") : ""} onChange={(e) => setCheckIn(new Date(e.target.value))} 
                      min={(new Date(Date.now() + 24 * 60 * 60 * 1000)).toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date de départ *</Label>
                    <Input 
                      type="date" 
                      required
                      value={checkOut ? format(checkOut, "yyyy-MM-dd") : ""} onChange={(e) => setCheckOut(new Date(e.target.value))} 
                      min={checkIn ? format(checkIn.getTime() + 24 * 60 * 60 * 1000, "yyyy-MM-dd") : ""}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests">Nombre de personnes</Label>
                  <Select value={guests} onValueChange={setGuests} required>
                    <SelectTrigger id="guests">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "personne" : "personnes"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" aria-required>Prénom*</Label>
                    <Input id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* Total */}
                {checkIn && checkOut && selectedRoom && (
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-2xl text-primary">{calculateTotal().toLocaleString()} €</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nuit(s)
                    </p>
                  </div>
                )}
              </>
            ) : step === 2 ? (
              <>
                {/* Summary */}
                <div className="bg-muted p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold text-lg">Récapitulatif</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chambre</span>
                      <span>{rooms.find((r) => r.id === selectedRoom)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Arrivée</span>
                      <span>{checkIn && format(checkIn, "PPP", { locale: fr })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Départ</span>
                      <span>{checkOut && format(checkOut, "PPP", { locale: fr })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Personnes</span>
                      <span>{guests}</span>
                    </div>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total à payer</span>
                      <span className="text-2xl font-bold text-primary">{calculateTotal().toLocaleString()} €</span>
                    </div>
                  </div>
                </div>


                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label>Méthode de paiement</Label>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => method.isActive && setPaymentMethod(method.id)}
                          className={cn(
                            "flex items-center gap-4 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer",
                            paymentMethod === method.id && "border-primary bg-primary/5",
                          )}
                        >
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-full flex items-center justify-center",
                                  paymentMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <Icon className="w-6 h-6" />
                              </div>
                              <span className="font-medium">{method.name}</span>
                            </div>

                            {
                              !method.isActive &&  
                                <span className="text-sm text-red-500">Temporairement indisponible</span>
                            }
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Payment Details */}
                {paymentMethod === "mobile-money" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="operator">Opérateur</Label>
                      <Select required>
                        <SelectTrigger id="operator">
                          <SelectValue placeholder="Sélectionnez votre opérateur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="orange">Orange Money</SelectItem>
                          <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                          <SelectItem value="moov">Moov Money</SelectItem>
                          <SelectItem value="wave">Wave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber">Numéro de téléphone</Label>
                      <Input id="mobileNumber" type="tel" placeholder="+225 XX XX XX XX XX" required />
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input id="expiry" placeholder="MM/AA" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="space-y-4 border-t pt-6">
                    

                    <div className="bg-slate-200 p-4 rounded-lg space-y-4 font-light" >
                      <p>Comment procéder ?</p>
                      <ol className="list-decimal p-4 space-y-2" >
                        <li>
                          Effectuez un transfert sur le compte Paypal suivant : 
                          <ul className="list-disc pl-4 my-2" >
                            <li className="font-light" >MME LOISEL MICHELE</li>
                            <li className="font-bold" >Michele.loisel1957@gmail.com</li>
                          </ul>
                        </li>
                        <li>Faites une capture d'écran de votre transaction.</li>
                        <li>Envoyez</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">Email PayPal</Label>
                      <Input id="paypalEmail" type="email" placeholder="votre@email.com" required
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypalScreen">Capture d'écran</Label>
                      <Input id="paypalScreen" type="file" required placeholder="Selectionnez une capture d'écran" accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          setPaypalScreen(file)
                        }} 
                      />
                    </div>
                    {/* Display preview */}
                    {
                      paypalScreen && (
                        <div className="mt-4">
                          <p>Preview:</p>
                          <img src={URL.createObjectURL(paypalScreen)} className="mt-2 w-64 h-64 object-cover rounded-lg" />
                        </div>
                      )
                    }
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="space-y-4 border-t pt-6">
                    

                    <div className="bg-slate-200 p-4 rounded-lg space-y-4 font-light" >
                      <div className="flex flex-col gap-1">
                        <p>IBAN - Identifiant International de compte</p>
                        <p className="font-bold">FR45 2004 1010 1620 3557 9C03 736</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p>BIC - Identifiant Bancaire Central</p>
                        <p className="font-bold">BNPFPARIBA</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p>DOMICILIATION</p>
                        <p className="font-bold">LA BANQUE POSTALE • CENTRE FINANCIEr 33900 BORDEAUX CEDEX •</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p>TITULAIRE DU COMPTE</p>
                        <p className="font-bold">MME lOISEL MICHELE</p>
                      </div>
                    </div>


                    <p className="font-light text-orange-500" >Une fois votre paiement effectué, veuillez nous envoyer une capture d'écran de votre transaction.</p>
                    <div className="space-y-2">
                      <Label htmlFor="paypalScreen">Capture d'écran</Label>
                      <Input id="paypalScreen" type="file" required placeholder="Selectionnez une capture d'écran" accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          setPaypalScreen(file)
                        }} 
                      />
                    </div>
                    {/* Display preview */}
                    {
                      paypalScreen && (
                        <div className="mt-4">
                          <p>Preview:</p>
                          <img src={URL.createObjectURL(paypalScreen)} className="mt-2 w-64 h-64 object-cover rounded-lg" />
                        </div>
                      )
                    }
                  </div>
                )}

              </>
            ) : step === 3 ? (
              <>
                {/* Message réservation confirmée */}
                <p className="text-center text-2xl font-bold text-green-600 bg-green-100 p-4 rounded-lg">Réservation reçue !</p>
                <p className="text-center text-muted-foreground">Un email de confirmation vous sera envoyé.</p>
              </>
            ) : (
              <>
              </>
            )}

            {/* ErrorsMessages */}
            <div>
              <ul className="list-disc pl-4 text-sm">
                {
                  !checkIn && <li className="font-light text-red-500">Veuillez sélectionner une date d'arrivée</li>
                }
                {
                  !checkOut && <li className="font-light text-red-500">Veuillez sélectionner une date de départ</li>
                }
                {
                  !selectedRoom && <li className="font-light text-red-500">Veuillez sélectionner une chambre</li>
                }
              </ul>
            </div>
            {/* Actions */}
            <div className="flex gap-4">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => step > 1 && setStep(prev => prev - 1)} className="flex-1">
                  Retour
                </Button>
              )}
              {
                step !== totalSteps && (
                  <Button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={step === 1 ? !checkIn || !checkOut || !selectedRoom : !paymentMethod}
                    onClick={onSubmit}
                  >
                    {isSubmiting ? <Loader className="animate-spin" /> : step === 1 ? "Continuer" : "Confirmer ma réservartion"}
                  </Button>
                )
              }
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
