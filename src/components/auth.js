import { React, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { userConnect } from "../store";

export default function Auth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [visibilityConfirmPassword, setVisibilityConfirmPassword] =
    useState(false);

  const refPseudo = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);

  const toggleVisibilityPassword = useCallback(() => {
    setVisibilityPassword((current) => !current);
  }, []);

  const toggleVisibilityConfirmPassword = useCallback(() => {
    setVisibilityConfirmPassword((current) => !current);
  }, []);

  const toggleRegister = useCallback(() => {
    setRegister((current) => !current);
  }, []);

  const login = () => {
    if (refEmail.current.value !== "" && refPassword.current.value !== "") {
      const url = "http://localhost:3001/login";

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: refEmail.current.value,
          password: refPassword.current.value,
        }),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          dispatch(
            userConnect({
              token: data.token,
              username: data.name,
              email: data.email,
              id: data.id,
            })
          );
          navigate("/home", { replace: true });
        });
    } else {
      setError("Vous devez remplir les deux champs");
    }
  };

  const signup = () => {
    if (
      refPseudo.current.value !== "" &&
      refEmail.current.value !== "" &&
      refPassword.current.value !== "" &&
      refConfirmPassword.current.value !== ""
    ) {
      if (refPassword.current.value === refConfirmPassword.current.value) {
        console.log(refPassword.current.value);
        console.log(refConfirmPassword.current.value);
        const url = "http://localhost:3001/user";

        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: refPseudo.current.value,
            email: refEmail.current.value,
            password: refPassword.current.value,
          }),
        };
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then(() => login());
      } else {
        setError("Les deux mots de passe ne sont pas identiques");
      }
    } else {
      setError("Vous devez remplir tous les champs");
    }
  };

  return (
      <Stack
        direction="column"
        spacing={2}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          zIndex: 1,
          backgroundColor: "white",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
          width: "80%",
          maxWidth: "400px",
          p: 4,
          borderRadius: 8,
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <h1 style={{color: "black"}}>{register ? "Inscription" : "Connexion"}</h1>
          {register && (
            <TextField
              id="standard-basic"
              label="Pseudo"
              variant="standard"
              inputRef={refPseudo}
            />
          )}
          <TextField
            id="standard-basic"
            label="Adresse mail"
            variant="standard"
            inputRef={refEmail}
          />
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Mot de passe
            </InputLabel>
            <Input
              inputRef={refPassword}
              id="standard-adornment-password"
              type={visibilityPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleVisibilityPassword}
                  >
                    {visibilityPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {register && (
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirmation
              </InputLabel>
              <Input
                inputRef={refConfirmPassword}
                id="standard-adornment-password"
                type={visibilityConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleVisibilityConfirmPassword}
                    >
                      {visibilityConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
          <Button style={{ backgroundColor: "#5b5b5b"}} variant="contained" onClick={register ? signup : login}>
            {register ? "Inscription" : "Connexion"}
          </Button>

          <div style={{ textAlign: "center" }}>
            {register ? (
              <p style={{color: "black"}}>
                Déjà un compte ?{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={toggleRegister}
                >
                  Connectez-vous
                </span>
              </p>
            ) : (
              <p style={{color: "black"}}>
                Pas encore de compte ?{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={toggleRegister}
                >
                  Inscrivez-vous
                </span>
              </p>
            )}
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
        </Box>
      </Stack>
  );
}
