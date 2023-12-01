import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import axios from 'axios';
import RequestsContext from '../context/RequestContext';
import { AuthContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Shop() {
    const [product, setProduct] = React.useState([])
    const requester = React.useContext(RequestsContext)
    const { userAuthProvider, setAuthProvider } = React.useContext(AuthContext)
    const navigate = useNavigate()

    React.useEffect(() => {
        axios.get(requester.uri + "/product/").then((res) => {
            console.log(res.data.content)
            setProduct(res.data.content)
        }).catch((e) => {
        })
    }, [])

    function cartHandler(product_id) {
        if (!userAuthProvider.auth) {
            navigate('/access')
            return;
        }
        if(userAuthProvider.role !== 'client'){
            toast.warn("Esta funcionalidad no está disponible para ti.")
            return
        }
        axios.post(requester.uri + "/cart/", {
            amount: 1,
            product: product_id
        },
            {
                headers: { Authorization: `Bearer ${userAuthProvider.token}` }
            }).then((res) => {
                toast.success("Producto añadido al carrito.", { theme: 'colored' })
            }).catch((e) => {
                console.error(e)
                toast.error(e.response.data.message, { theme: 'colored' })
            })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Navbar />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Productos
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Adquiere los mejores productos en <strong>Extrava</strong>, siempre al mejor precio y lo que siempre buscas.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {product.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                            backgroundSize: 'contain'
                                        }}
                                        image={requester.uri + "/" + card.img}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                        <Typography>
                                            {"$" + card.price.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant='outlined' endIcon={<ShoppingCartIcon />} onClick={() => {
                                            cartHandler(card.id)
                                        }}>Añadir a carrrito</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
        </ThemeProvider>
    );
}