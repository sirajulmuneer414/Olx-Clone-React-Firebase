import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { storage, firestore } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    const date = new Date()
    e.preventDefault()
    if (name === '' || name.trim === '') {
      setError(true);
      setErrorMessage('The product name should not be empty')
      return;
    }
    else if (category === '' || category.trim === '') {
      setError(true);
      setErrorMessage('The category name should not be empty')
      return;
    }
    else if (price.length === 0 || price === 0) {
      setError(true);
      setErrorMessage('The price should not be zero or be left empty')
      return;
    }
    else if (image == null) {
      setError(true);
      setErrorMessage('should choose an image')
      return;
    }
    else {
      setError(false)
    }
    const storageRef = ref(storage, `/image/${image.name}`)

    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        try {
          const docRef = addDoc(collection(firestore, "products"), {
            name,
            category,
            price,
            url: downloadURL,
            userId: user.uid,
            createdAt: date.toDateString()
          });
          console.log("Document written with ID: ", docRef.id);
          navigate('/')
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })





  }

  return (
    <Fragment>
      <Header />
      {error && <div className='errorBoxCreate'>{errorMessage}</div>}
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="fname"
              name="Price" />
            <br />

            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
