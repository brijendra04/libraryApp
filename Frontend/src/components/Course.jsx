import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cards from './Cards'
import { Link } from 'react-router-dom'

function Course() {

  const [book, setBook] = useState([])
  useEffect(() => {
    const getBook = async () =>{
      try{
       const res =  await axios.get("https://library-app-beta-one.vercel.app/book");
       console.log(res.data);
       setBook(res.data);
      } catch(error){
          console.log(error);
      }
    }
    getBook();
  },[])


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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>

    </>
  )
}

export default Course