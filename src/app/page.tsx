'use client'

import { useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import svgConstruction from '@/../public/assets/construction.svg'

export default function Home() {

  useEffect(()=>{
   window.document.title = 'Site em construção' 
  })
  
  return (
    <div className={styles.main}>
      <div className={styles.container}>
      <h1>Site em construção</h1>
      <Image
      width={400}
      height={400}
      alt="In construction image"
      src={svgConstruction}
      />
      </div>
        <div className={styles.logo}>
            <div>
              <h2>LOGO</h2>
            </div>
        </div>
    </div>
  );
}
