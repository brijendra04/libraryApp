import React from 'react';
import banner from '/Banner.jpg';


const Banner = () => {
  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-30">
        <div className="space-y-6">
        <h1 className="text-4xl font-bold">
        “Educate, Agitate, Organize” 
        <br />
          <span className="text-pink-500"> ~ Dr. B.R. Ambedkar</span>
          </h1>
          <p>
          Welcome to Our Online Library!

          Discover a vast collection of books, journals, articles, and multimedia resources, all at your fingertips. Whether you're a student, researcher, or book lover, our user-friendly platform offers something for everyone. Enjoy easy navigation and a wealth of knowledge to support your learning and interests.
          <br />
          Happy reading!
          <br />
          ByteBooks Team
          </p>
          <label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" />
</label>
        </div>
        <button className="btn mt-6 btn-active btn-secondary">Subscribe</button>
          </div>
        <div className="w-full order-1 md:w-1/2 md:mt-30 mt-12">
        <img src={banner} className="w-90 h-90" alt="" />
        </div>
    </div>
    </>
  )
}

export default Banner;