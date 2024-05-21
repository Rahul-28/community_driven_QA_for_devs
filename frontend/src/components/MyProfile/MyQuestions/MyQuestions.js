import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Typography } from '@mui/material';
import Posts from './Posts';
import Pagination from './Pagination';
import Profile from '../Profile/Profile'
export default function MyQuestions() {
    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "" });
    const [questions, setQuestions] = useState([]);
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [usedTags, setUsedTags] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/question/usedtags/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setUsedTags(data));
    }, []);

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    const fetchAllFilteredQuestions = async () => {
        const response = await fetch(`http://localhost:5000/api/question/fetchUserFilteredQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags })
        });
        const data = await response.json();
        setQuestions(data);
    };

    useEffect(() => {
        fetchAllFilteredQuestions();
    }, [filters]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/question/fetchUserQuestions/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setQuestions(data));
    },[]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <>
      < Profile/>
        <Container style={{ height: "100vh", zIndex: 1, backgroundColor: "white" ,paddingTop: "25px" }}>
            <div className='header_and_content' style={{ width: "100%" }}>
                
                <Grid container spacing={2} className='filters_menu' style={{ marginBottom: "10px" }}>
                    <Grid item xs={3}>
                        <TextField
                            id="startDate"
                            name="startDate"
                            label="Start Date"
                            type="date"
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="endDate"
                            name="endDate"
                            label="End Date"
                            type="date"
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id="tags"
                            name="tags"
                            select
                            onChange={onChange}
                            SelectProps={{
                                native: true,
                            }}
                            fullWidth
                        >
                            <option value="none" disabled>Select a tag</option>
                            {usedTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                        </TextField>
                    </Grid>
                </Grid>
                <Typography variant="h6">Questions</Typography>
                <div className="questions">
                    <div className="question">
                        <Posts posts={currentPosts} />
                    </div>
                </div>
                <div className="container">
                    <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                </div>
            </div>
        </Container>
        </>
    );
}
