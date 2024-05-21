import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Card, CardHeader, CardContent, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Profile from "../Profile/Profile";

const config = {
    buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
};

export default function UpdateQuestion(props) {
    const params = useParams();
    const editor = useRef(null);
    const [value, setValue] = useState("");
    const [state, setState] = useState(false);
    const [credentials, setCredentials] = useState({ title: "", tags: "" })
    const [question, setQuestion] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const fetchQuestion = async (id) => {
        const response = await fetch(`http://localhost:5000/api/question/fetchQueById/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then((data) => {
            setQuestion(data);
            setCredentials(data);
        });
    }

    const updateQue = async (e, id) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/question/updateque/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: credentials.title, question: value, tags: credentials.tags }),
        });

        let json = await response.json();
        if (json.status === "updated") {
            setState(true);
            setSnackbarOpen(true);
            window.scrollTo(0, 0)
        }
    }

    const getValue = (value) => {
        setValue(value);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchQuestion(params.type);
    }, []);

    return (
        <>
            <Profile />
            <div>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                        Your Query is Updated <strong>Successfully</strong>
                    </Alert>
                </Snackbar>
                <div className="container mb-5" style={{ width: '100%', display: 'block', margin: 'auto' }}>
                    <Card className="mt-5" style={{ backgroundColor: 'hsl(206,100%,97%)' }}>
                        <CardHeader title={<Typography variant="h4"><b>Update a Public Question</b></Typography>} />
                        <CardContent>
                            <Typography variant="h5" gutterBottom>Writing a Good Question</Typography>
                            <Typography variant="body1" gutterBottom>You’re ready to ask a programming-related question and this form will help guide you through the process.</Typography>
                            <Typography variant="h5" gutterBottom>Steps</Typography>
                            <ul>
                                <li>Summarize your problem in a one-line title.</li>
                                <li>Describe your problem in more detail.</li>
                                <li>Describe what you tried and what you expected to happen.</li>
                                <li>Add “tags” which help surface your question to members of the community.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <form onSubmit={(e) => updateQue(e, question._id)} method='post'>
                        <Card className="mb-3 mt-5">
                            <CardContent>
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Title"
                                    value={credentials.title}
                                    onChange={onChange}
                                    placeholder="Enter Title"
                                    variant="outlined"
                                    size="small"
                                    helperText="Enter Your title in few Words"
                                />
                            </CardContent>
                        </Card>

                        <JoditEditor
                            ref={editor}
                            value={question.question}
                            config={config}
                            tabIndex={1}
                            onChange={(newContent) => getValue(newContent)}
                        />

                        <Card className="mt-3">
                            <CardContent>
                                <TextField
                                    fullWidth
                                    id="tags"
                                    name="tags"
                                    label="Question Tags"
                                    value={credentials.tags}
                                    onChange={onChange}
                                    placeholder="Enter Tags"
                                    variant="outlined"
                                    size="small"
                                    helperText="Enter Question Tags"
                                />
                            </CardContent>
                        </Card>

                        <Button type='submit' variant="contained" color="primary" className="mt-5 mb-5">Update Question</Button>
                    </form>
                </div>
            </div>
        </>
    )
}
