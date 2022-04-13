import { getProviders, signIn } from "next-auth/react"
import { Navbar } from "../../components/OTHER/Navbar";

function signin({providers}) {
    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
            <div className="mt-35">
                {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
                                Sign in with {provider.name}
                            </button>   
                        </div>
                ))}  
            </div> 
        </div>
  
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return{
        props: {
            providers
        }
    }
}

export default signin
