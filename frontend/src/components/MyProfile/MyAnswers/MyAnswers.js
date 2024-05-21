import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProfileHeader from '../Profile/Profile';
import { Card, CardContent, Typography, Container, TextField, Select, MenuItem, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, Button, Paper } from '@mui/material';
import Pagination from '../../Questions/Pagination';
import PostsAns from './PostsAns';
export default function Profile() {

    const [filters, setFilters] = useState({ startDate: "", endDate: "", tags: "", status: "" });

    const onChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const [answers, setAnswers] = useState([]);

    // for pagination in Answers in profile section.
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    const fetchAllFilteredAnswers = async () => {
        const response = await fetch(`http://localhost:5000/api/answer/fetchUserFilteredAnswers/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ startDate: filters.startDate, endDate: filters.endDate, tags: filters.tags , status:filters.status})

        }).then(response => {
            return response.json();
        }).then(data => setAnswers(data));
    };

    const [usedTags, setUsedTags] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/answer/givenAnswersTags/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setUsedTags(data));
    }, []);

    useEffect(() => {
        fetchAllFilteredAnswers();
    }, [filters])

    useEffect(() => {
        fetch(`http://localhost:5000/api/answer/fetchUserAnswers/${localStorage.getItem("username")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(data => setAnswers(data));
    },[]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = answers.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <>
        <ProfileHeader />
        <Container style={{ height: "100vh", zIndex: 1, backgroundColor: "white", paddingTop: "25px", display: "flex", flexDirection: "column" }}>
  <div style={{ margin: "10px", flex: "1", overflow: "auto" }}>
    <div className='filters_menu' style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <strong>Find given answers between :</strong>
        <TextField
          type="date"
          name="startDate"
          onChange={onChange}
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <strong>To</strong>
        <TextField
          type="date"
          name="endDate"
          onChange={onChange}
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <strong>and in tag:</strong>
        <Select
          name="tags"
          onChange={onChange}
          defaultValue=""
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <MenuItem value="" disabled hidden>select a tag</MenuItem>
          {usedTags.map(tag => <MenuItem value={tag}>{tag}</MenuItem>)}
        </Select>

        <FormControl component="fieldset" style={{ marginLeft: "10px", marginRight: "10px" }}>
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup row aria-label="status" name="status" value={filters.status} onChange={onChange}>
            <FormControlLabel value="Accepted" control={<Radio />} label="Accepted" />
            <FormControlLabel value="Not Accepted" control={<Radio />} label="Not Accepted" />
          </RadioGroup>
        </FormControl>
      </div>
    </div>

    <div className="questions">
      <div className="question">
        <PostsAns posts={currentPosts} />
      </div>
    </div>
  </div>

  <Pagination postsPerPage={postPerPage} totalPosts={answers.length} paginate={paginate} style={{ marginBottom: "10px" }} />
</Container>

        </>
    );
}
