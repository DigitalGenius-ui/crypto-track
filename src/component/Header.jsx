import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../context/Context.config';

const useStyle = makeStyles({
    title : {
        color: "skyblue",
        fontWeight : 800,
        flex : 1,
        cursor: "pointer",
    }
});


const Header = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    const {setCurrency, currency} = CryptoState();
    return (
        <>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" className={classes.title} onClick={() => {navigate("/")}}>
                        Crypto Tracker
                    </Typography>
                        <Select variant="outlined" style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                        </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    )
}

export default Header
