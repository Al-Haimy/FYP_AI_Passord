
import { Container, Card, CardContent, Grid, Typography, Button } from '@mui/material'
import React from 'react'

const styled = {
    maxWidth: 550,
    padding:"20px 5px",
    margin: "20px auto"
}


const NotFound = () => {


    


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
                                This Page is not existed
                            </Typography>
                        </Grid>



                        <Grid
                            item
                            xs={11}>
                            <Typography variant="h2" gutterBottom>
                                404
                            </Typography>
                        </Grid>


                        <Grid item xs={7}>
                            <Button fullWidth href='/login' variant='contained' color='primary'>Login</Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

export default NotFound