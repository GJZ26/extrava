import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { AuthContext } from '../context/UserContext';
import RequestsContext from '../context/RequestContext';
import { useNavigate } from 'react-router-dom';


const pages = [ // cualquiera puede verlo
    ['Tienda', '/shop'],
];
const protected_pages = [['Carrito', '/cart'],]; // clientes

const private_pages = [['Clientes', '/clients'], ['Empleados', '/employees'],
['Productos', '/products'],
['Añadir usuario', '/join'],
['Membresias', '/memberships'],
]; // Administradores


const settings = [
    // ['Profile', '/profile'], 
    ['Logout', '/exit']];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { userAuthProvider, setAuthProvider } = React.useContext(AuthContext)
    const requester = React.useContext(RequestsContext)
    const navigate = useNavigate()


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function AvatarOrAccesLink() {
        if (userAuthProvider.auth) {
            return (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userAuthProvider.name} src={`${requester.uri + "/" + userAuthProvider.img}`} />
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{ mr: 1 }}>
                            {userAuthProvider.name}
                        </Typography>
                    </Box>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting, index) => (
                            <MenuItem key={index} onClick={() => {
                                handleCloseUserMenu()
                                navigate(setting[1])
                            }}>
                                <Typography textAlign="center">{setting[0]}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )
        } else {
            return (
                <>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            onClick={() => { navigate('/access') }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Ingresar
                        </Button>
                        <Button
                            onClick={() => { navigate('/join') }}
                            sx={{ my: 2, color: 'white', display: 'block', fontWeight: 800 }}
                        >
                            Únete
                        </Button>
                    </Box>
                </>
            )
        }
    }

    return (
        <AppBar position="static" sx={{ bgcolor: "#d90e0e" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 4,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        EXTRAVA
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={() => {
                                    handleCloseNavMenu()
                                    navigate(page[1])
                                }}>
                                    <Typography textAlign="center">{page[0]}</Typography>
                                </MenuItem>
                            ))}
                            {
                                userAuthProvider.role === 'client' ? protected_pages.map((page, index) => (
                                    <MenuItem key={index} onClick={() => {
                                        handleCloseNavMenu()
                                        navigate(page[1])
                                    }}>
                                        <Typography textAlign="center">{page[0]}</Typography>
                                    </MenuItem>
                                )) : <></>}
                            {
                                userAuthProvider.role === 'admin' ? private_pages.map((page, index) => (
                                    <MenuItem key={index} onClick={() => {
                                        handleCloseNavMenu()
                                        navigate(page[1])
                                    }}>
                                        <Typography textAlign="center">{page[0]}</Typography>
                                    </MenuItem>
                                )) : <></>}
                            {!userAuthProvider.auth ?
                                <>
                                    <MenuItem onClick={() => {
                                        handleCloseNavMenu()
                                        navigate('/access')
                                    }}>
                                        <Typography textAlign="center">Ingresar</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleCloseNavMenu()
                                        navigate('/join')
                                    }}>
                                        <Typography textAlign="center">Únete</Typography>
                                    </MenuItem>
                                </>
                                :
                                null
                            }
                        </Menu>
                    </Box>
                    <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        EXTRAVA
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    handleCloseNavMenu()
                                    navigate(page[1])
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page[0]}
                            </Button>
                        ))}
                        {userAuthProvider.role === 'client' ? protected_pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    handleCloseNavMenu()
                                    navigate(page[1])
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page[0]}
                            </Button>
                        )) : <></>}
                        {userAuthProvider.role === 'admin' ? private_pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    handleCloseNavMenu()
                                    navigate(page[1])
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page[0]}
                            </Button>
                        )) : <></>}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {AvatarOrAccesLink()}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;