import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { navbarItems } from './constants/navbarItems';
import { useNavigate, useLocation } from 'react-router-dom';
import { QuestionContext } from '../App';


const navItems = navbarItems;

function Navbar({isDrawerOpen, setIsDrawerOpen}) {
    function goto(src, destination) {
        if (src == 'quiz' && questionNumber > 0) {
            handleOpen(destination)
            return;
        }
        changeQuestionNumber(0);
        navigate(destination);
        return;
    }
    let {questionNumber, changeQuestionNumber, handleOpen} = useContext(QuestionContext)
    const navigate = useNavigate();
    const location = useLocation();
    let path = location.pathname.split('/').slice(-1)[0];
    return (
        <Drawer
            anchor={'right'}
            open={isDrawerOpen}
            onClose={() => {setIsDrawerOpen(false)}}
        >
            <Box sx={{
                    width: '250px',
                    backgroundColor: 'var(--primary-color)',
                    height: '100%',
                    color: 'white',
                    paddingTop: '40px'
                }}>
                <List>
                    {navbarItems.map(item => {
                        return (
                            <ListItemButton
                                sx={{
                                    borderBottom: '1px solid var(--white)',
                                    backgroundColor: path == item.route ? 'rgba(255, 255, 255, 0.4) !important' : 'transparent'
                                }}
                                key={item.id}
                                onClick={() => {
                                    goto(path, item.route);
                                    setIsDrawerOpen(false);
                                }}>
                                <ListItemIcon >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText >
                                    <Typography variant='body1'>{item.label}</Typography>
                                </ListItemText>
                            </ListItemButton>
                        )
                    })}
                </List>
            </Box>
        </Drawer>
    )
}

export default Navbar;