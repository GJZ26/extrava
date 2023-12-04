import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideImage from '../assets/gym2.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Checkbox, Collapse, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from "@mui/system";
import axios from 'axios'
import RequestsContext from '../context/RequestContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import Navbar from '../components/Navbar';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Memberships() {

    const [showMessage, setShowMessage] = React.useState(false)
    const [showBtn, setShowBtn] = React.useState(false)
    const [alertType, setAlertType] = React.useState('success')
    const [alertMessage, setAlertMessage] = React.useState('Hello')

    const requester = React.useContext(RequestsContext)
    const { userAuthProvider } = React.useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: email,
            amount: amount,
            time: age,
            price: price,
            add_to_cart: toCart
        };

        setShowBtn(true)

        axios.post(requester.uri + "/user/pay", data, { headers: { Authorization: `Bearer ${userAuthProvider.token}` } }).then((res) => {
            setAlertMessage("Membresía actualizada.")
            setAlertType('success')
            // setTimeout(() => {
            //     navigate('/')
            //     setAuthProvider(res.data.content)
            // }, 3500)
        }).catch((e) => {
            setAlertMessage(e.response.data.message)
            setAlertType('error')
        }).finally(() => {
            setShowMessage(true)
            setShowBtn(false)
            setTimeout(() => {
                setShowMessage(false)
            }, 3000)
        })
    };

    const [age, setAge] = React.useState('');
    const [toCart, seToCart] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const CustomButton = styled(Button)({
        width: '100%',
        borderColor: '#d90e0e',
        color: '#d90e0e',
        '&:focus, &:active, &:hover': {
            borderColor: '#d90e0e',
            color: '#d90e0e',
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <Grid container component="main" sx={{ height: '100vh', flexDirection: 'row-reverse' }}>
                <CssBaseline />
                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square px={40}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 3,
                            px: 15
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Renueva la membresía de tus clientes.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>





                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Correo del cliente."
                                        name="email"
                                        autoComplete="email"
                                        type='email'
                                        onChange={(e) => { setEmail(e.currentTarget.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id="demo-simple-select-label">Lapsos</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Lapsos"
                                        name='time'
                                        onChange={handleChange}
                                        fullWidth
                                    >

                                        <MenuItem value={'Dia'}>Día</MenuItem>
                                        <MenuItem value={'Mes'}>Mes</MenuItem>
                                        <MenuItem value={"Año"}>Año</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="amount"
                                        label="Cantidad"
                                        name="amount"
                                        autoComplete="amount"
                                        type='number'
                                        onChange={(e) => { setAmount(e.currentTarget.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="amount"
                                        label="Precio"
                                        name="amount"
                                        autoComplete="amount"
                                        type='number'
                                        onChange={(e) => { setPrice(e.currentTarget.value) }}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <FormControlLabel control={<Checkbox onChange={(e) => { seToCart(e.currentTarget.checked) }} />} label="Añadir a carrito." />
                                </Grid> */}
                            </Grid>
                            <Collapse in={showMessage}>
                                <Alert severity={alertType} sx={{ mt: 3 }}>{alertMessage}</Alert>
                            </Collapse>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 5, mb: 2, bgcolor: "#d90e0e" }}
                                disabled={showBtn}
                            >
                                Finalizar
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}