import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import {Snackbar,IconButton,Alert} from '@mui/material';
import {Close,EditOutlined,DeleteOutline} from '@mui/icons-material';

export default function Posts({ posts }) {
    const [noOfAns, setnoOfAns] = useState({});
    const [vote, setVotes] = useState({});
    const [state, setState] = useState(false);

    const deleteQue = async (id) => {
        const response = await fetch(`http://localhost:5000/api/question/deleteque/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json()

        if (json["status"] === "deleted") {
            setState(true);
            window.scrollTo(0, 0);
            window.location.reload(true);
        }
    }

    const FindFrequencyOfAns = async () => {
        const response = await fetch("http://localhost:5000/api/answer/findNumberOfAns", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        setnoOfAns(json);
    }

    const fetchVotes = async () => {
        const response = await fetch(`http://localhost:5000/api/question/fetchallVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let json = await response.json();
        setVotes(json);
    }

    useEffect(() => {
        FindFrequencyOfAns();
        fetchVotes();
    }, [])

    return (
        <>
            <Snackbar 
            open={state} 
            anchorOrigin={{   
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={6000} 
            onClose={() => setState(false)}
            message="Your Query is deleted Successfully"
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setState(false)}>
                        <Close fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
            >
                
                <Alert onClose={() => setState(false)} severity="success">
                    Your Question is deleted <strong>Successfully</strong>
                </Alert>
            </Snackbar>
         
            <ul>
                {posts.map(question => (
                    <div className="all-questions" key={question._id}>
                        <div className="all-questions-container">
                            <div className="all-questions-left">
                                <div className="all-options">
                                    <div className="all-option">
                                        <p>{vote[question._id]}</p>
                                        <span>Votes</span>
                                    </div>
                                    <div className="all-option">
                                        {question._id in noOfAns ? (
                                            <p>{noOfAns[question._id]}</p>
                                        ) : (
                                            <p>0</p>
                                        )}
                                        <span>Answers</span>
                                    </div>
                                </div>
                            </div>

                            <div className="question-answer">
                            <div className="title-and-icons">
                                    <NavLink to={{ pathname: `/answer/${question._id}` }} className="card-title" style={{ textDecoration: 'none', color: 'darkblue' }}>
                                        <h4>{question.title}</h4>
                                    </NavLink>
                                    <div className="icons">
                                        <NavLink to={{ pathname: `/updateque/${question._id}` }}>
                                            <EditOutlined sx={{ color: 'black', marginRight: '10px' }} />
                                        </NavLink>
                                        <NavLink onClick={() => deleteQue(question._id)}>
                                            <DeleteOutline sx={{ color: 'black', marginRight: '20px' }} />
                                        </NavLink>
                                    </div>
                                </div>
                                <div style={{ width: '90%' }}>
                                    <small style={{ fontSize: '1px' }}>{parse(question.question)[0]}</small>
                                </div>
                                <div className='mt-3'>
                                    {question.tags.split(" ").map((tag, index) => (
                                        <span className='question-tags' key={index} style={{ color: 'hsl(205,47%,42%)', backgroundColor: 'hsl(205,46%,92%)', borderRadius: '5px', marginRight: '5px' }}>{tag}</span>
                                    ))}
                                </div>
                               
                                <div className="author">
                                    <small className='d-flex flex-row-reverse'>
                                        asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} 
                                        <p style={{ color: '#0074CC', marginLeft: '5px' }}>{question.postedBy} &nbsp;</p>
                                    </small>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </>
    )
}
