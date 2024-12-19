'use client'

import { useEffect } from "react";
import styles from "./page.module.scss";

export default function Home() {

  useEffect(()=>{
   window.document.title = 'Site em construção' 
  })
  
  return (
    <div className={styles.main}>
      <div className={styles.container}>
      <h1>Site</h1>
      <h1>Em construção</h1>
      <p>Nosso site estará no ar em breve</p>
        <form action="">
          <label htmlFor="">Email</label>
          <input 
          type="text" 
          placeholder="Coloque seu email para ser notificado"
          />
          <button>Ser notificado</button>
        </form>
      </div>
    </div>
  );
}
