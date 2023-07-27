import { PhotoCamera } from "@mui/icons-material";
import { list } from "./service";
import { useState } from "react";
import { useEffect } from "react";
import PhotoUpload from "./photoUpload";
import useToast from "app/hooks/useToast";

const { Container, IconButton } = require("@mui/material")
const { default: ReactImageGallery } = require("react-image-gallery")



const Photo = () => {


  const data2Item = (data) =>({
    original:  `https://daxi86wourk2c.cloudfront.net/photos/${data.IdPicture}`,
    thumbnail: `https://daxi86wourk2c.cloudfront.net/thumbs/${data.IdPicture}`,
    thumbnailAlt: data.Title,
    description: data.Title,    
  })

  const[photos, setPhotos] = useState([])

      const fill = () => {
        list({}).then(items => {
          const res = items.map(m=>data2Item(m))
          
          setPhotos(res);
        })
      }    
      
      const handleUploaded = (itm) => {
        setPhotos([...photos, data2Item(itm)]);
      }
      
      useEffect(()=>{
          fill()
      }, [])


    return photos.length == 0 ? (<Container fixed><PhotoUpload OnUploaded={handleUploaded}/></Container>) : (<Container fixed>
        <ReactImageGallery items={photos} showBullets="true" autoPlay="true" renderCustomControls={()=> (<PhotoUpload OnUploaded={handleUploaded}/>)} />
        </Container>)
}

export default Photo;