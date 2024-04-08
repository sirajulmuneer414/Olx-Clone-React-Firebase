import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {


  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firestore } = useContext(FirebaseContext)

  useEffect(() => {
    const { userId } = postDetails
    const q = query(collection(firestore, 'users'), where('id', '==', userId))
    getDocs(q).then((res) => {
      res.forEach(doc => {

        setUserDetails(doc.data())
      })
    })
  }, [])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="Product"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;
