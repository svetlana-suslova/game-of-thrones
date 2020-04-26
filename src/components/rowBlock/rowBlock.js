import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlock = ({left, right}) => {
    return (
        <Row>
            <Col md='5'>
                {left}
            </Col>
            <Col md='7'>
                {right}
            </Col>
        </Row>
    )     
}
export default RowBlock;