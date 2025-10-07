"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "@/contexts/auth";
import { getMenuIcon } from "./MenuIcon";
import { getAppBarButton } from "./AppBarButton";
import { AppBarContent } from "./AppBarContent";
import { DrawerFooter } from "./DrawerFooter";
import { usePathname } from "next/navigation";
import Link from "next/link";

const drawerWidth = 240;

const menuList = [
  { text: "Dashboard", route: "/dashboard" },
  { text: "Agenda", route: "/schedule" },
  { text: "Alunos", route: "/students" },
  { text: "Aulas", route: "/classes" },
  { text: "Disciplinas", route: "/subjects" },
  { text: "Financeiro", route: "/financial" },
  { text: "Configurações", route: "/settings" },
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const currentItem = React.useMemo(() => {
    return (
      menuList.find(
        (m) => pathname === m.route || pathname.startsWith(m.route + "/")
      ) ?? menuList[0]
    );
  }, [pathname]);

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SchoolIcon
            fontSize="large"
            sx={{
              color: "white",
              backgroundColor: "blue",
              borderRadius: "4px",
              p: 0.5,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: 1, fontWeight: 700, color: "inherit" }}
          >
            EduClass
            <Typography variant="caption" display="block">
              Gestão de Aulas
            </Typography>
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, overflowY: "auto" }}>
        {menuList.map((item) => {
          const selected =
            pathname === item.route || pathname.startsWith(item.route + "/");
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.route}
                selected={selected}
                onClick={() => {
                  if (isMobile) handleDrawerClose();
                }}
              >
                <ListItemIcon>{getMenuIcon(item.text)}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <DrawerFooter user={user} signOut={signOut} />
    </Box>
  );

  const appBarButton = getAppBarButton(currentItem.text);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor: "Menu",
          color: "MenuText",
        }}
      >
        <Toolbar sx={{ alignItems: "center", py: 1 }}>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {currentItem.text}
              </Typography>
            </Box>
            <AppBarContent activeMenu={currentItem.text} />
          </Box>

          {/* Evita mismatch mostrando nome só no client montado (opcional) */}
          {/* <Typography suppressHydrationWarning>Olá, {user?.name}</Typography> */}

          {appBarButton && (
            <Button
              variant="contained"
              color="primary"
              startIcon={appBarButton.icon}
              onClick={appBarButton.onClick}
              sx={{
                alignSelf: "center",
                ml: 2,
                flexShrink: 0,
                textTransform: "none",
              }}
            >
              {appBarButton.label}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawers (mobile/tablet vs desktop) */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{ root: { keepMounted: true } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          paddingTop: { xs: 4, lg: 2 },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
