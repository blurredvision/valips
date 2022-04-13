import { collection, onSnapshot, orderBy, query} from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import Video from "./Video"


function Videos() {
    const [videos, setVideo] = useState([])

    useEffect(
        () => 
        onSnapshot(
            query(collection(db, "posts"), orderBy('timestamp', 'desc')), (snapshot) =>{
            setVideo(snapshot.docs);
        }
        ), [db]
    );

    return (
        <div>
            {videos.map(videoa => (
                videoa.data().status == 'complete' ? 
                <Video
                    key={videoa.id} 
                    id={videoa.id} 
                    username={videoa.data().username} 
                    userImg={videoa.data().profileImg} 
                    img={videoa.data().video} 
                    caption={videoa.data().caption}
                />
                :
                <h1></h1>
            ))}
        </div>
    )
}

export default Videos
