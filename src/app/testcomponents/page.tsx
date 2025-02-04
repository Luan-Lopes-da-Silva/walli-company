'use client'


export default function TestComponents(){
    function handleDownload(){
        window.open(`/api/generate-pdf?imobillevalue=60000000&financementvalue=50000000&parcels=420&amortization=SAC`, '_blank')
    }
    return(
        <button onClick={handleDownload}>Baixar PDF</button>
    )
}