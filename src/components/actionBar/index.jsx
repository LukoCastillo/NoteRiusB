import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap'
import { withRouter } from 'react-router'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterNote } from '../../redux/actions/filter-actions';


const RedirectButton = withRouter(({ children, history, onCleanFilter }) => (
    <Button
        variant="success"
        size="sm"
        onClick={() => {
            history.push('/createNote');
        }}>
        {children}
    </Button>
))

const InputSearch = ({ text, onChange }) => (
    <Form.Control type="text" placeholder="Search note..." onChange={onChange} value={text} />
);



class ActionBar extends React.Component {
    onFilter = (e) => {
        let newFilter = e.target.value;
        this.props.onFilterNote({ text: newFilter });
    }

    render() {
        return (<React.Fragment>
            <Row className="actionBar">
                <Col xs={9}>
                    <InputSearch onChange={this.onFilter} text={this.props.filter.text} />
                </Col>
                <Col xs={3}>
                    <RedirectButton onCleanFilter={this.onCleanFilter}>Add note</RedirectButton>
                </Col>
            </Row>
        </React.Fragment>)
    }
}

const mapStateToProps = (state, props) => {
    return {
        filter: state.filter
    }
};

const mapActionToProps = (dispatch, props) => {
    return bindActionCreators({
        onFilterNote: filterNote,
    }, dispatch)
};

export default connect(mapStateToProps, mapActionToProps, null)(ActionBar);