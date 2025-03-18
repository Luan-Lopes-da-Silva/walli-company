import {
    Body,
    Container,
    Head,
    Html,
    Text,
  } from '@react-email/components';
  import * as React from 'react';

  
    interface Status{
      clientName:string
    }

  export const StatusEmail = ({clientName}:Status) => (
    <Html>
      <Head />
  
      <Body style={main}>
        <Container style={container}>
              <Container style={logo}>
                  <Text style={text}>Logo</Text>
              </Container>
  
              <Container style={welcomeContainer}>
                  <Text style={title}>
                    Prezado(a) {clientName}
                  </Text>
                  <Text>
                  Gostaríamos de informá-lo(a) que houve uma atualização no status do seu processo. O novo status é: [Novo Status do Processo].
                  </Text>
              </Container>
  
              <Container style={welcomeContainer}>
                  <Text style={title}>Detalhes do Status Atual</Text>
                  <Text style={textContent}>
                      <ul>
                        <li>Status Atual: [Novo Status do Processo]</li>
                        <li>Data da Atualização: [Data de Atualização]</li>
                        <li>Consultor Responsável: [Nome do Consultor, se aplicável]</li>
                      </ul>
                  </Text>
                  <Text>
                  Caso precise de mais informações sobre o andamento do seu processo ou tenha alguma dúvida, estamos à disposição para auxiliá-lo(a). Você pode também acompanhar o progresso diretamente na nossa plataforma usando o número do protocolo: [Número do Protocolo].
Se desejar, nosso time de consultores pode fornecer mais detalhes ou ajudá-lo(a) em qualquer etapa adicional.
Atenciosamente, [Seu Nome] [Nome da Empresa] [Informações de Contato]
                  </Text>
              </Container>
        </Container>
      </Body>
    </Html>
  );
  
  export default StatusEmail;
  
  const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: '#ffffff',
  };
  
  const container = {
    width:'800px',
    height:'100%',
    backgroundColor:'#D3D664'
  };
  
  const logo = {
      backgroundColor:'#028DA5',
      width:'100px',
      height:'100px',
      padding:'20px',
      borderRadius:'50%',
      margin:'12px',
      display:'grid',
      placeItems:'center',
      justifyContent:'center',
      alignItems:'center'
  }
  
  const text = {
    width:'100%',
    TextAlign:'center',
    padding:'0px 7px',
    color:'#000'
  }

  const list = {
    display:'flex',
    flexDirection:'column',
    gap:'12'
  }
  
  const textContent = {
  fontSize:'14px',
  fontWeight:'light',
  color:'#000'
  }
  
  const title = {
  marginBottom:"4px",
  fontSize:'20px',
  fontWeight:'bold',
  width:'100%',
  color:'#000',
  display:'block'
  }
  
  const welcomeContainer = {
      marginTop:'20px',
      width:'300px'
  }
  