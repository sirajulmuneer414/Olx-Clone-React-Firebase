import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { app, firestore } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const [sugProducts, setSugProducts] = useState([])
  const [setSug, setSetSug] = useState(false)
  const { setPostDetails } = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {
    getDocs(collection(firestore, 'products')).then((snapshot) => {
      const allpost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allpost)
      if (allpost.length >= 4) {
        for (let i = allpost.length - 1; i > allpost.length - 4; i--) {
          setSugProducts([...sugProducts, allpost[i]])
        }
      } else {
        setSugProducts(allpost)
      }
      setSetSug(true)

    })
  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product)
                  navigate('/view')
                }
                }
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>)
          })
          }
        </div>
      </div>
      {setSug && <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {sugProducts.map(product => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product)
                  navigate('/view')
                }
                }
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>)
          })
          }
        </div>
      </div>}
    </div>
  );
}

export default Posts;
