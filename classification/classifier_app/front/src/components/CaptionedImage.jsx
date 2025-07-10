import { useEffect, useState } from 'react';
import classificationRequest from '../classify/api';

export default function CaptionedImage({ imgSrc, method }){
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategory(null);

    const getCaption = async () => {
      const response = await classificationRequest(method, imgSrc);

      setCategory(response["category"]);
    };

    getCaption();
  }, [imgSrc, method]);

  return <>
    <div className="captioned-image">
        { category === null ? <h2>It's a ...</h2> : <h2>It's a {category}!!!</h2>}
        <img className="image" src={imgSrc} />
        
      </div>
  </>
}