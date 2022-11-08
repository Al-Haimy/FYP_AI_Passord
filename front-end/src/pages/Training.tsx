import { Container, Card, CardContent, Grid, TextField, Button } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { Dispatch, State } from '../Auth/AuthProvider'
const styled = {
    maxWidth: 550,
    padding:"20px 5px",
    margin: "20px auto"
}

const Training =  ({handler}: {handler: Dispatch}, state:State) => {



    const token = localStorage.getItem("auth")
    const isTrained = localStorage.getItem("trained")
    
    const navigate = useNavigate();
    const goToLogin = () => {

        navigate('/login')
    }
    const goToPrivate = () => {

        navigate('/private')
    }


useEffect(() => {
  

  return () => {
    if (token && isTrained == 'true'){
        goToPrivate()
    
    }else if (!token){
        goToLogin()
    }
    
  }
}, [])





    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [keyStrokes, setKeyStrokes] = useState<Number[]>([]);
    const [isError, setIsError] = useState<boolean>(false)
    let timeStart = 0;
    const timeNow = () => {

        if (keyStrokes.length < 16) {
            if (keyStrokes.length == 0) {
                timeStart = Date.now()
                keyStrokes.push(timeStart - timeStart)
            } else {

                keyStrokes.push(Date.now() - timeStart)
            }
        }
        console.log(keyStrokes)
    }

    

    const onSubmit = (data: object) => {

        axios.post('http://localhost:8000/api/add_pattern/?format=json', {
            ...data, "pattern" : JSON.stringify(keyStrokes)
          }, {
            headers:{
            'Authorization': `Bearer ${token}`,
    }})
          .then(function (response) {
            
    
            console.log(response)
            switch (response.data["type"]) {
                case 1:

                    localStorage.setItem("auth", response.data['body']['access']);
                    localStorage.setItem("refresh", response.data['body']['refresh']);
                    localStorage.setItem("trained", response.data['body']['trained']);

                    toast.success('Successfuly Trained ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        goToPrivate()

                        break;

                case 2:


                    toast.success('Keep Going you almost there!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                
                    break;
                case 3:
                    setIsError(true)
                    toast.error('wrong password', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    reset()
                    break;

                default: 
                    toast.error('wrong Creditentials', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    setIsError(true)
                    reset()
                    break;
                

            }
    
                
            
          })
          .catch(function (error) {
            toast.error('login please expired token', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setIsError(true)
            reset()
            goToLogin()
          });

        console.log(data)
        reset()
        setKeyStrokes([])
    }


    return (
        <Container maxWidth="lg">

            <Card style={styled}>
                <CardContent>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >


                            <Grid item>

                                <h1>
                                    Machine Learning Training 
                                </h1>
                            </Grid>
            
                 
                            <Grid
                                item
                                xs={12}>
                                <TextField id="outlined-basic"
                                    onKeyUp={timeNow}
                                    onKeyDownCapture={timeNow}
                                    {...register("password")}
                                    type="password"
                                    size="small"
                                    fullWidth
                                    label="retype Password"
                                    variant="outlined"
                                    error={isError} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type='submit'
                                    fullWidth={true}
                                    color="secondary"
                                    variant="contained">submit</Button>

                            </Grid>








                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
  )
}

export default Training