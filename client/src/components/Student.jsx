import React, { Component } from "react";
import { ListGroup, Row, Col,} from "react-bootstrap";
import { connect } from "react-redux";
import { fetchProjects } from "../actions/projectAction";

//import "./StudentDetails.css";
//import TableForProjects from "./TableForProjects";

const apiKey = process.env.REACT_APP_API_KEY || "http://localhost:3000";
const mapStateToProps = (state) => state;



/* const fetchData = async() => {
  return async (dispatch, getState) => {
    let resp = await fetch(
      apiKey + "/student/" + this.props.match.params.id + "/projects"
    );

    if (resp.ok) {
      let projects = await resp.json();
      //console.log(projects)
      dispatch({
        projects,
      });
    } else {
      alert("Not fetching!");
    }
  };
}; */

class Student extends Component {
  
  /* fetchData = async () => {
    
  }; */

  fetchUser = async () => {
    let resp = await fetch(apiKey + "/student/" + this.props.match.params.id);
    let data = await resp.json();
    //console.log(data)
    if (resp.ok) {
      this.setState({
        students: data,
      });
    }
  };

  componentDidMount = () => {
    this.props.dispatch(fetchProjects());
    this.fetchUser();
  };

  

  /* getProjectId = (id) => {
    this.setState({
      projectId: id,
      addReview: true,
    });
  };

  handleReview = (e) => {
    const newReview = this.state.newReview;
    newReview[e.currentTarget.id] = e.currentTarget.value;
    this.setState({
      newReview,
    });
  };

  addNewReview = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      apiKey + "/projects/" + this.state.projectId + "/reviews",
      {
        method: "POST",
        body: JSON.stringify(this.state.newReview),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.ok) {
      this.fetchReviews(this.props.match.params.id);
      this.setState({
        addReview: false,
        projectId: "",
        newReview: {
          name: "",
          text: "",
        },
      });
    }
  }; */

  render() {
    const { error, loading, projects } = this.props;
    console.log(projects)


    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      //<h3 className="mt-5" > Projects Information</h3>
                <Row className="mt-5" >
               
               {/*  {this.props.projects.map((project,index) => 
                <Col key={`col-${index}`} md={4} sm={6} lg={2} >
                     
                   <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        {project.name}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">{project.description}</ListGroup.Item>
                    
                    </ListGroup>
                </Col>
                )}  */}
                </Row>
     
    )

}
}

export default connect(mapStateToProps)(Student);