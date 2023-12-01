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
import SideImage from '../assets/gym.jpeg'
import axios from 'axios';
import RequestsContext from '../context/RequestContext';
import { Alert, Collapse } from '@mui/material';
import { AuthContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Integrador © '}
            <Link color="inherit" href="/">
                ExtravaGym
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

    const [showMessage, setShowMessage] = React.useState(false)
    const [showBtn, setShowBtn] = React.useState(false)
    const [alertType, setAlertType] = React.useState('success')
    const [alertMessage, setAlertMessage] = React.useState('Hello')
    const requester = React.useContext(RequestsContext)
    const { userAuthProvider, setAuthProvider } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setShowBtn(true)

        axios.post(requester.uri + "/user/login", { email: data.get("email"), password: data.get("password") }).then((res) => {
            navigate('/')
            setAuthProvider(res.data.content)
            setAlertMessage(res.data.message)
            setAlertType('success')
        }).catch((e) => {
            console.log(e)
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

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
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
                            py: 8,
                            px: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh'
                        }}
                    >
                        <Typography component="h1" variant="h4">
                            Inicio de Sesión
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo Electrónico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Collapse in={showMessage}>
                                <Alert severity={alertType} sx={{ mt: 3 }}>{alertMessage}</Alert>
                            </Collapse>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: "#d90e0e" }}
                                disabled={showBtn}
                            >
                                Ingresar
                            </Button>
                            <Grid container justifyContent={"space-between"}>
                                <Grid item>
                                    <Link href="/" variant="body2" sx={{ color: '#d90e0e' }}>
                                        {"Volver."}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/join" variant="body2" sx={{ color: '#d90e0e' }}>
                                        {"¿Aun no eres miembro? Únete."}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}