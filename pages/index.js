import axios from 'axios';
import Head from 'next/head';
import { useEffect } from 'react';
import { modalState } from '../atoms/modalAtom';
import Feed from '../components/MAIN/Feed';
import Modal from '../components/MAIN/Modal';
import { Navbar } from '../components/OTHER/Navbar';

export default function Home() {
  
  useEffect(() =>{
    localStorage.clear()
  })

  return (
    <div className='text-black'>
      <Head>
        <title>Valips</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <Feed />
      <Modal />

    </div>
  );
}