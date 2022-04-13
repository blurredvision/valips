import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Modal from '../components/MAIN/Modal';
import { Navbar } from '../components/OTHER/Navbar';
import Profile from '../components/DASHBOARD/Profile';
import { useEffect } from 'react';
import Router from 'next/router'

export default function Home() {
    const {data: session} = useSession();

    useEffect(() =>{
      if(localStorage.getItem("key") == "loggedOut"){
        Router.push("/")
      }
    })

  return (
    <div className='text-black'>
      <Head>
        <title>Valips</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <Modal />
      <h1 className='text-center mt-5 font-bold text-2xl'>Manage your videos</h1>
      <Profile session={session}/>

    </div>
  );
}