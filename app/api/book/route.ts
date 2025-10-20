// pages/api/upload.js
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import JSZip from 'jszip';

// Désactiver le parsing automatique de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const attachments = formData.get("files")

  const room = formData.get("room")
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const checkIn = formData.get("checkIn")
  const checkOut = formData.get("checkOut")
  const paymentMethod = formData.get("paymentMethod")
  const total = formData.get("total")
  const guests = formData.get("guests")
  const paypalEmail = formData.get("paypalEmail")

  // Add reservation to txt file
  const reservation = `
  Room: ${room}
  First Name: ${firstName}
  Last Name: ${lastName}
  Email: ${email}
  PayPal Email: ${paypalEmail}
  Guests: ${guests}
  Check In: ${checkIn}
  Check Out: ${checkOut}
  Payment Method: ${paymentMethod}
  Total: ${total}
  `
  fs.appendFileSync("reservations.txt", reservation + "\n")

  try {
    const zip = new JSZip();
    zip.file(`reservation-${new Date().toISOString()}.txt`, reservation);

    // Ajouter fichiers images
    if (attachments) {
      const images = Array.isArray(attachments) ? attachments : [attachments];
      for (const img of images) {
        // create temp file
        // const tempFile = path.join('/tmp', img.name);
        // fs.writeFileSync(tempFile, img);
        // const data = fs.readFileSync(tempFile);
        const arrayBuffer = await img.arrayBuffer();
				const data = new Uint8Array(arrayBuffer);
				
        zip.file(img.name, data);
        // tempFiles.push(tempFile);
      }
    }

    // Générer zip en mémoire
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Sauvegarder temporairement pour transfer.sh
    const tmpZipPath = path.join('/tmp', 'archive.zip');
    fs.writeFileSync(tmpZipPath, zipBuffer);

    // Préparer FormData pour upload
    const formData = new FormData();
    formData.append('file', fs.createReadStream(tmpZipPath));

    const response = await fetch(process.env.UPLOAD_URL!, {
      method: 'POST',
      body: formData,
    });

    const url = await response.text();
    console.log("url ", url)

    // Supprimer le fichier temporaire
    fs.unlinkSync(tmpZipPath);
    return new Response(JSON.stringify({ status: "success" }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
