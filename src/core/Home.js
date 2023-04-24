import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { Audio } from 'react-loader-spinner';

import NavBar from './NavBar';

// API Call
import { getProducts } from './helper/coreapicalls';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadAllProducts = async () => {
    await getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to Tees Store">
      <div className="row text-center">
        <p className="display-5 text-white">All your Favorate Tees</p>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Audio
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
        ) : (
          products.map((product, index) => (
            <div key={index} className="col-4 mb-4">
              {' '}
              <Card product={product} />
            </div>
          ))
        )}
      </div>
    </Base>
  );
};

export default Home;
