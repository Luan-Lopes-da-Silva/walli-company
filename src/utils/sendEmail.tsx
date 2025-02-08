export async function sendEmail() {
    try {
        const response = await fetch('/api/send',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: 'lopesluan431@gmail.com',
                name: 'Kaique'
            })
        })
    
        const data = await response.json();

        if (response.ok) {
            console.log('Email enviado com sucesso', data)
        } else {
            console.log('Erro ao enviar o email', data.error)
        }
    } catch (error) {
            console.log('Erro de rede', error)
    }
 }