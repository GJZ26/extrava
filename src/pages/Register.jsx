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
import { Alert, Collapse, IconButton, InputAdornment } from '@mui/material';
import { styled } from "@mui/system";
import axios from 'axios'
import RequestsContext from '../context/RequestContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {

    const [showPassword, setShowPassword] = React.useState(false)
    const [showMessage, setShowMessage] = React.useState(false)
    const [showBtn, setShowBtn] = React.useState(false)
    const [alertType, setAlertType] = React.useState('success')
    const [alertMessage, setAlertMessage] = React.useState('Hello')
    const { userAuthProvider, setAuthProvider } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const requester = React.useContext(RequestsContext)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setShowBtn(true)

        axios.post(requester.uri + "/user/register", data).then((res) => {
            setAlertMessage("Usuario creado con éxito.")
            setAlertType('success')
            setTimeout(() => {
                navigate('/')
                setAuthProvider(res.data.content)
            }, 3500)
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
            <Grid container component="main" sx={{ height: '100vh', flexDirection: 'row-reverse' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${SideImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
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
                            Regístrate.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <CustomButton
                                variant="outlined"
                                component="label"
                                sx={{
                                    mb: 3
                                }}
                            >
                                Sube tu foto
                                <input
                                    accept="image/*"
                                    type="file"
                                    capture="camera"
                                    hidden
                                    name='image'
                                />
                            </CustomButton>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Nombre(s)"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Apellidos"
                                        name="lastname"
                                        autoComplete="family-name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        end
                                        name="weight"
                                        required
                                        fullWidth
                                        id="peso"
                                        label="Peso"
                                        type='number'
                                        InputProps={{ inputProps: { min: 10 }, endAdornment: <InputAdornment position='end'>kg</InputAdornment> }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        end
                                        required
                                        fullWidth
                                        id="altura"
                                        label="Edad"
                                        name="age"
                                        type='number'
                                        InputProps={{ inputProps: { min: 10 }, endAdornment: <InputAdornment position='end'>años</InputAdornment> }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Correo Electrónico"
                                        name="email"
                                        autoComplete="email"
                                        type='email'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Contraseña"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }}
                                    />
                                </Grid>
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
                                Inscribirse
                            </Button>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Link href="/" variant="body2" sx={{ color: '#d90e0e' }}>
                                        Volver
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/access" variant="body2" sx={{ color: '#d90e0e' }}>
                                        ¿Ya eres miembro? Inicia sesión aquí.
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}