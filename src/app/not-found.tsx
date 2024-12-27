'use client'

import Link from 'next/link'
import style from './not-found.module.scss'
import { useEffect } from 'react'

export default function Custom404(){
    useEffect(()=>{
        document.title = 'Página não encontrada'
    })
    return(
        <div className={style.container}>
            <div className={style.error}>
                <h2>4</h2>
                <h2>0</h2>
                <h2>4</h2>
            </div>
            <p>Página não encontrada</p>
            <button><Link href={'/home'}>Home</Link></button>
        </div>
    )
}