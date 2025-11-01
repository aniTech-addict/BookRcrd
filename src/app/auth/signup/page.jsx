"use client"
import {useForm} from "react-hook-form"
import axios from "axios"
import Link from "next/link"
import { useState } from "react";

const SignupPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm(
    {
      defaultValues:{
        username:"",
        email:"",
        password:""
      }
    }
  )

  const [userExists, setUserExists] = useState(false);

  async function postUser(data){
      try {
        const response = await axios({
          method: "POST",
          url: "/api/auth/signup",
          data: data
        })
        console.log("🔴"+response)
        if(response.status === 409){
          setUserExists(true)
        }
      } catch (error) {
        console.error("Error posting user:", error)
        if(error.response.status == 409){
          setUserExists(true);
        }
      }
    }

  const onSubmit = handleSubmit(async (data) => {
    await postUser(data);
  });

  const [userExists, setUserExists] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-blue-900 rounded-lg shadow-md p-6 sm:p-8 md:w-96">
        <h2 className="text-xl font-bold text-center mb-6 sm:text-2xl">Signup</h2>
        <form
        onSubmit={onSubmit}
        className="form">
          
          <div className="mb-4 ">
            <div className="flex flex-row gap-3">
              Email:
            <input {...register("email",{required:"Required Field"})}/>
            </div>
          </div>

          <div className="mb-4 ">
            <div className="flex flex-row gap-3">
              Username:
            <input {...register("username",{required:"Required Field"})}/>
            </div>
          </div>

          <div className="mb-4 ">
            <div className="flex flex-row gap-3 ">
              Password:
            <input {...register("password",{required:"Required Field"})}/>
            </div>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Signup
          </button>

          <p className={`p-2 ${userExists ? "visible" : "invisible"}`}>
            User already exits. Please
            <Link href="/auth/login" className="hover:text-amber-300">  login </Link>
            instead.
          </p>

        </form>
      </div>
    </div>
  )
}

export default SignupPage;