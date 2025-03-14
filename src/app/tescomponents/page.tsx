'use client'

export default function TestPage(){
    const sendDataToBackend = async () => {
        window.open(`/api/generate-pdf?imobillevalue=${500000}&financementvalue=${400000}&parcels=${20}&amortization=${'SAC'}`, '_blank')
    }
    return(
        <>
        <button onClick={sendDataToBackend}>Baixar pdf</button>
        </>
    )
}