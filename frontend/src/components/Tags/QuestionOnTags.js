
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import Pagination from './Pagination';
import Posts from './Posts';

export default function QuestionOnTags() {

    const params = useParams();

    // for pagination
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    // for questions
    const [questions, setQuestions] = useState([])

    // for tag Description
    const [tagdescription, settagdesc] = useState({});

    const fetchQue = async (tagname) => {
        await fetch(`http://localhost:5000/api/question/fetchQuePertag/${tagname}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))

    }

    const tagDesc = async (tagname) => {
        await fetch(`http://localhost:5000/api/tag/tagdesc/${tagname}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            settagdesc(data)
        });
    }

    // logic to find index of posts to display questions
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    useEffect(() => {
        fetchQue(params.type);
        tagDesc(params.type);
    }, [questions])

    return (
      
            <div className="stack-index">
                <div className="stack-index-content">
                 

                    <div className="main">
                        <div className="main-container">
                            <div className="main-top">
                                <h2>All Questions</h2>
                                <NavLink to="/editor"><button>Ask Question</button></NavLink>
                            </div>

                           
                            <p>Total {questions.length} Questions</p>
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

    
    )
}
