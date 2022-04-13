const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
import { db, storage } from "../../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadString} from "firebase/storage"
import imageDataURI from 'image-data-uri'
import TeachableMachine from '@sashido/teachablemachine-node'
import cors from 'cors'


export default async(req, res) =>{
    const { method } = req
    const { url, id } = req.body

    function prediction(){
        imageDataURI.encodeFromFile('./images/f.png').then(async res => {
            const imageRef = ref(storage, `image/${id}/image.png`)

            await uploadString(imageRef, res, "data_url").then(async snapshot => {
                const downloadURL = await getDownloadURL(imageRef)
                console.log(downloadURL)
                cors()

                const model = new TeachableMachine({
                  modelUrl: "https://teachablemachine.withgoogle.com/models/m7nIC6IUt/"
                });
              
                model.classify({
                  imageUrl: downloadURL,
                }).then(async (predictions) => {
                  var temp = predictions[1].score.toString().substring(0,4)
                  if(parseFloat(temp) > 0.99){
                    console.log("Predictions:", predictions[1].score);
                    console.log(predictions)
                    await updateDoc(doc(db,'posts',id),{
                        status: 'complete',
                        video: url
                    })
                  }
                  else{
                      console.log("not met")
                      console.log(predictions)
                      await updateDoc(doc(db,'posts',id),{
                        status: 'failed',
                        video: url
                    })
                  }
                }).catch((e) => {
                  console.log("ERROR", e);
                });
            })
        })
    }

    switch(method){
        case 'POST':
            try {
                await ffmpeg({source: url})
                .on('filenames', (filenames) =>{
                    console.log('Created file names', filenames)
                })
                .on('end', () =>{
                    console.log("DONE")
                })
                .on('error', (err) =>{
                    console.log('ERROR', err)
                })
                .takeScreenshots({
                    filename: "f.png",
                    timemarks: [2]
                }, './images')

                setTimeout(prediction, 5000)
                res.status(200).json({message: "done"})
            } catch (error) {
                res.status(400).json({error: error})
            }
            break
        default:
        res.status(400).json({success: false})
        break
    }
}
