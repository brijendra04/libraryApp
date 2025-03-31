import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    }

    // await axios.post("https://library-app-beta-one.vercel.app/user/login", userInfo)
    await axios.post("https://bytebooks-backend.onrender.com/user/login", userInfo)
    .then((res)=>{
      console.log(res.data);
      if(res.data){
        toast.success('Loggedin Successfully ');
        document.getElementById("my_modal_3").close()
        setTimeout(() => {
          window.location.reload();
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }, 1000);
        
      }
      
    }) .catch((err) => {
      console.log(err);
      toast.error("Error: " + err.response.data.message);
      setTimeout(() => {}, 2000);
    })
  }

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}>✕</button>
            <h3 className="font-bold text-lg">Login</h3>
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
            <div className='flex justify-around mt-4'>
              <button type="submit" className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>Login</button>
              <p>Not registered?{" "}
                <Link to="/signup" className='underline text-blue-500 cursor-pointer'>Signup</Link> {" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default Login
