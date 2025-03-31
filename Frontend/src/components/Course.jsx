import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cards from './Cards'
import { Link } from 'react-router-dom'
import PaymentButton from './PaymentButton'
import toast from 'react-hot-toast';

function Course() {

  const [book, setBook] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () =>{
      try{
        setLoading(true);
        // const res =  await axios.get("https://library-app-beta-one.vercel.app/book");
        const res =  await axios.get("https://bytebooks-backend.onrender.com/book");
        console.log('Books data:', res.data);
        setBook(res.data);
      } catch(error){
          console.error('Error fetching books:', error);
          toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    }
    getBook();
  },[])

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <>
    <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-16 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl ">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
          Reading books enriches the mind, offering knowledge, creativity, and new perspectives. It enhances focus, vocabulary, and critical thinking, fostering personal and intellectual growth. Books also provide an escape, nurturing empathy and emotional well-being through engaging stories and ideas.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {book.map((item) => (
            <div key={item._id || item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <Cards item={item} />
              <div className="mt-auto flex justify-center w-full">
                <PaymentButton 
                  course={{
                    id: item._id || item.id,
                    bookname: item.bookname || item.name,
                    price: item.price,
                    image: item.image
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Course


