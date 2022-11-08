import { Button, Card, CardContent,Container, Grid, Typography } from '@mui/material'
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import type { Dispatch, State } from '../Auth/AuthProvider'

const Priavte = ({ handler }: { handler: Dispatch }) => {
  const [fullName, setFullName] = useState<string | null>(null);



  const token = localStorage.getItem('auth');
  const getInfofromApi = () => {
    axios.get('http://localhost:8000/api/user/?format=json', {
      headers:{
      'Authorization': `Bearer ${token}`,
}})
    .then(function (response) {
      

      setFullName(response.data['name'])

          
      
    })
    .catch(function (error) {
      toast.error('something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

    });

  

  }

  useEffect(() => {
    
    return () => {
      getInfofromApi()
    }
  }, [])
  
  const styled = {
    maxWidth: 550,


    padding: "20px 5px",
    margin: "20px auto"
  }


  return (
    <Container maxWidth="lg">

      <Card style={styled}>
        <CardContent>
          <Grid
            container
            justifyContent={'center'}
            alignItems='center'>
              <Grid
              item 
              xs={11}>
                    <Typography variant="h5" gutterBottom>
Welcome 
                </Typography>
              </Grid>

              {fullName && (

              <Grid
              item 
              xs={11}>
                    <Typography variant="h4" gutterBottom>
       {fullName}
                </Typography>
              </Grid>
              )}

              <Grid item xs={7}>
                <Button fullWidth variant='outlined' color='error' onClick={() => handler('LOGOUT')}>log out</Button>
              </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Priavte