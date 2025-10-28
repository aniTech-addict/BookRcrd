"use client"
import {useForm} from "react-hook-form"
import { useState, useEffect } from "react";
import axios from "axios";
import { refresh } from "next/cache";

const AddPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm(
    {
      defaultValues:{
        title: "",
        author: "",
        genre: "",
        publicationDate: ""
      }
    }
  )

  async function pushInfo(data){
    try {
        await axios({
        method: "POST",
        url: "/api/add",
        data: data
      })
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }
  
  
  return (
    <div>
      <form onSubmit={handleSubmit((data)=>{
        pushInfo(data);
        
      })}
      className="flex width-full justify-center items-center"
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-3 mt-2">
            <p>Title</p>
            <input {...register("title",{required:"Required Field"})}/>
            <p className="text-red-400 text-sm">{" *"} {errors.title?.message}</p>
          </div>

          <div className="author flex flex-row gap-3 mt-2">
            <p>Author</p>
            <input {...register("author",{required:"Required Field"})}/>
            <p className="text-red-400 text-sm">{" *"} {errors.author?.message}</p>
          </div>

          <div className="genre flex flex-row gap-3 mt-2">
            <p>Genre</p>
            <input {...register("genre",{required:"Required Field"})}/>
            <p className="text-red-400 text-sm">{" *"} {errors.genre?.message}</p>
          </div>

          <div className="publicationDate flex flex-row gap-3 mt-2">
            <p>Publication Date</p>
            <input {...register("publicationDate",{required:"Required Field"})} type="date"/>
            <p className="text-red-400 text-sm">{" *"} {errors.publicationDate?.message}</p>
          </div>

          <button type="submit"
          className="bg-amber-300 mt-3 text-black hover:text-gray-800 hover:bg-amber-200 hover:tracking-wider" >
            Submit
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default AddPage