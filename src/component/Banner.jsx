import { Container, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Corusel from './Corusel';

const useStyles = makeStyles({
    banner:{
        backgroundImage : `linear-gradient(#00000090, #000000a7),url(https://miro.medium.com/max/3840/1*etDJsZIWf76sb1P_l6ZW3w.gif)`,
        backgroundRepeat : "no-repeat",
        backgroundSize : "cover",
        backgroundPosition:"top"
    },
    bannerContent:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: 450,
    },
    tagline:{
        display : "flex",
        alignItems : "center",
        justifyContent: "center",
        height: "40%",
        flexDirection:"column"
    }
})

const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant="h2" style={{
                        fontWeight: 800,
                        fontFamily: 'Montserrat, sans-serif',
                        marginBottom : 15,
                    }}>
                        Crypto Tracker
                    </Typography>
                    <Typography variant="subtitle1" style={{
                        textTransform: "capitalize",
                        color: "darkgrey",
                        fontFamily: 'Montserrat, sans-serif',
                    }}>
                        Get all the info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Corusel/>
            </Container>
        </div>
    )
}

export default Banner
