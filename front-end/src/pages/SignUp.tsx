import { Container, Grid, TextField, Button, Card, CardContent, Stack, Link } from '@mui/material';
import React, { useState } from 'react'
import { postRegisterLogin } from '../config/api';
import { useForm } from "react-hook-form";
const SignUp = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();




    const onSubmit = (data: object) => {
        postRegisterLogin({ ...data, "pattern": JSON.stringify(numper) });
    }
    const [numper, setNumper] = useState<Number[]>([]);



    const styled = {
        maxWidth: 550,

        padding: "20px 5px",
        margin: "20px auto"
    }
    const onDown = () => {

        numper.push(Date.now())
        console.log(numper)
    }

    let timeStart = 0;
    const timeNow = () => {

        if (numper.length < 16) {
            if (numper.length == 0) {
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >


                            <Grid item>

                                <h1>Sign Up</h1>
                            </Grid>
                            <Grid
                                item
                                xs={12}>

                                <Stack direction={'row'} spacing={1}>



                                    <TextField  {...register("first_name")}
                                        size="small"
                                        fullWidth
                                        label="First Name"
                                        variant="outlined" />
                                    <TextField  {...register("last_name")}
                                        size="small"
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined" />
                                </Stack>
                            </Grid>
                            <Grid
                                item
                                xs={12}>




                                <TextField  {...register("username")}
                                    size="small"
                                    fullWidth
                                    label="Username"
                                    variant="outlined" />
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
                                    label="Password"
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type='submit'
                                    fullWidth={true}
                                    color="secondary"
                                    variant="contained">submit</Button>

                            </Grid>

                            <Grid 
                            item 
                            xs={12}>
                                            <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-end"
                                    spacing={2}>
                                    <Link href='/sign-up'>Login?</Link>
                                    <Link href='/sign-up'>already have an account </Link>

                                </Stack>

                                 </Grid>








                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default SignUp 