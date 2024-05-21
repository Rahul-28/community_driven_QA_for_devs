import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  ArrowUpward, ArrowDownward,QuestionAnswer } from '@mui/icons-material';
import Posts from './Posts';
import Pagination from './Pagination';
import {
  Typography,
  Button,
  IconButton,
} from '@mui/material';


export default function Questions({ isOpen }) {

  const [questions, setQuestions] = useState([]);

  // for pagination
  const [postPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(1);

  

  // fetch all the questions
  const fetchAllQuestions = async () => {
    await fetch("http://localhost:5000/api/question/fetchquestions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => setQuestions(data));
  };

  // Function to sort questions by higher votes question displays first
  const sortByVotes = async () => {
    await fetch("http://localhost:5000/api/question/fetchQueByHigherVotes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => setQuestions(data));
  };

  // Function to filter all the questions which are answered.
  const answeredQuestions = async () => {
    await fetch("http://localhost:5000/api/question/answeredQue", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => setQuestions(data));
  };

  const unansweredQuestions = async () => {
    await fetch("http://localhost:5000/api/question/unansweredQue", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => setQuestions(data));
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  // logic to find index of posts to display questions
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNum => setcurrentPage(pageNum);

  return (
    <>
      <div Style={`height:100%; margin-top:${isOpen ? '13vh' : '0'}; z-index:1; margin-left:${isOpen ? '280px' : '0'}`}>
       
            <div className="stack-index-content" >

              <div className="main">
                <div className="main-container">
                  <div className="main-top">
                    <h2 style={{ padding: '10px' , margin:' 0%' , boxShadow: '3px 3px 3px rgb(0 0 0 / 5%), -3px -3px 3px rgb(0 0 0 / 5%)',background:'#f50057',  color:'azure',  border: '2px solid ', borderRadius: '2px'}}>All Questions</h2>
                    <NavLink to="/editor"><Button variant="contained" color="primary">Ask Question</Button></NavLink>
                  </div>
                  
                  <div className='main-desc'>
                    <Typography>{questions.length} Questions</Typography>
                    <div className="main-filter">
                         <Button variant="contained" color="primary" onClick={answeredQuestions}>Answered <IconButton ><QuestionAnswer /></IconButton></Button> 
                         <Button variant="contained" color="primary" onClick={sortByVotes}>Votes   <IconButton ><ArrowUpward /></IconButton></Button> 
                         <Button variant="contained" color="primary"onClick={unansweredQuestions}>Unanswered   <IconButton><ArrowDownward /></IconButton></Button> 
                    </div>
                  </div>


                  {/* This displays all questions */}
                  <div className="questions">
                    <div className="question">
                      <Posts posts={currentPosts} />
                    </div>
                  </div>
                  <div className="container">
                    <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      
    </>
  );
}
