import { makeStyles } from '@material-ui/styles'
import React from 'react'

const SingleBtn = ({children, onClick, selected}) => {

    const useStyles = makeStyles({
        btn:{
            border: `1px solid ${selected ? "transparent" : "#fff"}`,
            padding : "0.4rem 1.4rem" ,
            cursor : "pointer",
            backgroundColor : selected ? "skyblue" : "transparent",
            color : selected ? "black" : "white",
            fontWeight : selected ? "500" : "normal",
            "&:hover" : {
                backgroundColor : "skyblue",
                color : "black",
                fontWeight : "500"
            }
        }
    });

    const classes = useStyles();
    return (
        <span onClick={onClick} className={classes.btn}>
            {children}
        </span>
    )
}

export default SingleBtn
