import { Container, makeStyles, Typography, TextField, LinearProgress, 
    TableContainer, TableHead, Table, TableRow, TableCell, TableBody, } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { CoinList } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../context/Context.config';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "skyblue"
      }
    },
    search : {
        width : '100%',
        marginBottom : 10,
    },
    row:{
        cursor : "pointer",
        "&:hover":{
            backgroundColor : "#2d3138"
        }
    },
  }));


const CoinTable = () => {
    
    const {currency, symbol} = CryptoState();
    const [coinList, setCoinList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const [page, setPage] = useState(1)

    useEffect(() => {
    const CoinFetch = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));
        setCoinList(data);
        setLoading(false);
    }

        CoinFetch();
    }, [currency]);

    const filterHandler =
        coinList.filter((singleCoin) => {
            return singleCoin.name.includes(filterData) ||
            singleCoin.symbol.includes(filterData)
        })

    const navigate = useNavigate();

    const classes = useStyles();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Container style={{textAlign : "center"}}>
            <Typography style={{margin : 20}} variant= "h4">
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField className={classes.search} 
            label="Search for a Crypto Currency" 
            variant="outlined" 
            onChange={(e) => setFilterData(e.target.value)}
            />
            <TableContainer>
                {loading ? (
                    <LinearProgress style={{backgroundColor : "skyblue"}}/>
                ):(
                <Table>
                    <TableHead style={{backgroundColor: "skyblue", color: "black"}}>
                        <TableRow>
                            {["Coins","Price","24h Change","Market Cap"].map((head) => (
                                <TableCell style={{color: "black", fontWeight: 600}} key={head} align={head === 'Coins' ? "left" : "right"}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterHandler.slice((page -1) * 10,(page -1) *10 + 10 ).map((row) => {
                            const profit = row.price_change_percentage_24h > 0 ;
                            return(
                                <TableRow 
                                onClick={() => navigate(`/coin/${row.id}`)}
                                className={classes.row}
                                key={row.name}
                                >
                                <TableCell component="th" scope="row"
                                style={{ display : "flex", alignItems : "center", gap : 15}}>
                                        <img src={row?.image} alt={row.title} style={{width : "4rem"}}/>
                                        <div style={{display: "flex", flexDirection: "column", marginLeft : 20, fontSize:"0.8rem"}}>
                                            <span style={{textTransform: "uppercase", fontSize:"1.4rem"}}>{row.symbol}</span>
                                            <span style={{color:"darkgrey"}}>{row.name}</span>
                                        </div>
                                </TableCell>
                                <TableCell align="right">
                                    {symbol} {'  '}
                                    {numberWithCommas(row.current_price.toFixed(2))}
                                </TableCell>
                                <TableCell align="right" style={{color : profit > 0 ? "lightgreen" : "red", fontWeight : "600"}}>
                                    {profit && "+"}
                                    {row.price_change_percentage_24h.toFixed(2)}%
                                </TableCell>
                                <TableCell align="right">
                                    {symbol} {"  "}
                                    {numberWithCommas(row.market_cap.toString().slice(0, -4))}M
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            )
            }
            </TableContainer>
            <Pagination
            style={{padding : 20, display : "flex", justifyContent : "center", width : "100%"}}
            classes={{ ul: classes.ul }}
            count={100/10}
            onChange={(_, value) => {
                setPage(value);
                window.scroll(0,450);
            }}
            />
        </Container>
    )
}

export default CoinTable
