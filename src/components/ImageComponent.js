import React, { useEffect, useState } from "react";
import { getImage } from "../api/adminApis";

const ImageComponent = ({ token, rid, fileid,blur,round }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (fileid && rid && token) {
        try {
          const response = await getImage(token, rid, fileid); 
          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageSrc(imageObjectURL); 
        } catch (error) {
          console.error("Failed to load image");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); 
      }
    };

    fetchImage();
  }, [rid, fileid, token]); 

  if (loading) return <div>Loading...</div>;

  return (
    <img
      src={imageSrc}
      alt="User Uploaded"
      style={{
        width: "100%",
        height: "100%",
        filter: blur ? "blur(4px)" : "none", 
        borderRadius: round ? "50%" : "none", 
        
      }}
    />
  );
};

export default ImageComponent;
