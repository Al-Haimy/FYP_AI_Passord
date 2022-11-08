import React, { useState } from 'react'
import { Grid, Stack, TextField, Container, Button, Card, CardContent, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
// import { endpoints, fetchWrapper } from '../utils/api';
// import { useAuth } from '../utils/auth';
// import { postLogin } from '../config/api';
import axios from 'axios';
import { Dispatch, State } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = ({ handler }: { handler: Dispatch }, state: State) => {

    const [isError, setIsError] = useState<boolean>(false)
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [numper, setNumper] = useState<Number[]>([]);
    // const handleLogin = async (e: any) => {
    //  const respons = await  postLogin({...e})

    // await setIsAuthentic(respons)
    //  console.log(isAuthentic)


    // };



    const styled = {
        maxWidth: 550,

        padding: "20px 5px",
        margin: "20px auto"
    }
    const navigate = useNavigate();
    const goToTraining = () => {

        navigate('/Traine')
    }
    const goToPrivate = () => {

        navigate('/private')
    }

    const handleLogin = (data: any) => {
        console.log(data.password.length)
        if (data.password.length < 8) {
            setIsError(true)
            setNumper([])
            reset()
        } else {

            axios.post('http://localhost:8000/api/token/?format=json', {
                ...data, "pattern": JSON.stringify(numper)
            })
                .then(function (response) {
                    // console.log(response.data.refresh);
                
                    console.log(response)
                    if (response.status > 299) {
                        setIsError(true)
                    } else {

                        // console.log(tok['refresh']);
                        switch (response.data["type"]) {
                            case 1:

                                localStorage.setItem("auth", response.data['body']['access']);
                                localStorage.setItem("refresh", response.data['body']['refresh']);
                                localStorage.setItem("trained", response.data['body']['trained']);

                                toast.success('Successfuly Loged in ', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });

                                handler('LOGIN')
                                goToTraining()

                                break;

                            case 2:

                                localStorage.setItem("auth", response.data['body']['access']);
                                localStorage.setItem("refresh", response.data['body']['refresh']);
                                localStorage.setItem("trained", response.data['body']['trained']);
                                toast.success('Successfuly Loged in ', {
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
                            case 3:
                                setIsError(true)
                                toast.error('AI detectin password', {
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
                        handler('LOGIN');

                    }

                })
                .catch(function (error) {
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
                });

            handler('LOGIN')
            navigate('/private');
        }
    }

    let timeStart = 0;
    const timeNow = () => {

        if (numper.length < 16) {
            if (numper.length === 0) {
                timeStart = Date.now()
                numper.push(timeStart - timeStart)
            } else {

                numper.push(Date.now() - timeStart)
            }
        }
        console.log(numper)
    }

    return (
        <Container maxWidth="lg">

            <Card style={styled}>
                <CardContent>
                    <form
                        style={{ width: '100%', padding: 2 }}
                        onSubmit={handleSubmit(handleLogin)}>
                        <Grid container spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >

                            <Grid item xs={12}>

                                <h1>Login page</h1>
                            </Grid>
                            <Grid xs={12} item>




                                <TextField
                                    {...register("username")}
                                    size="small"
                                    fullWidth id="outlinedbasic"
                                    label="Username"
                                    variant="outlined"
                                    autoComplete={'false'}
                                    autoFocus />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField

                                    {...register("password")}
                                    id="outlined-basic"
                                    onKeyUp={timeNow}
                                    onKeyDownCapture={timeNow}
                                    type="password"
                                    size="small"
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    onPaste={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }} onCopy={(e) => {
                                        e.preventDefault()
                                        return false;
                                    }}
                                    error={isError}
                                />

                            </Grid>
                            <Grid xs={12} item>
                                <Button fullWidth type="submit" variant="contained">Sign in</Button>

                            </Grid>

                            <Grid item xs={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-end"
                                    spacing={2}>
                                    <Link href='/sign-up'>Register?</Link>
                                    <Link href='/sign-up'>don't have an account </Link>

                                </Stack>


                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Login