import { TextField } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
const SignUp = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const onSubmit: SubmitHandler = data => console.log(data);
//   console.log(watch("example"))
const [numper, setNumper] = useState<Number[]>([])
// const [timeStart, setTimeStart] = useState<Number>(0)
    const onDown = ()=> {
        
        numper.push(Date.now())
        console.log(numper)
    }


let timeStart = 0;
    const timeNow = () => {
        
        if (numper.length < 16 ){
            if (numper.length == 0) {
                timeStart = Date.now()
                numper.push(timeStart - timeStart)
            }else{

                numper.push(Date.now()- timeStart )
            }
        }
        console.log(numper)
    }

  return (
    <div className="box">
        <form >

        
        
        <TextField
        {...register("example")}
    hiddenLabel
    id="filled-hidden-label-small"
    variant="filled"
    size="small"
    onKeyUp={() => {console.log("key up"); timeNow()}}
    onKeyDownCapture={timeNow}
    />
    </form>
    </div>
  )
}

export default SignUp