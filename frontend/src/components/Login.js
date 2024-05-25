import { useState } from "react";
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import StackOverflowLogo from "../Assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [state, setState] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success != null) {
      setState(true);
      window.scrollTo(0, 0);

      localStorage.setItem("username", json.username);

      if (json.userType === "admin") {
        setTimeout(() => {
          navigate("/adminHome");
          window.location.reload(true);
        }, 2000);
      }

      //stroing date information for profile section..
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
      localStorage.setItem("Usertype", json.userType);

      if (json.userType === "user") {
        setTimeout(() => {
          navigate("/");
          window.location.reload(true);
        }, 2000);
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // isLoggedin();
  }, [state]);

  return (
    <>
      {(() => {
        if (state === true) {
          return (
            <>
              <div
                class="alert alert-success alert-dismissible"
                role="alert"
                Style="background-color:green; color:white;"
              >
                You are <strong>Successfully</strong> logged in!!
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </>
          );
        }
      })()}

      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 0px 50px 190px",
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
          <Typography
            variant="h4"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Login
          </Typography>
          <Grid container spacing={2}>
            <form onSubmit={handleSubmit} method="post">
              <Grid item xs={12}>
                <TextField
                  type="email"
                  onChange={onChange}
                  name="email"
                  required
                  label="Email or username"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  onChange={onChange}
                  name="password"
                  required
                  label="Password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Login
              </Button>
              <Typography variant="body1" style={{ marginTop: "20px" }}>
                Don't have an account?{" "}
                <NavLink to="/register">Signup Now</NavLink>
              </Typography>
            </form>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default Login;
