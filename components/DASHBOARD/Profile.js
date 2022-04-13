import React from 'react'
import {
  TrashIcon
} from '@heroicons/react/outline'
import {useState, useEffect} from 'react'
import { collection, doc, onSnapshot, orderBy, query, where, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"

function Profile({session}) {
    // const {data: session} = useSession();
    const [user, setUser] = useState();
    const [videos, setVideo] = useState([])
    const colRef = collection(db, "posts")
    const colRef1 = collection(db, "posts", "VYLaZH4PpZtXAp1F5edF", "likes")
    const q = query(colRef, where("username", "==", "nichejegatheeswaran"))


    useEffect(() =>{
      if(!localStorage.getItem("key")){
        localStorage.setItem("key", session.user.username)
        console.log(localStorage.getItem("key"))
        setUser(localStorage.getItem("key"))
      }
      else{
        setUser(localStorage.getItem("key"))
      }
    })

    useEffect(
        () =>
        onSnapshot(
            query(query(colRef, where("username", "==", localStorage.getItem("key")))), (snapshot) =>{
                console.log(snapshot.docs)
                setVideo(snapshot.docs)
            }
        ),
    [db])

    onSnapshot(colRef1, (snapshot) =>{
      let likes = []
      snapshot.docs.forEach((doc) =>{
        likes.push(doc.data())
      })
    })

    const badges = (status) =>{
      if(status == "complete"){
        return <span className="px-2 py-1 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">Accepted</span>
      }
      else if(status == "failed"){
        return <span class="px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">Failed</span>
      }
      else if(status == "waiting"){
        return <span class="px-2 py-1 text-xs font-bold leading-none text-red-100 bg-orange-600 rounded-full">Processing</span>
      }
    }


  return (
    <main className={`grid grid-cols-1 md:grid-cols-1 md:max-w-3xl xl:grid-cols-1 xl:max-w-6xl mx-auto`}>
            {videos.map(v => (
                <div key={v.id} className="bg-white my-7 border rounded-sm mx-auto p-5 text-center">
                    <video controls src={v.data().video} className='object-cover w-80' alt=''/>
                    <h1 className='text-center m-2'>Caption: {v.data().caption}</h1>
                    {badges(v.data().status)}
                    <TrashIcon onClick={() => deleteDoc(doc(db, 'posts', v.id))} className='btn mx-auto mt-2'/>
                </div>
            ))}
    </main>
  )
}

export default Profile
