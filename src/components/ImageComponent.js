// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


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





