import { LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../context/Context.config';
import ReactHtmlParser from 'react-html-parser';
import CoinInfo from '../component/CoinInfo';


const Coins = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();
    const [open, setOpen] = useState(true);

    useEffect(() => {
    const coinFetch = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    }
        coinFetch();
    },[id]);

    const useStyles = makeStyles((theme) =>({
        container:{
            display: "flex",
            [theme.breakpoints.down("md")] :{
                flexDirection : "column",
                alignItems : "center",
            }
        },
        sidebar:{
            width : "30%",
            marginTop : 25,
            display: "flex",
            flexDirection : "column",
            alignItems : "center",
            borderRight : "1px solid grey",
            padding : "1rem",
            [theme.breakpoints.down("md")] :{
                width: "100%",
            }
        },
        name :{
            fontWeight: "800",
            fontSize : "2.8rem",
            marginBottom : 20
        },
        show:{
            backgroundColor : "transparent",
            cursor : "pointer",
            color : "skyblue",
            border: "none",
            "&:hover":{
                color :"#1f5369", 
            }
        },
        disc:{
            paddingBottom : 20
        },
        info:{
            width: "100%",
            [theme.breakpoints.down("md")] :{
                display: "flex",
                justifyContent : "space-between",
                width : "80%",
            },
            [theme.breakpoints.down("sm")] :{
                flexDirection : "column",
                justifyContent : "center",
                alignItems : "center"
            },
            [theme.breakpoints.down("xs")] :{
                alignItems : "start",
                width : "100%"
            }
        },
        graph:{
            width : "75%",
            [theme.breakpoints.down("md")]: {
                width : "90%",
            },
            [theme.breakpoints.down("sm")]: {
                width : "90%",
            },            [theme.breakpoints.down("xs")]: {
                width : "100%",
            }
        }
    }));
    const classes = useStyles();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if(!coin) return <LinearProgress style={{backgroundColor : "skyblue"}}/>

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img src={coin?.image.large} alt={coin?.name}
                height="180"
                style={{marginBottom : 20}}
                />
            <Typography className={classes.name}>
                {coin?.name}
            </Typography>
                <Typography variant="subtitle1" className={classes.disc} >
                    {open ? ReactHtmlParser(coin?.description.en.substring(0,200-12)) + ".." : ReactHtmlParser(coin?.description.en)}
                    <button className={classes.show}
                    onClick={() => setOpen(!open)}
                    >
                    {open ? "show more" : "show less"}
                    </button>
                </Typography>
            <span className={classes.info}>
                <Typography variant="h5">
                    <span style={{fontWeight: "bold"}}>Rank :</span> {coin?.market_cap_rank}
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5">
                    <span style={{fontWeight: "bold"}}>Current Price :</span> {symbol}{" "}
                    {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5">
                    <span style={{fontWeight: "bold"}}>Current Price :</span> {symbol}{" "}
                    {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -5))}M
                </Typography>
            </span>
            </div>
            <div className={classes.graph}>
                <CoinInfo coin ={coin}/></div>
        </div>
    )
}

export default Coins
