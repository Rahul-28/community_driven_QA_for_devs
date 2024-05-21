import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser";
import JoditEditor from "jodit-react";
import { useNavigate } from 'react-router-dom';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { Typography, IconButton, Button,Tooltip   } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

export default function Content(props) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const editor = useRef(null);
    const params = useParams();
    const [value, setValue] = useState("");
    const [question, setQuestion] = useState([])
    const [html, setHtml] = useState("");
    const [state, setState] = useState(false);
    const [answers, setAnswer] = useState([]);
    const [vote, setVotes] = useState({});
    const [voteStatus, setVoteStatus] = useState({});
    const [loginstatus, setloginstatus] = useState(false);
    const [quevoteStatus, setqueVoteStatus] = useState({});
    const [queVote, setQueVote] = useState();

    // to show the comment box
    const [show, setShow] = useState(false);

    // to add a new comment
    const [comment, setComment] = useState({});
    const [commentState, setCommentState] = useState(false);

    const config = useMemo(() => ({
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCommentState(false);
    };

    const isLoggedIn = () => {
        if (localStorage.getItem('username') !== null) {
            setloginstatus(true);
        }
    }

    const fetchQuestion = async (id) => {
        await fetch(`http://localhost:5000/api/question/fetchQueById/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then((data) => {
            setQuestion(data);
            setHtml(parse(data.question));
        })
    }

    const fetchAnswers = async (id) => {
        await fetch(`http://localhost:5000/api/answer/fetchanswer/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then((data) => {
            setAnswer(data);
        })
    }

    const getValue = (newvalue) => {
        setValue(newvalue);
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/answer/addanswer/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer: value }),
        });

        const json = await response.json()

        if (json["status"] === true) {
            setState(true);
            setValue("");
            setOpen(true);
            window.scrollTo(0, 0)
        }
    }

    const upvoteQue = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            document.getElementById("quedownvotbtn").disabled = false;
            document.getElementById("queupvotebtn").disabled = true;

            const response = await fetch(`http://localhost:5000/api/question/upvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let json = await response.json();
            setqueVoteStatus(json);
        }
        else {
            navigate("/login");
        }
    }

    const downvoteQue = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            document.getElementById("quedownvotbtn").disabled = true;
            document.getElementById("queupvotebtn").disabled = false;

            const response = await fetch(`http://localhost:5000/api/question/downvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let json = await response.json();
            setqueVoteStatus(json);
        }
        else {
            navigate("/login");
        }
    }

    const upvote = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            document.getElementById("ansdownvotebtn"+id).disabled = false;
            document.getElementById("ansupvotebtn"+id).disabled = true;

            const response = await fetch(`http://localhost:5000/api/answer/upvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let json = await response.json();
            setVoteStatus(json);
        }
        else {
            navigate("/login");
        }
    }

    const downvote = async (e, id) => {
        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            document.getElementById("ansdownvotebtn" + id).disabled = true;
            document.getElementById("ansupvotebtn" + id).disabled = false;

            const response = await fetch(`http://localhost:5000/api/answer/downvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let json = await response.json();
            setVoteStatus(json);
        }
        else {
            navigate("/login");
        }
    }

    const fetchVotes = async () => {
        const response = await fetch(`http://localhost:5000/api/answer/fetchVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let json = await response.json();
        setVotes(json);
    }

    const fetchQueVotes = async (id) => {
        const response = await fetch(`http://localhost:5000/api/question/fetchVotes/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let json = await response.json();
        setQueVote(json);
    }

    const onChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }

    const addComment = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/comment/addcomment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: comment.comment, qid: question._id }),
        });
        const json = await response.json();
        if (json["status"] === true) {
            setCommentState(true);
            window.scrollTo(0, 0);
        }
    }

    const fetchComments = async (id) => {
        await fetch(`http://localhost:5000/api/comment/fetchComments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ qid: question._id, ansid: id })
        }).then(response => response.json()).then(data => setComment(data))
    }

    useEffect(() => {
        isLoggedIn();
        fetchQuestion(params.type);
        fetchAnswers(params.type);
        fetchVotes();
        fetchQueVotes(params.type);
        // convertToHTML();
    }, [state, voteStatus, quevoteStatus, question])

    return (
      <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success"  sx={{ width: '110%' }}
                    action={
                        <IconButton size="small"  aria-label="close" color="inherit" onClick={handleClose}
                        sx={{  position: 'absolute',right: 8, top: 8, backgroundColor: 'transparent',}}   
                        >
                            <CloseIcon fontSize="10px" />
                        </IconButton>
                    }
                >
                    Your Answer is Posted Successfully   
                </MuiAlert>
            </Snackbar>


            <div className="container" >
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-md-1 mt-0 mx-0">
                    <Tooltip title="Upvote" placement="top">
                         <IconButton  id="queupvotebtn" onClick={(e) => upvoteQue(e, question._id)}>
                            <ArrowDropUpRoundedIcon style={{ fontSize: 50 ,color:'gray' }} /></IconButton></Tooltip>
                        <Typography variant="h5" style={{textAlign:'center'}}>{queVote}</Typography>
                        <Typography variant="body2" >Votes</Typography>
                        <Tooltip title="Downvote" placement="bottom">
                        <IconButton  id="quedownvotbtn" onClick={(e) => downvoteQue(e, question._id)}>
                            <ArrowDropDownRoundedIcon style={{ fontSize: 50 ,color:'gray'}} /></IconButton>
                        </Tooltip>
                    </div>
                    <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                        <h1>{question.title}</h1>
                        <div className='mt-5'>{html}</div>
                    </div>
                </div>
                <hr Style={{
                    background: "black",
                    height: "2px",
                    border: "2px",borderRadius: '3px',
                }}
                /><hr />
                <h4>{answers.length}  Answers</h4>
                {answers.length > 0 && (
                    <div className='mt-5'>
                        {answers.map(ans => (
                            <div className="">
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column col-md-0 mt-0 mx-0">
                                    <Tooltip title="Upvote" placement="top">
                                        <IconButton  id={"ansupvotebtn" + ans._id} onClick={(e) => upvote(e, ans._id)}>
                                            <ArrowDropUpRoundedIcon style={{ fontSize: 50,color:'gray' }} /></IconButton></Tooltip>
                                        <Typography variant="h6" style={{textAlign:'center'}}>{vote[ans._id]}</Typography>
                                        <Typography variant="body2" style={{textAlign:'center'}}>votes</Typography>
                                        <IconButton id = {"ansdownvotebtn" + ans._id} onClick={(e) => downvote(e, ans._id)} >
                                            <ArrowDropDownRoundedIcon style={{ fontSize: 50,color:'gray' }} /></IconButton>
                                        {(
                                            () => {
                                                if (ans.status === "Accepted") {
                                                    return (
                                                        <Button variant="outlined" color="default">
                                                            <CheckIcon style={{ fontSize: 25, color: 'lightgreen' }} />
                                                        </Button>
                                                    )
                                                }
                                            }
                                        )()}
                                    </div>
                                    <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                                        <p>{parse(ans.answer)}</p>
                                        <small className='d-flex flex-row-reverse'>Posted By : {ans.postedBy}</small>
                                        <div className="comments" Style="display:relative; bottom:0px;">
                                            <div className="comment"></div>
                                            {
                                                show && (
                                                    <div className="title">
                                                        <form method="POST" onSubmit={(e) => addComment(e, ans._id)}>
                                                            <textarea type="text" placeholder="Add Your comment.." rows={5} cols={100} name="comment" onChange={onChange}></textarea><br></br>
                                                            <button type="submit" className='btn btn-primary'>Add comment</button>
                                                        </form>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <hr Style={{
                                    background: "#959595",
                                    height: "2px",
                                    border: "none",
                                }}
                                /><hr />
                            </div>
                        ))}
                    </div>
                )}
                <h4>Your Answer</h4>
                <form onSubmit={(e) => handleSubmit(e, question._id)} method='POST'>
                    <JoditEditor
                        ref={editor}
                        config={config}
                        tabIndex={1}
                        value={value}
                        onChange={(newContent) => getValue(newContent)}
                    />
                    {
                        loginstatus === true ? (<button type='submit' className="btn btn-primary mt-5 mb-3">Post Your Answer</button>) : <></>
                    }
                </form>
            </div>
            </>
    )
}
