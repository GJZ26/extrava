import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Navbar from '../components/Navbar';
import { styled } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';
import RequestsContext from '../context/RequestContext';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../context/UserContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
function TablePaginationActions(props) {

    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, lastname, email, valid) {
    return { name, lastname, email, valid };
}


export default function EmployeesList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { userAuthProvider } = React.useContext(AuthContext);
    const requester = React.useContext(RequestsContext)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        axios.get(requester.uri + "/user/admin", { headers: { Authorization: `Bearer ${userAuthProvider.token}` } }).then((res) => {
            setData(res.data.content)
        }).catch((e) => {
            console.error(e)
            alert(e.response.data.message)
        })
    }, [])

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Navbar />
            <Container maxWidth="sm" style={{ marginTop: 20 }}>
                <Typography
                    component="h1"
                    variant="h3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    marginBottom={0}
                    marginTop={4}
                >
                    Empleados
                </Typography>
                <Typography marginTop={0} marginBottom={5} component={'p'} variant="h5" align="center" color="text.secondary" paragraph>
                    Gestiona tus empleados desde esta sección.
                </Typography>
            </Container>
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <TableContainer component={Paper} style={{ minWidth: 500, maxWidth: 1150, width: 'fit-content' }}>
                    <Table sx={{ minWidth: 500, maxWidth: 1150, width: 'fit-content' }} aria-label="custom pagination table">
                        <TableBody sx={{ minWidth: 500, maxWidth: 1150 }}>
                            <TableRow sx={{ minWidth: 500, maxWidth: 1150 }}>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell align="left">Apellido</StyledTableCell>
                                <StyledTableCell align="left">Correo</StyledTableCell>
                                <StyledTableCell align="left">Válido hasta</StyledTableCell>
                                <StyledTableCell align="left">Acciones</StyledTableCell>
                            </TableRow>
                            {(rowsPerPage > 0
                                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : data
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="left">
                                        {row.lastname}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="left">
                                        {row.email}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="left">
                                        {row.active_until ? row.active_until : "Sin dato"}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="left">
                                        <Button><DeleteIcon /></Button>
                                        <Button><EditIcon /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
}