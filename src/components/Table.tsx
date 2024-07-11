import { Tooltip,IconButton, TableHead, TableContainer,TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';


type rows = {
    id: number,
    fname: string,
    lname: string,
    gender_short: string,
    gender: string,
    score: number,
}

export default function Table() {
    const columns=[
        {id:'id', name:'ID'},
        {id: "edit", name: 'Edit'},
        {id:'fname', name:'Firstname'},
        {id:'lname', name:'Lastname'},
        {id:'gender', name:'Gender'},
        {id:'score', name:'Score'}
    ]
    const [rows, rowchange] = useState<rows[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/Users')
        .then(res => {rowchange(res.data);})
        .catch(error => {console.error('Error Fetching data:', error);});
    }, [])

    return(
        <>
            <h1>MUI Table</h1>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        {columns.map((columns) => (
                            <TableCell key={columns.id}>{columns.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((d,i)=> (
                        <TableRow key={i}>
                            <TableCell>{d.id}</TableCell>
                            <Link to={`/edit/${d.id}`} >
                                <CreateIcon />
                            </Link>
                            <TableCell>{d.fname}</TableCell>
                            <TableCell>{d.lname}</TableCell>
                            <Tooltip title={d.gender} placement='right'>
                                <TableCell>
                                    {d.gender_short}
                                </TableCell>    
                            </Tooltip>
                            <TableCell>{d.score.toFixed(2)}</TableCell>
                        </TableRow>
                        )
                    )}
                </TableBody>
            </TableContainer>
        </>

    )
}