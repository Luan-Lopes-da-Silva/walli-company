/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'


export default function TestComponents(){
    function handleDownload(){
        window.open(`/api/generate-pdf?imobillevalue=500000&financementvalue=420000&parcels=420`, '_blank')
    }
    return(
        <button onClick={handleDownload}>Baixar PDF</button>
    )
}