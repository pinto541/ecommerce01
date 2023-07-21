import React, { useState, useEffect } from 'react';

import { read, listRelated } from './apiCore';
import Card from './Card';
import Menu from './Menu';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <>
    <Menu/>
   
      <div className='row'>
        <div className='w-full bg-black-100'>
        <div className='h-28 border-t border-gray-300 px-4 py-2 flex justify-between items-center text-base lg:font-medium !important'>
          <h4>Product Details</h4>
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        <div className='col-md-4'>
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div className='mb-3' key={i}>
              <Card product={p} />
            </div>
          ))}
        </div>
       
      
      </div>
      </div>
    </>
  );
};

export default Product;
