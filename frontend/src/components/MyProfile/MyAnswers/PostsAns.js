import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import { Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarChart, QuestionAnswer, Forum } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import './postsAns.css';

export default function Posts({ posts }) {

    const [vote, setVotes] = useState({});

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

    const deleteAns = async (id) => {
        const response = await fetch(`http://localhost:5000/api/answer/deleteans/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json()

        if (json["status"] === "deleted") {
            window.scrollTo(0, 0);
            window.location.reload(true);
        }
    }

    const upVote = async (id) => {
        const response = await fetch(`http://localhost:5000/api/answer/upvote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();

        if (json.success) {
            fetchVotes();
        }
    }

    const downVote = async (id) => {
        const response = await fetch(`http://localhost:5000/api/answer/downvote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();

        if (json.success) {
            fetchVotes();
        }
    }

    useEffect(() => {
        fetchVotes();
    }, [])

    return (
        <>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {posts.map(answer => (
                <div key={answer._id} className="all-questions" style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", paddingBottom: "10px" }}>
                <div className="all-questions-container" style={{ display: "flex", alignItems: "center" }}>
                    <div className="all-questions-left" style={{ marginRight: "20px" }}>
                    <div className="all-options">
                        <div className="all-option">
                        <IconButton onClick={() => upVote(answer._id)}><ArrowDropUpRoundedIcon style={{ fontSize: 50 }} /></IconButton>
                        <Typography variant="h6">{vote[answer._id]}</Typography>
                        <Typography variant="body2">votes</Typography>
                        <IconButton onClick={() => downVote(answer._id)}><ArrowDropDownRoundedIcon style={{ fontSize: 50 }} /></IconButton>
                        </div>
                    </div>
                    </div>

                    <div className="question-answer" style={{ flex: "1" }}>
                    
                    <Paper variant="outlined" style={{ padding: '10px', marginBottom: '10px' }}>
                        <Typography variant="body1">{parse(answer.answer)}</Typography>
                    </Paper>
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <NavLink to={{ pathname: `/question/${answer.questionid}` }} style={{ marginRight: "20px" }} ><QuestionAnswer/></NavLink>
                        <NavLink to={{ pathname: `/updateans/${answer._id}` }} style={{ marginRight: "10px" }}><EditIcon /></NavLink>
                        <IconButton onClick={() => deleteAns(answer._id)}><DeleteIcon /></IconButton>
                    </div>
                    <div className="author">
                        <div className="author-details">
                        <Typography variant="body2">{answer.postedBy}</Typography>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </ul>

        </>
    )
}
