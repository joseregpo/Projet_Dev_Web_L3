import { React, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Logout from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { userDisconnect } from "../store";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  const mail = useRef(null);
  const password = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const match = () => {};

  const logout = () => {
    const url = "http://localhost:3001/logout";

    const requestOptions = {
      method: "POST",
      headers: { "WWW-Authenticate": user.token },
    };
    fetch(url, requestOptions).then((data) => {
      dispatch(userDisconnect());
      navigate("/auth");
    });
  };

  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const handleOpenDialog = () => {
    setDeleteAccountOpen(true);
    handleClose();
  };

  const handleCloseDialog = () => {
    setDeleteAccountOpen(false);
  };

  const deleteAccount = () => {
    if (mail !== null && mail !== "" && password !== null && password !== "") {
      var pass = password.current.value
      var email = mail.current.value
      const url = `http://localhost:3001/users/unsubscribe/${email}/${pass}`;
      const requestOptions = {
        headers: { "WWW-Authenticate": user.token },
      };
      fetch(url, requestOptions).then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      });
    } else {
      setError("Vous devez remplir les champs")
    }
  };

  const cards = () => {
    // navigate("/champions")
  };

  return (
    <>
      {user.token === "" ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: "#1C1C1C" }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                League Of Stones
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: "#1C1C1C" }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                League of Stones
                <Button
                  size="large"
                  color="inherit"
                  style={{ marginLeft: "60px" }}
                  onClick={cards}
                >
                  Cards
                </Button>
                <Button
                  size="large"
                  color="inherit"
                  style={{ marginLeft: "10px" }}
                  onClick={match}
                >
                  Faire un match
                </Button>
              </Typography>
              <Button size="large" color="inherit" onClick={handleClick}>
                {user.username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Deconnexion
                </MenuItem>
                <MenuItem onClick={() => handleOpenDialog()}>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  Supprimer le compte
                </MenuItem>
              </Menu>
              <Dialog open={deleteAccountOpen} onClose={handleCloseDialog}>
                <DialogTitle>Supprimer votre compte</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Attention cette action est irréversible ! Réfléchissez
                    bien....
                  </DialogContentText>
                  <TextField
                    autoFocus
                    inputRef={mail}
                    margin="dense"
                    id="name"
                    label="Adresse mail"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    inputRef={password}
                    margin="dense"
                    id="name"
                    label="Mot de passe"
                    type="password"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Annuler</Button>
                  <Button color="error" onClick={deleteAccount}>
                    Supprimer
                  </Button>
                  { error && <p>la{error}</p>}
                </DialogActions>
              </Dialog>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}
