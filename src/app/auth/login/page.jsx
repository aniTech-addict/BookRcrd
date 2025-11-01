"use client"

import {useForm} from "react-hook-form"
import Link from "next/link";
import axios from "axios"

const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm(
    {
      defaultValues:{
        username:"",
        password:""
      }
    }
  )
  const loginUser = async (data) => {
   
  
    const response = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: data
    })
 

   return new Response(JSON.stringify({status:response.status}),{
    status:response.status,
    type:"application/json"
   })

  }


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-blue-900 rounded-lg shadow-md p-6 sm:p-8 md:w-96">
        <h2 className="text-xl font-bold text-center mb-6 sm:text-2xl">Login</h2>
        <form
        onSubmit={handleSubmit((data)=>{
          loginUser(data);
        })} >
          
          
          <div className="mb-4 ">
            <div className="flex flex-row gap-3">
              Username:
            <input {...register("username",{required:"Required Field"})}/>
            </div>
          </div>

          <div className="mb-4 ">
            <div className="flex flex-row gap-3">
              Password:
            <input {...register("password",{required:"Required Field"})}/>
            </div>
          </div>

          <div className="flex width-full items-center justify-between">
            <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
              focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage;