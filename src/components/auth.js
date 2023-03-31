import { React, useCallback, useRef, useState } from "react";
import { EyeFill } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux'; 
import { userConnect } from '../store'

export default function Auth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const refPseudo = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);

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
          dispatch(userConnect({
            token: data.token,
            username: data.name,
            email: data.email,
            id: data.id,
          })) 
          navigate("/home", { replace: true })
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
          .then((data) => console.log(data));
      } else {
        setError("Les deux mots de passe ne sont pas identiques");
      }
    } else {
      setError("Vous devez remplir tous les champs");
    }
  };

  const toggleVisibility = useCallback(() => {
    setVisibility((current) => !current);
  }, []);

  const toggleRegister = useCallback(() => {
    setRegister((current) => !current);
  }, []);

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div>
        <h1>{register ? "Inscription" : "Connexion"}</h1>
        {register && (
          <div className="mb-3">
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard"/>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input id="standard-adornment-password" type={visibility ? 'text' : 'password'} endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={toggleVisibility}>
                  {visibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          </div>
          
        )}
        <div className="mb-3">
          <label className="form-label">Adresse mail</label>
          <input
            ref={refEmail}
            type="email"
            className="form-control"
            placeholder="name@example.com"
          />
        </div>
        <label className="form-label">Mot de passe</label>
        <div className="input-group mb-3">
          <input
            ref={refPassword}
            type={visibility ? "text" : "password"}
            id="inputPassword5"
            className="form-control"
            aria-labelledby="passwordHelpBlock"
          />
          <div className="input-group-append">
            <button onClick={toggleVisibility} className="btn btn-outline-dark">
              <EyeFill />
            </button>
          </div>
        </div>
        {register && (
          <div className="mb-3">
            <label className="form-label">Confirmation</label>
            <div className="input-group mb-3">
              <input
                ref={refConfirmPassword}
                type={visibility ? "text" : "password"}
                id="inputPassword5"
                className="form-control"
                aria-labelledby="passwordHelpBlock"
              />
              <div className="input-group-append">
                <button
                  onClick={toggleVisibility}
                  className="btn btn-outline-dark"
                >
                  <EyeFill />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="text-center">
          <button
            type="button"
            className="btn btn-dark"
            onClick={register ? signup : login}
          >
            {register ? "Inscription" : "Connexion"}
          </button>
        </div>
        <p>
          {register ? "Déjà un compte ? " : "Pas encore de compte ? "}
          <span
            className="text-decoration-underline"
            role="button"
            onClick={toggleRegister}
          >
            {register ? "Connectez-vous" : "Inscrivez-vous"}
          </span>
        </p>
        {error !== "" && <p className="text-danger">Erreur : {error}</p>}
      </div>
    </div>
  );
        }
