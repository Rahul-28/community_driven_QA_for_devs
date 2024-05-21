import React from 'react';
import Navbar from './components/Partials/Navbar';
import Editor from './components/Editor';
import Questions from './components/Questions/Questions';
import Content from './components/Questions/Content';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/MyProfile/Profile/Profile';
import UserQuestionContent from './components/MyProfile/Profile/Content';
import Chart from './components/charts/Chart';
import MyQuestions from './components/MyProfile/MyQuestions/MyQuestions';
import UpdateQuestion from './components/MyProfile/MyQuestions/UpdateQuestion';
import UpdateAnswer from './components/MyProfile/MyAnswers/UpdateAnswer';
import MyAnswers from './components/MyProfile/MyAnswers/MyAnswers';
import Analysis from './components/MyProfile/Analysis';
import Tags from './components/Tags/Tags';
import QuestionOnTags from './components/Tags/QuestionOnTags';
import Search from './components/Questions/Search';
import RightSidebar from './components/Partials/RightSidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"

const App = () => {

  return (

      <BrowserRouter>
          <Navbar />
              <Routes>
                <Route path="/" element={<Questions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/question/:type" element={<Content />} />
                <Route path="/answer/:type" element={<UserQuestionContent />} />

                {/* profile routes */}
                <Route path="/chart" element={<Chart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/myquestions" element={<MyQuestions />} />
                <Route path="/updateque/:type" element={<UpdateQuestion />} />
                <Route path="/myanswers" element={<MyAnswers />} />
                <Route path="/updateans/:type" element={<UpdateAnswer />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/tags" element={<Tags />} />


                {/* tags routers */}
                <Route path="/questionOntags/:type" element={<QuestionOnTags />} />
                <Route path="/search" element={<Search />} />
              </Routes>
              <RightSidebar/>
      </BrowserRouter>
  
  );
};

export default App;
