import * as React from "react";
import UserMenuDrawer from "./UserMenuDrawer"
import { AppBar, Box, Toolbar, Typography, } from "@mui/material"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { TrendingUp } from "@mui/icons-material";
import { routes } from "../routes";

const Layout = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const handleNavigation = (path: string) => {
        if(location.pathname === path) {
            return;
        }

        navigate(path)
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TrendingUp sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <IconButton onClick={() => handleNavigation("/")} color="inherit">
            <Typography
                variant="h4"
                noWrap
                sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                PoggersLoggers
            </Typography>

          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {routes.map((route) => (
                <MenuItem key={route.name} onClick={() => handleNavigation(route.url)}>
                  <Typography sx={{ textAlign: "center" }}>{route.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <TrendingUp sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <IconButton onClick={() => handleNavigation("/")} color="inherit">
            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                PoggersLoggers
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes.map((route) => (
              <Button
                key={route.name}
                onClick={() => handleNavigation(route.url)}
                sx={{ my: 2, color: "white", fontWeight: 700, display: "block" }}
              >
                {route.name}
              </Button>
            ))}
          </Box>

          <UserMenuDrawer />
          
        </Toolbar>
      </Container>
    </AppBar>
        </Box>
        
        {/* Content */}
        <Box display="flex" justifyContent="center">
            <Outlet />
        </Box>
    </>
    );
  };
  
  export default Layout;