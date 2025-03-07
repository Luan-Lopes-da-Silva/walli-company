'use client'

export default function TestComponents(){
    function testAmortizationSAC(){        
        window.open(`/api/generate-pdf?imobillevalue=${50000000}&financementvalue=${40000000}&parcels=${320}&amortization=${"PRICE"}`, '_blank')
    }

    async function sendEmail() {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL4}`
        try {
          const response = await fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: 'lopesluan431@gmail.com',
              name: 'Usuário Teste',
              subject: 'Bem-vindo!',
              templateHtml: `<h1>Olá, Usuário Teste!</h1><p>Seja bem-vindo à nossa plataforma.</p>`,
            }),
          });
      
          const data = await response.json();
          console.log('Resposta do servidor:', data);
        } catch (error) {
          console.error('Erro ao enviar e-mail:', error);
        }
      }
      
    return(
        <>
            <button onClick={testAmortizationSAC}>Baixar PDF</button>
            <button onClick={sendEmail}>Enviar email</button>
        </>
    )
}