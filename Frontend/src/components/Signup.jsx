import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import { useForm } from "react-hook-form"
import Navbar from './Navbar'
import toast from 'react-hot-toast'

function Signup() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
        const userInfo = {
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        }

        await axios.post("https://library-app-beta-one.vercel.app/user/signup", userInfo)
        .then((res)=>{
          console.log(res.data);
          if(res.data){
            toast.success('Signup Successfully ');
            navigate(from, {replace: true});
            
          }
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }) .catch((err) => {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        })
      };

  const openLoginModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="flex h-screen items-center justify-center dark:bg-slate-900 dark:text-white">
      <div className='w-[600px]'>
        <div className="modal-box dark:bg-slate-900 dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
          
          <h3 className="font-bold text-lg ">Signup</h3>
          <div className="mt-4 space-y-2">
            <span>Name</span>
            <br />
            <input
              type="text"
              placeholder="Enter your fullname"
              className="w-80 px-3 py-1 border rounded-md outline-none dark:text-black"
              {...register("fullname", { required: true })}
            />
            <br />
            {errors.fullname && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mt-4 space-y-2">
            <span>E-mail</span>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-80 px-3 py-1 border rounded-md outline-none dark:text-black"
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mt-4 space-y-2">
            <span>Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-80 px-3 py-1 border rounded-md outline-none dark:text-black"
              {...register("password", { required: true })}
            />
            <br />
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="flex justify-around mt-4">
            <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
              Signup
            </button>
            <p>
              Have an account?{" "}
              <button
                type="button"
                className="underline text-blue-500 cursor-pointer"
                onClick={openLoginModal}
              >
                Login
              </button>
            </p>
          </div>
          </form>
        </div>
      </div>
      <Login />
      <Navbar/>
    </div>
    
  )
}

export default Signup
