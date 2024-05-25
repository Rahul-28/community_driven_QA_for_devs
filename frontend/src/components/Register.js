import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import StackOverflowLogo from "../Assets/logo.png";

function Register() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [state, setState] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      setState(true);
      localStorage.setItem("username", json.username);

      // Storing date information for profile section..
      const month = new Map();
      month["01"] = "Jan";
      month["02"] = "Feb";
      month["03"] = "Mar";
      month["04"] = "Apr";
      month["05"] = "May";
      month["06"] = "June";
      month["07"] = "July";
      month["08"] = "Aug";
      month["09"] = "Sep";
      month["10"] = "Oct";
      month["11"] = "Nov";
      month["12"] = "Dec";

      const year = json.date.substring(0, 4);
      const mn = json.date.substring(5, 7);

      localStorage.setItem("since", month[mn] + " " + year);

      setTimeout(() => {
        navigate("/");
        window.location.reload(true);
      }, 2000);
    } else {
      alert(json.error);
    }
  };

  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 0px 50px 120px",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "100px",
          alignItems: "center",
          background: "#F7B679",
        }}
      >
        <Grid>
          {/* <img
            src={StackOverflowLogo}
            alt="Stack Overflow Logo"
            style={{ width: "190px", height: "40px", alignItems: "center" }}
          /> */}
        </Grid>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Create an account
        </Typography>
        <Paper
          style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}
          elevation={3}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="name"
                  onChange={onChange}
                  required
                  label="Display Name"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  name="email"
                  onChange={onChange}
                  required
                  label="Email"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  onChange={onChange}
                  required
                  label="Password"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create account
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Typography
          variant="body1"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </Typography>
        {state && (
          <div
            className="alert alert-success"
            role="alert"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            You are <strong>Successfully</strong> Registered!!
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Register;
