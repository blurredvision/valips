import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom';


export const Navbar = () => {
  const {data: session} = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleSignout = () =>{
    signOut()
    localStorage.setItem("key", "loggedOut")
  }

  return (
    <>
      <nav className='flex items-center flex-wrap bg-zinc-800 p-3 '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
            <span className='text-xl text-white font-bold uppercase tracking-wide'>
              Valips
            </span>
          </a>
        </Link>
        <button
          className=' inline-flex p-3 hover:bg-zinc-900 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-zinc-900 hover:text-white '>
                Home
              </a>
            </Link>
            {session ? (
              <>
            <Link href='/'>
            <a onClick={() => setOpen(true)} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-zinc-900 hover:text-white'>
              Upload
            </a>
            </Link>
            <Link href='dashboard'>
            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-zinc-900 hover:text-white '>
                Dashboard
              </a>
            </Link>
            <Link href='/'>
            <img 
                onClick={handleSignout}
                src={session.user?.image}
                alt="profile pic" 
                className="h-10 w-10 rounded-full cursor-pointer ml-2"/>
            </Link>
              </>
              ) : (
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-zinc-900 hover:text-white cursor-pointer" onClick={signIn}>Sign In</a>
                // <img 
                // onClick={signOut}
                // src={session.user?.image}
                // alt="profile pic" 
                // className="h-10 w-10 rounded-full cursor-pointer"/>
            )}

          </div>
        </div>
      </nav>
    </>
  );
};