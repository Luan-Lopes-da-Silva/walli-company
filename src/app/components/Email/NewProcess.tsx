import {
    Body,
    Container,
    Head,
    Html,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface ProcessProps{
    clientName:string,
    consultantName:string,
    companyName: string,
    workerCompany: string,
    companyPhone:string
  }
  
  export const NewProcess = ({clientName,companyName,consultantName,workerCompany,companyPhone}:ProcessProps) => (
    <Html>
      <Head />
  
      <Body style={main}>
        <Container>
          <div style={container}>
              <Container style={logo}>
                  <Text style={text}>Logo</Text>
              </Container>
  
              <Container style={welcomeContainer}>
                  <Text style={title}>Olá {consultantName}</Text>
                  <Text style={textContent}>
                  Temos um novo processo cadastrado em nossa plataforma e gostaríamos de saber se você tem interesse em assumir a responsabilidade por ele.
                  em nossa plataforma ou em futuras comunicações com nossa equipe.
                  </Text>
              </Container>
  
              <Container style={welcomeContainer}>
                  <Text style={title}>Detalhes do novo processo</Text>
                  <Text style={textContent}>
                   <ul>
                      <li>Cliente: {clientName}</li>
                      <li>Número do Protocolo: [Número do Protocolo]</li>
                      <li>Descrição do Processo: [Breve descrição do processo, se necessário]</li>
                      <li>Data de Cadastro: [Data de Cadastro]</li>
                   </ul>
                  </Text>
                  <Text style={textContent}>
                  Se desejar pegar esse processo para cuidar, basta nos avisar, e faremos a atribuição. Caso não esteja disponível ou prefira que outro consultor assuma, também ficaremos felizes em realizar essa alteração.
Ficamos no aguardo de sua resposta!
Atenciosamente, {workerCompany}, {companyName}, {companyPhone}
                  </Text>
              </Container>
          </div>
        </Container>
      </Body>
    </Html>
  );
  
  export default NewProcess;
  
  const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: '#ffffff',
  };
  
  const container = {
    width:'800px',
    height:'100%',
    backgroundColor:'#D3D664',
    padding:'20px'
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
    color:'#000'
  }
  
  const welcomeContainer = {
      marginTop:'20px',
      width:'300px'
  }

  const list = {
    padding:'0px 12px',
    display:'flex',
    gap:'12px',
    flexDirection:'row'
  }
  