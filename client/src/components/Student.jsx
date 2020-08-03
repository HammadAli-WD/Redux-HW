import React, { Component } from "react";
import { ListGroup, Row, Col,} from "react-bootstrap";
import { connect } from "react-redux";
//import "./StudentDetails.css";
//import TableForProjects from "./TableForProjects";

//const apiKey = process.env.REACT_APP_API_KEY || "http://localhost:3000";
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.params.id)
  /* console.log(state) */
  return {...state,
     id: ownProps.match.params.id} };
     //console.log(this.props.id)

const mapDispatchToProps = (dispatch) => ({
  
    setLoader: () =>
        dispatch({
            type: "SET_LOADER",
            payload: true
        }),
    unSetLoader: () =>
        dispatch({
            type: "UNSET_LOADER",
            payload: false
        }),
    setError: (status) =>
        dispatch({
            type: "LOADING_ERROR",
            payload: status
        }),
  
    getProjectsThunk: (params) => dispatch(getProjectsWithThunk(params)),
});

const getProjectsWithThunk = (params, projects) => {
  
  return  async (dispatch, getState) => {
    const numOfProjects = "http://localhost:3000"
    //const params = ownProps.match.params.id

    console.log('router', params)
    await fetch(numOfProjects + `/student/`+ params  + "/projects")
    .then(response => response.json())
    
    .then(responseObject => {
      projects = responseObject.data
      
      console.log("A thunk was used to dispatch this action", getState());
      dispatch({
        type: "GET_PROJECT_LIST",
        payload: projects
    });
    })
    
};
};

/* const addItemWithThunk = async() => {
  return async (dispatch, getState) => {
    let resp = await fetch(
      apiKey + "/student/" + this.props.match.params.id + "/projects"
    );

    if (resp.ok) {
      let projects = await resp.json();
      console.log(projects)
      dispatch(projects);
    } else {
      alert("Not fetching!");
    }
  };
}; */

class Student extends Component {
  
  /* fetchData = async () => {
    
  }; */

  /* fetchUser = async () => {
    let resp = await fetch(apiKey + "/student/" + this.props.match.params.id);
    let data = await resp.json();
    console.log(data)
    if (resp.ok) {
      this.setState({
        students: data,
      });
    }
  };
 */
  componentDidMount = () => {
   this.props.setLoader()
    this.props.getProjectsThunk(this.props.match.params.id)
    this.props.unSetLoader()
   
    //this.fetchUser();
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
    console.log(this.props.projects)
    return (
      //<h3 className="mt-5" > Projects Information</h3>
                <Row className="mt-5" >
               
                {this.props.data.projects.length > 1 && this.props.data.projects.map((project,index) => 
                <Col key={`col-${index}`} md={4} sm={6} lg={2} >
                     
                   <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        {project.name}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">{project.description}</ListGroup.Item>
                    
                    </ListGroup>
                </Col>
                )} 
                </Row>
     
    )

}
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);