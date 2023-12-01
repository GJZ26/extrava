import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import RequestsContext from '../context/RequestContext';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext';

export default function Cart() {
    const requester = useContext(RequestsContext)
    const { userAuthProvider } = useContext(AuthContext);
    const [product, setProduct] = React.useState([])


    React.useEffect(() => {
        axios.get(requester.uri + "/cart/", { headers: { Authorization: `Bearer ${userAuthProvider.token}` } }).then((res) => {
            setProduct(res.data.content)
        }).catch((e) => {
            console.error(e)
            toast.error(e.response.data.message)
        })
    }, [])

    function deleteHandler(id, index) {
        axios.delete(requester.uri + "/cart/" + id, { headers: { Authorization: `Bearer ${userAuthProvider.token}` } }).then((res) => {

            let nuevoArray = [...product];
            if (id !== "") {
                nuevoArray.splice(index, 1);
            } else {
                nuevoArray = []
            }
            setProduct(nuevoArray);

            toast.success("Acción finalizada.")
        }).catch((e) => {
            console.error(e)
            toast.error(e.response.data.message)
        })
    }

    return (
        <>
            <Navbar />
            <Typography textAlign={'center'} variant='h3' pt={4}>
                Tu carrito de compras.
            </Typography>
            <Typography textAlign={'center'} variant='h6' pb={4}>
                Aquí se encuentra todo lo que quieras comprar.
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={5} alignItems={'center'}>

                {product.length > 0 ? product.map((item, index) => {
                    return (
                        <Card sx={{ maxWidth: 500 }} key={index}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={requester.uri + "/" + item.img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                                <Typography>
                                    ${item.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => { deleteHandler(item.id) }} size="medium" style={{ marginRight: 1 }} color='error'>Eliminar</Button>
                                <Button onClick={() => { deleteHandler(item.id) }} size="medium" style={{ marginRight: 10 }}>Comprar</Button>
                                <TextField
                                    label="Cantidad"
                                    type='number'
                                    size='small'
                                    defaultValue={1}
                                />
                            </CardActions>
                        </Card>
                    )
                }) : <Typography>No tienes nada en tu carrito.</Typography>}

                <Button variant='contained' onClick={() => { deleteHandler("") }} style={{ marginBottom: '20px' }}>Comprar todo</Button>
            </Box>
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
        </>
    );
}
