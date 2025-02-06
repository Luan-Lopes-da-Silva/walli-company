'use client'
import { sendEmail } from "@/utils/sendEmail"


export default function TestComponents(){
    function handleDownload(){
        window.open(`/api/generate-pdf?imobillevalue=60000000&financementvalue=50000000&parcels=420&amortization=PRICE`, '_blank')
    }
    return(
        <>
            <button onClick={handleDownload}>Baixar PDF</button>
            <button onClick={sendEmail}>Enviar email</button>
        </>
        
    )
}