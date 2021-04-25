import React from 'react'; 
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";

import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
// New 
import InfoPanel from "./components/info-panel.component";
import DiscussionForum from "./components/discussion-forum.component";
import Chat from "./components/chat.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/chat" exact component={Chat} />
        <Route path="/comment/:id" component={EditExercise} />
        <Route path="/info" component={InfoPanel} />
        <Route path="/discussion" component={DiscussionForum} />
        </div>
    </Router>
  );
}

export default App;
