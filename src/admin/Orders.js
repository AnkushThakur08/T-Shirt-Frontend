import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";

// API
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { getAllOrders } from "../core/helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";

const Orders = () => {
  const [category, setCategory] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrders().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setCategory(data);
        console.log(setCategory);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const DeleteCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
        <h1 className="display-6 text-success">
          Category Deleted Successfully
        </h1>;
      }
    });
  };

  return (
    <Base title="Order Management Section" description="Manage your order here">
      <Link className="btn btn-success" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">All Orders</h2>
          {category.map((cate, index) => (
            <div key={index} className="row text-center mb-2 ">
              {/* {console.log(cate.user.name)} */}
              <div className="col-3">
                <h3 className="text-white text-left"> {cate.user.name}</h3>
              </div>

              <div className="col-3">
                <h3 className="text-white text-left">{cate.amount}</h3>
              </div>
              <div className="col-3">
                <h3 className="text-white text-left">
                  {cate.products[0].name} {","}
                  {cate.products[1] ? cate.products[1].name : ""}
                </h3>

                {/* <Link
                  className="btn btn-success"
                  to={`/admin/categories/update/${cate._id}`}
                >
                  <span className="">Update</span>
                </Link> */}
              </div>
              <div className="col-3">
                <h3>{cate.status} </h3>
                {/* <button
                  onClick={() => {
                    DeleteCategory(cate._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Orders;
