import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'

export async function POST(req: NextRequest) {
    console.log(req.body)
    const formData = await req.formData();
    console.log(formData)

    const roomType = formData.get('room')
    const checkInDate = formData.get('checkInDate')
    const checkOutDate = formData.get('checkOutDate')
    const numberOfGuests = formData.get('numberOfGuests')
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phoneNumber = formData.get('phoneNumber')
    const address = formData.get('address')
    const city = formData.get('city')
    const zipCode = formData.get('zipCode')
    const country = formData.get('country')
    const paymentMethod = formData.get('paymentMethod')
    const paypalScreen = formData.get('paypalScreen')

    // Write thos informations in a json file 
    const data = {
        roomType,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        city,
        zipCode,
        country,
        paymentMethod,
        paypalScreen
    }
    
    const filename = `public/${Date.now()}.json`
    fs.writeFileSync(filename, JSON.stringify(data))

    return NextResponse.json({ message: 'Données reçues avec succès' });
}