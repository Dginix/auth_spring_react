import AccountCircle from "@mui/icons-material/AccountCircle";
import { MenuItem, Menu, IconButton, Typography, Toolbar, Box, AppBar, ListItemText, ListItemIcon, Button, Tooltip } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AuthService from "../services/AuthService";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from "react";

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser.authorities.find(e => e.authority === "ROLE_ADMIN")) {
            setShowAdminBoard(true)
        }
    }, []);

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

    const navigate = useNavigate();

    const handleProfile = () => {
        handleCloseUserMenu();
        navigate("/profile");
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        AuthService.logout()
        window.location.reload();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        Auth-spring-react
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
                            <Button component={RouterLink} to="/home" color="inherit">
                                Home
                            </Button>
                            <Button component={RouterLink} to="/user" color="inherit">
                                User Content
                            </Button>
                            {showAdminBoard &&
                                <Button component={RouterLink} to="/admin" color="inherit">
                                    Admin Content
                                </Button>
                            }
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
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
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button component={RouterLink} to="/home" color="inherit">
                            Home
                        </Button>
                        <Button component={RouterLink} to="/user" color="inherit">
                            User Content
                        </Button>
                        {showAdminBoard &&
                            <Button component={RouterLink} to="/admin" color="inherit">
                                Admin Content
                            </Button>
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Profile">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            id="menu-appbar"
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={handleProfile}>
                                <ListItemIcon>
                                    <ManageAccountsIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Profile
                                </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Logout
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
};

export default NavBar;


