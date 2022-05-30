import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./css/Main.css";
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
// import axios from "axios";

function Main({ questions }) {
  // const [questions, setQuestions] = useState([]);
const user = useSelector(selectUser);
  // console.log(questions);
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <p>Welcome {user?.displayName?user.displayName:"null"}</p>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>

          {/* <a href="/add-question"> */}

          {/* </a> */}
        </div>
        <div className="main-desc">
          <p>{questions.length} questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                {/* <a href="/">Newest</a> */}
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>

                {/* <a href="/">Active</a> */}
              </div>
              <div className="main-tab">
                {/* <a href="/">More</a> */}
                <Link to="/">More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          {questions?.map((_q,key) => (
            <div className="question" key={key}>
              <AllQuestions data={_q} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
