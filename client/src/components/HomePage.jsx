import React, { Component } from "react";
import {
	Container,
	Table,
	ToggleButton,
	ToggleButtonGroup,
	DropdownButton,
	Dropdown,
	ButtonGroup,
	Button,
  Modal,
  ListGroup,
  Jumbotron,
	Form,
	Alert,
	Row,
	Col
} from "react-bootstrap";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom"
import Loader from 'react-loader-spinner';
import { connect } from "react-redux";

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
	getSortingKey: (key) =>
		dispatch({
			type: "SET_SORTING_KEY",
			payload: key
		}),
	getOrder: (key) =>
		dispatch({
			type: "SET_ORDER",
			payload: key
		}),

	getStudentSortingThunk: (totalStudents, sortingKeys) => dispatch(getStudentSortingWithThunk(totalStudents, sortingKeys)),
	getStudentListThunk: (students) => dispatch(getStudentListWithThunk(students)),
});

const getStudentSortingWithThunk = (totalStudents, sortingKeys) => {
	return async (dispatch, getState) => {
		//async code

		const numOfStudent = `http://localhost:3000/student`
		await fetch(numOfStudent)
			.then((response) => response.json())

			.then((responseObject) => {
				totalStudents = responseObject.totalNumberOfStudents
				dispatch({
					type: "TOTAL_STUDENTS",
					payload: (totalStudents)
				});

				sortingKeys = Object.keys(responseObject.data[0]);

				console.log("A thunk was used to dispatch this action", getState());
				dispatch({
					type: "SORTING_KEYS",
					payload: (sortingKeys)
				});

			})

	};
};

const getStudentListWithThunk = (students) => {
	return async (dispatch, getState) => {
		//async code

		let sortParam
		if (getState().data.selectedKey === '') {
			const skip = (getState().data.currentPageNum * getState().data.numPerPage) - getState().data.numPerPage
			const url = `http://localhost:3000/student?limit=${getState().data.numPerPage}&offset=${skip}`

			await fetch(url)
				.then((response) => response.json())

				.then((responseObject) => {

					students = responseObject.data

					console.log("A thunk was used to dispatch this action", getState());
					dispatch({
						type: "GET_STUDENT_LIST",
						payload: students
					});
				})
		}

		else {
			sortParam = getState().data.selectedKey

			const skip = (getState().data.currentPageNum * getState().data.numPerPage) - getState().data.numPerPage
			const url = `http://localhost:3000/student?limit=${getState().data.numPerPage}&offset=${skip}&sort=${sortParam}`  /* &order=${getState().data.orderKey} */

			await fetch(url)
				.then((response) => response.json())

				.then((responseObject) => {

					students = responseObject.data

					console.log("A thunk was used to dispatch this action", getState());
					dispatch({
						type: "GET_STUDENT_LIST",
						payload: students
					});
				})
		}


	};
};

class Students extends Component {


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
				<Loader type="Circles" color="#00BFFF" height={80} width={80} />
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
//page number increment shown
	changePage = (value, c) => {
		if (value > 1) {
			this.props.data.currentPageNum = value
		} else {
			this.props.data.currentPageNum = 1

		}
		this.props.getStudentListThunk(c)
	}


	componentDidMount = async (a, b, c) => {

		this.props.getStudentSortingThunk(a, b)
		this.props.getStudentListThunk(c)
	};


	componentDidUpdate = async (prevProp, prevState, a) => {
		if (prevProp.data.selectedKey !== this.props.data.selectedKey) {
			this.props.getStudentListThunk(a)
		}
		if (prevProp.data.orderKey !== this.props.data.orderKey) {
			this.props.getStudentListThunk(a)
		}
	}

	render() {
		console.log(this.props)

		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(this.props.data.numOfStudent / this.props.data.numPerPage); i++) {
			pageNumbers.push(i);
		}

		return (

			<>
					{/* <Button variant="info" onClick={() => this.setState({ addModal: true })}>Add new student</Button> */}
					{/* <DropdownButton
						as={ButtonGroup}
						className="mx-3"
						key="left"
						id={`dropdown-button-drop-left`}
						drop="left"
						variant="secondary"
						title={`Sort by ${this.props.data.selectedKey.toUpperCase()}`}
						onSelect={this.handleSelect}
					>
						{this.props.data.sortingKeys.map((key, i) => {
							return (
								<Dropdown.Item key={i} eventKey={key} onClick={() => this.props.getSortingKey(key)}>{key}</Dropdown.Item>
							)
						})}
					</DropdownButton>
 */}
					{/* <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="py-3">
						{pageNumbers.map((number) => {
							if (((number === 1) || (number === pageNumbers.length)) || ((number > this.props.data.currentPageNum - 3) && (number < this.props.data.currentPageNum + 3))) {
								return (
									<ToggleButton className="border" variant="secondary" key={number} value={number} onClick={() => this.changePage(number)}> {number}</ToggleButton>
								)
							}
							else {

								if (number < 3) {
									return (
										<ToggleButton className="border" variant="secondary" key={number} value={number} onClick={() => this.changePage(number)}> {'<<'}</ToggleButton>
									)
								} else if (number > pageNumbers.length - 2) {
									return (
										<ToggleButton className="border" variant="secondary" key={number} value={number} onClick={() => this.changePage(number)}> {'>>'}</ToggleButton>
									)
								}
							}
						})
						}
					</ToggleButtonGroup> */}

						
						{/* {this.props.data.selectedKey !== ''
							? (
								<div className="d-flex">
									<Alert variant="info" className="mx-3 text-center">Order By <strong>{this.props.data.selectedKey.toUpperCase()}</strong></Alert>
									<DropdownButton
										as={ButtonGroup}
										className="h-75"
										key="right"
										id={`dropdown-button-drop-right`}
										drop="right"
										variant="secondary"
										title={`${this.props.data.orderKey.toUpperCase()}ENDING order`}
										onSelect={this.getOrderBy}
									>
										{this.props.data.orderKeysArray.map((key, i) => {
											return (
												<Dropdown.Item key={i} eventKey={key} onClick={() => this.props.getOrder(key)}>{key}</Dropdown.Item>
											)
										})}
									</DropdownButton>
								</div>
							)
							: null} */}

					
              
              <Jumbotron fluid>
                  <Container>
                      <h1>Students Portfolios</h1>
                      <p>
                      This is a modified jumbotron that occupies the entire horizontal space of
                      its parent.
                      </p>
                  </Container>
                  </Jumbotron>
              <Container>
              <h3> Students Information</h3>
                  <Row>
						
							{this.props.data.students.length < 1 && (
								this.LoadingIndicator()
							)}
							{this.props.data.students && this.props.error && (
								this.LoadingError()
							)}
							{this.props.data.students && (
                

								this.props.data.students.map((student, index) => {

									return (
										<Col key={`col-${index}`} md={4} sm={6} lg={2} >
                    
                   <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        {student.name}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">{student.surname}</ListGroup.Item>
                    <ListGroup.Item as="li" disabled>
                    {student.country}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">{student.dateOfBirth}</ListGroup.Item>
                    </ListGroup>
                    <Button color="primary" className="px-4"
                    onClick={() => this.props.history.push(`/student/${student._id}`)}

                  >
                  StudentInfo
                </Button>
                </Col>
									)
								})
							)}
              
              </Row>
              </Container>
              <Alert variant="info" className="text-center">page <strong>{this.props.data.currentPageNum}</strong> of <strong>{pageNumbers.length}</strong>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="py-3">
						{pageNumbers.map((number) => {
							if (((number === 1) || (number === pageNumbers.length)) || ((number > this.props.data.currentPageNum - 3) && (number < this.props.data.currentPageNum + 3))) {
								return (
									<ToggleButton className="border" variant="secondary" key={number} value={number} onClick={() => this.changePage(number)}> {number}</ToggleButton>
								)
							}
							else {

								if (number < 3) {
									return (
										<ToggleButton className="border" variant="secondary" key={number} value={number} onClick={() => this.changePage(number)}> {'<<'}</ToggleButton>
									)
								} else if (number > pageNumbers.length - 2) {
									return (
										<ToggleButton className="border" variant="secondary" key={number} value={number} onClick={() => this.changePage(number)}> {'>>'}</ToggleButton>
									)
								}
							}
						})
						}
					</ToggleButtonGroup>
              </Alert>
              </>

						
					

				
			
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Students));