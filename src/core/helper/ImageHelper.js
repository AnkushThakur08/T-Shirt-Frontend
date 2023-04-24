import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {loading && (
        <div>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
            text-align="center"
          />
        </div>
      )}
      <img src={imageUrl} alt="photo" style={{ maxHeight: '1000px', maxWidth: '100%' }} className="mb-3 rounded" onLoad={handleImageLoad} />
    </div>
  );
};

export default ImageHelper;
