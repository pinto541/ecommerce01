import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

import Search from "./Search";
import Menu from "./Menu";
import "fontsource-roboto";
import Copyright from "./Copyright";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <>
      <div style={{ padding: 25 }}>
        <Menu />
      </div>
      <div>{/* <Search style={{ padding: "5px" }} /> */}</div>
      <div className="container  py-3">
        <div className="row mt-3">
          <div className="col-md-12 h2-card">
            <h2
              className="mb-2"
              style={{
                color: "red !important",
              }}
            >
              New Arrivals
            </h2>
            <div className="row">
              {productsByArrival?.map((product, i) => (
                <div
                  key={i}
                  className="col-6 col-sm-6  col-md-6 col-lg-3 my-2 clor p-1"
                >
                  <Card product={product} />
                </div>
              ))}
            </div>

            <h2 className="mb-2 mt-5">Best Sellers</h2>
            <div className="row">
              {productsBySell?.map((product, i) => (
                <div
                  key={i}
                  className="col-6 col-sm-6  col-md-6 col-lg-3 my-2 clor p-1"
                >
                  <Card product={product} />
                </div>
              ))}
            </div>

            <h2 className="mb-2 mt-5">Freqently Bought</h2>
            <div className="row">
              {productsBySell?.map((product, i) => (
                <div
                  key={i}
                  className="col-6 col-sm-6  col-md-6 col-lg-3 my-2 clor p-1"
                >
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>

      <Copyright />
    </>
  );
};

export default Home;
