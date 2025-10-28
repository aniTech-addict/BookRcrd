"use client"
import {useForm} from "react-hook-form"

const LoginPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm(
    {
      defaultValues:{
        username:"",
        email:"",
        password:""
      }
    }
  )
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-blue-900 rounded-lg shadow-md p-6 sm:p-8 md:w-96">
        <h2 className="text-xl font-bold text-center mb-6 sm:text-2xl">Signup</h2>
        <form
        onSubmit={handleSubmit((data)=>{
          //send to user handler
          
        })} 
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
            <div className="flex flex-row gap-3">
              Password:
            <input {...register("password",{required:"Required Field"})}/>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage;