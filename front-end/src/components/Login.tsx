import React, { useState } from 'react'
import {Grid, Stack, TextField, Container, Button} from '@mui/material';

const Login = () => {
    const [numper, setNumper] = useState<Number[]>([]);

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
    <Container sx={{
        width: 500,
        padding: 10
    }} maxWidth="sm">
    <Grid container spacing={3}
     justifyContent="center"
     alignItems="center"
    >


        <Grid item>

        <h1>Login page</h1>
        </Grid>
        <Grid item>

    

 
        <TextField sx={{
            margin:1
        }} size="small" fullWidth id="outlinedbasic" label="Username" variant="outlined" />
        <TextField sx={{
            margin:1
        }} id="outlined-basic" 
           onKeyUp={timeNow}
           onKeyDownCapture={timeNow}
           
           type="password" size="small" fullWidth label="Password" variant="outlined" />
    

        
           </Grid>
        
        <Grid item  >
        <Stack spacing={2} direction={"row"}>

        <Button  variant="contained">Sign in</Button>
        <Button color='error' variant="contained">Sign up</Button>
        </Stack>


        </Grid>
    </Grid>
        </Container>
  )
}

export default Login