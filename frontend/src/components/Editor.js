import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const config = {
  buttons: [
    "bold",
    "italic",
    "link",
    "unlink",
    "ul",
    "ol",
    "underline",
    "image",
    "font",
    "fontsize",
    "brush",
    "redo",
    "undo",
    "eraser",
    "table",
  ],
};

export default function Editor(props) {
  const editor = useRef(null);
  const [value, setValue] = useState("");
  const [html, setHtml] = useState("");
  const [state, setState] = useState(false);
  const [credentials, setCredentials] = useState({ title: "", tags: "" });

  const getValue = (value) => {
    setValue(value);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/question/addquestion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: credentials.title,
          question: value,
          tags: credentials.tags,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (json["status"] === true) {
      setState(true);
      window.scrollTo(0, 0);
    }
    setHtml(parse(value));
    // console.log(json["desc"]);
  };

  return (
    <div Style="background-color:#f8f9f9; height:100%;  z-index:1;">
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={state}
        autoHideDuration={6000}
        onClose={() => setState(false)}
        message="Your Query is Posted Successfully"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setState(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert
          onClose={() => setState(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your Query is Posted <strong>Successfully</strong>
        </Alert>
      </Snackbar>

      <div
        className="container mb-5"
        Style="width:70%; display:block; margin:auto;"
      >
        <Card className="mt-5" sx={{ backgroundColor: "hsl(206,100%,97%)" }}>
          <CardHeader
            title={
              <Typography variant="h5">
                <b>Ask a Public Question</b>
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="h6">Writing a Good Question</Typography>
            <Typography variant="body1">
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </Typography>
            <Typography variant="h6">Steps</Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Summarize your problem in a one-line title.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Describe your problem in more detail.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Describe what you tried and what you expected to happen.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Add “tags” which help surface your question to members of the
                  community.
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} method="post">
          <Card className="mb-3 mt-5">
            <CardContent>
              <div className="form-group">
                <Typography variant="h6" htmlFor="exampleInputEmail1">
                  Title
                </Typography>
                <TextField
                  type="text"
                  name="title"
                  onChange={onChange}
                  id="exampleInputEmail1"
                  placeholder="Enter Title"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  helperText="Enter Your title in few Words"
                />
              </div>
            </CardContent>
          </Card>

          <JoditEditor
            ref={editor}
            value={props.initialValue}
            config={config}
            tabIndex={1}
            onChange={(newContent) => getValue(newContent)}
          />

          <Card className="mt-3">
            <CardContent>
              <div className="form-group">
                <Typography variant="h6" htmlFor="exampleInputEmail1">
                  Question Tags
                </Typography>
                <TextField
                  type="text"
                  name="tags"
                  onChange={onChange}
                  id="exampleInputEmail1"
                  placeholder="Enter Tags"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  helperText="Enter Question Tags"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-5 mb-5"
          >
            Ask Question
          </Button>
        </form>
      </div>
    </div>
  );
}
