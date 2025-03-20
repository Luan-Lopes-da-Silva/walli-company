'use client'

import { useState, startTransition } from "react";
import ReactDOMServer from 'react-dom/server';
import StatusEmail from "../components/Email/StatusEmail";

export default function TestComponents() {
  const [clientName,setClientName] = useState('')
  const [companyName,setCompanyName] = useState('')
  const [workerCompany,setWorkerCompany] = useState('')
  const [consultantName, setConsultantName] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')

  function testAmortizationSAC() {        
    window.open(`/api/generate-pdf?imobillevalue=${500000}&financementvalue=${400000}&parcels=${320}&amortization=${"PRICE"}`, '_blank')
  }



  async function sendEmail() {
    console.log('Enviando email...');
    
    startTransition(async () => {
      try {
        const response = await fetch(`https://email-generator-1-dnt9.onrender.com/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'kaiques.goncalves@gmail.com',
            name: clientName,
            subject: 'Seja Bem-Vindo!',
            templateHtml: ReactDOMServer.renderToStaticMarkup(<StatusEmail 
                clientName={clientName}/>),
          }),
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data);
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
      }
    });
  }

  return (
    <>
      <input type="text" placeholder="Nome do cliente" value={clientName} onChange={(ev)=>setClientName(ev.currentTarget.value)}/>
      <input type="text" placeholder="Nome da empresa Matriz" value={companyName} onChange={(ev)=>setCompanyName(ev.currentTarget.value)}/>
      <input type="text" placeholder="Telefone da empresa Matriz" value={companyPhone} onChange={(ev)=>setCompanyPhone(ev.currentTarget.value)}/>
      <input type="text" placeholder="Nome do consultor" value={consultantName} onChange={(ev)=>setConsultantName(ev.currentTarget.value)}/>
      <input type="text" placeholder="Nome do trabalhador da matriz" value={workerCompany} onChange={(ev)=>setWorkerCompany(ev.currentTarget.value)}/>
      <button onClick={testAmortizationSAC}>Baixar PDF</button>
      <button onClick={sendEmail}>Enviar email</button>
    </>
  );
}
