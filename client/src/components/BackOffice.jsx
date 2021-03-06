import React, { Component } from 'react'
import SingleStudInfo from "./SingleStudInfo"
import { Col, Container, Row, Button } from 'react-bootstrap'
import CreateStudInfo from './CreateStudInfo'
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
    show: () =>
      dispatch({
        type: "SHOW_CREATE_STUD_MODAL",
        
      }),
  });
class BackOffice extends Component {
   state = {
    students: {
        data:[]
    },
      
   }

    render() {
        return (
            <Container>
                <h1>Welcome to the backoffice <Button onClick={() => this.props.show()}>Create New</Button></h1>
                <CreateStudInfo 
                            onNewStudInfo={(StudInfo)=> this.setState({
                                students: this.state.students.data.concat(StudInfo),
                            })}
                            />

                {this.state.students.data.map(StudInfo => 
                    <SingleStudInfo item={StudInfo}
                        onDelete={(_id) => 
                            this.setState({
                            students: this.state.students.data.filter(StudInfo => StudInfo._id !== _id)
                        }) }
                        
                 
                    /> 
                )} 
            </Container>
        )
    }

    componentDidMount = async () => {
        const studentsResp = await fetch("http://localhost:3000/student")
        const students = await studentsResp.json()
        this.setState({
            students: students
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackOffice)