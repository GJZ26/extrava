import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Collapse, IconButton, InputAdornment } from '@mui/material';
import { styled } from "@mui/system";
import axios from 'axios'
import RequestsContext from '../context/RequestContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import Navbar from '../components/Navbar';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Edit() {

    const [showPassword, setShowPassword] = React.useState(false)
    const [showMessage, setShowMessage] = React.useState(false)
    const [showBtn, setShowBtn] = React.useState(false)
    const [alertType, setAlertType] = React.useState('success')
    const [alertMessage, setAlertMessage] = React.useState('Hello')
    const { userAuthProvider, setAuthProvider } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const defaults = {

    }

    const [defData, setDefData] = React.useState(defaults)
    const requester = React.useContext(RequestsContext)
    const path_params = useParams()

    console.log(path_params)

    React.useEffect(() => {
        axios.get(requester.uri + '/user/pk/' + path_params.id, { headers: { Authorization: `Bearer ${userAuthProvider.token}` } }).then(
            (res) => {
                setDefData(res.data.content)
            }
        ).catch((e) => {
            setAlertType("error")
            setShowBtn(true)
            setAlertMessage("Usuario no encontrado.")
            setTimeout(() => {
                navigate("/")
            }, 1000)

        })
    }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // setShowBtn(true)
        const data_to_save = {
            name: data.get("name") || defData.name,
            lastname: data.get("lastname") || defData.lastname,
            weight: data.get("weight") || defData.weight,
            age: data.get("age") || defData.age,
            password: data.get("password") || null,
        }
        axios.put(requester.uri + "/user/" + path_params.id, data_to_save, { headers: { Authorization: `Bearer ${userAuthProvider.token}` } }).then((res) => {
            setAlertMessage("Usuario actualizado con éxito.")
            setAlertType('success')
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
            <Navbar />
            <Grid container component="main" sx={{ height: '100vh', flexDirection: 'row-reverse' }}>
                <CssBaseline />
                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
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
                            Editar Información.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 800 }}>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="firstName"
                                        defaultValue={defData.name}
                                        label="Nombre(s)"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        defaultValue={defData.lastname}
                                        id="lastName"
                                        label="Apellidos"
                                        name="lastname"
                                        autoComplete="family-name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        defaultValue={defData.weight}
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
                                        defaultValue={defData.age}
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
                                        defaultValue={defData.email}
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
                                        label="Nueva Contraseña"
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
                                sx={{ mt: 5, mb: 1, bgcolor: "#d90e0e" }}
                                disabled={showBtn}
                            >
                                Editar
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2, color: "#d90e0e", borderColor: "#d90e0e" }}
                                disabled={showBtn}
                                onClick={() => { navigate('/clients') }}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}