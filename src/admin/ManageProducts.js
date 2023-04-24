import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';

// API
import { getAllProducts, deleteProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { Audio } from 'react-loader-spinner';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    setLoading(true);
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const DeleteProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
        <h1 className="display-6 text-success">Product Deleted Successfully</h1>;
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">My Total Products</h2>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
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
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link className="btn btn-success" to={`/admin/product/update/${product._id}`}>
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      DeleteProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
