import React, {useState, useEffect} from "react";
import { CircularProgress, makeStyles } from '@material-ui/core';
import { HistoricalChart } from '../config/api';
import axios from "axios";
import { CryptoState } from '../context/Context.config';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { buttons } from "./Buttons";
import SingleBtn from "./SingleBtn";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



const useStyles = makeStyles((theme) => ({
    chartComp:{
        marginTop : 20,
        padding : 20,
        display: "flex",
        flexDirection : "column",
        justifyContent : "center",
        width : "100%",
        alignItems : "center",
        [theme.breakpoints.down("md")]: {
            marginTop : 0,
            padding : 10,
            width : "100%",
        },
    },
}));

const CoinInfo = ({coin}) => {
    const [historyData, setHistoryData] = useState();
    const [days, setDays] = useState(1);

    const { currency } = CryptoState(); 

    useEffect(() => {
    const historyFetch = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency ));
        setHistoryData(data.prices);
    }

        historyFetch();
    }, [currency, days, coin.id]);

    const classes = useStyles();
    return(
        <div className={classes.chartComp}>
            {!historyData ? (<CircularProgress 
            style={{color : "skyblue"}}
            size={200}
            thickness={1}/>):(
            <>
            <Line
            data={{
                labels: historyData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12
                    ? `${date.getHours() -12} : ${date.getMinutes()}PM`
                    : `${date.getHours()} : ${date.getMinutes()}AM`;
         
                return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets : [
                    {
                    data: historyData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "skyblue",
                    }
                ],
            }}
            options ={{
                elements : {
                    point:{
                        radius: 1,
                    }
                }
            }}
            />
            <div style={{display:"flex", justifyContent:"space-around", width: "100%", marginTop:20}}>{buttons.map((button) => (
                <SingleBtn 
                onClick={() => setDays(button.value)}
                selected={button.value === days}
                key={button.value}
                >{button.name}</SingleBtn>
            ))}</div>
            </>)
            }
        </div>
    );
}

export default CoinInfo;