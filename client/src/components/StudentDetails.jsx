import React, { Component } from "react"
import {Container, ModalBody, FormControl, Row, Image, Button, Modal, Form,
    Col, Card, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux'

const mapStateToProps = (state) => state;
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
})

class StudentDetails extends Component {
    state = {
        studentInfo: [],
        projectInfo: [],
        addProject: false,
        editModal: false,
        newProject: {
            name: "",
            description: "",
           
            repourl: "",
            liveurl: "",
        },
        studentid: null,
    }
    LoadingIndicator = () => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
            </div>
        )
    };

    LoadingError = () => {
        return (
            <Alert variant="danger" className="my-5">
                Ooops!!! Sorry this is not working at the moment. Please try again later!
            </Alert>
        )
    };
    handleChange =(e) => {
        const newProject = this.state.newProject
        newProject[e.currentTarget.id] = e.currentTarget.value

        this.setState({
            newProject
        })
    }
    fetchDetails = async () => {
        this.props.setLoader()
        try {
            const resp = await fetch("http://localhost:3000/student/" + this.props.match.params.id)
            if (resp.ok) {
                const details = await resp.json()
                this.setState({
                    studentInfo: details,
                });
                this.props.unSetLoader()
            }

        } catch (error) {
            this.props.setError(error)
        }

        const response = await fetch("http://localhost:3000/student/" + this.props.match.params.id + "/projects")
        console.log("Projects", response)
        if (response.ok) {
            const projectInfo = await response.json()
            console.log("Projects", projectInfo)
            this.setState({
                projectInfo: projectInfo.data,
            });
        }
    }

    addProject = async (e) => {
        e.preventDefault()
        const projectBody = ({...this.state.newProject, "studentid": this.props.match.params.id })

        const resp = await fetch("http://localhost:3000/projects", {
            method: "POST",
            body: JSON.stringify(projectBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (resp.ok) {

            this.setState({
                newProject: {
                    name: "",
                    decsription: "",
                   
                    repourl: "",
                    liveurl: "",
                },
                addProject: false

            })
            this.fetchDetails()
        }
    }
    componentDidMount(){
        this.fetchDetails()
    }

    render() {
        console.log(this.props)
        return(
            <Container className = "py-5">
                <Row>
                    {this.state.studentInfo.length < 1 && (
                        this.LoadingIndicator()
                    )}
                    {this.state.studentInfo && this.props.error && (
                        this.LoadingError()
                    )}
                    {this.state.studentInfo && (
                        <>
                        <Col md={6} className="mt-5">
                            <Image src={this.state.studentInfo.image} style={{ height: "50vh", width: "25rem" }} />
                        </Col>
                        <Col md={6} className="d-flex jsutify-content-center align-items-center">
                            <div className="text-center">
                            <Alert variant="info">Name: <strong>{this.state.studentInfo.name} {this.state.studentInfo.surname}</strong></Alert>
                            <Alert variant="info">Email: <strong>{this.state.studentInfo.email}</strong></Alert>
                            <Alert variant="info">Nationality: <strong>{this.state.studentInfo.country}</strong></Alert>
                            <Button onClick={() => this.setState({ addProject: true })}>Add project</Button>
                        </div>
                        </Col>
                        </>
                    )}
                </Row>
                {this.state.projectInfo && (

                    <Alert className="mt-3 text-center" variant="info"><strong>{this.state.studentInfo.name}'s projects</strong></Alert>
                    )}
                    <Row className="d-flex justify-content-center">
                    {this.state.projectInfo.map(project =>
                        <Col sm={4} key={project._id}>
                            <Card style={{ width: '20rem' }} className="mb-2">
                                <Card.Body>
                                    <Card.Title><h3>{project.name}</h3></Card.Title>
                                    <div>
                                        <h5 className="mt-5">Description</h5>
                                        <p>{project.description}</p>
                                        <h5>RepoUrl</h5>
                                        <p>{project.repourl}</p>
                                        <h5>LiveUrl</h5>
                                        <p>{project.liveurl}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                    </Row>
                    <Modal show={this.state.addProject} onHide = {() => this.setState({
                        addProject: false,
                        newProject: {
                            name: "",
                            decsription: "",
                            creationdate: "",
                            repourl: "",
                            liveurl: "",
                        }
                    })}>
                        <Modal.Body>
                            <Form onSubmit= {this.addProject}>
                            <Row className="d-flex justify-content-center">
                                    <Col md={8}>
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                            value = {this.state.newProject.name}
                                            onChange={this.handleChange}
                                            type="text"
                                            placeholder="Project Name" />
                                        </Form.Group> 
                                    </Col> 
                            </Row>
                            <Row className="d-flex justify-content-center">
                                    <Col md={8}>
                                        <Form.Group controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <FormControl
                                            value = {this.state.newProject.description}
                                            onChange = {this.handleChange}
                                            placeholder = "Description of the project"
                                            type = "text"
                                            />                                            
                                        </Form.Group> 
                                    </Col> 
                            </Row>
                            <Row className="d-flex justify-content-center">
                                    <Col md={8}>
                                        <Form.Group controlId="liveurl">
                                            <Form.Label>LiveUrl</Form.Label>
                                            <FormControl
                                            type = "text"
                                             value = {this.state.newProject.liveurl}
                                             onChange = {this.handleChange}
                                             placeholder = "liveurl"
                                            />                                            
                                        </Form.Group> 
                                    </Col> 
                            </Row>
                            <Row className="d-flex justify-content-center">
                                    <Col md={8}>
                                        <Form.Group controlId="repourl">
                                            <Form.Label>RepoUrl</Form.Label>
                                            <FormControl
                                            type="text"
                                            value={this.state.newProject.repourl}
                                            onChange = {this.handleChange}
                                            placeholder="LiveUrl"
                                            />
                                            
                                        </Form.Group> 
                                    </Col> 
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                        Submit project
                                </Button>

                            </div>

                            </Form>
                        </Modal.Body>
                    </Modal>
            </Container>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);