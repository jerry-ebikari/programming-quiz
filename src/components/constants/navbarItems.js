import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import QuizIcon from '@mui/icons-material/Quiz';

export const navbarItems = [
    {
        id: 0,
        icon: <HomeIcon sx={{color: 'white'}} />,
        iconActive: <HomeIcon color='primary' />,
        label: 'Home',
        route: ''
    },
    {
        id: 1,
        icon: <QuizIcon sx={{color: 'white'}} />,
        iconActive: <QuizIcon color='primary' />,
        label: 'Quiz',
        route: 'quiz'
    },
    {
        id: 2,
        icon: <SettingsIcon sx={{color: 'white'}} />,
        iconActive: <SettingsIcon color='primary' />,
        label: 'Settings',
        route: 'settings'
    },
]