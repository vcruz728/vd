import { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "@inertiajs/react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
    <Fragment>
        <footer className="footer mt-3  ">
            <div className="container">
                <Row className="align-items-center flex-row-reverse">
                    <Col md={12} sm={12} className="text-center">
                        BUAP - Vicerrectoría De Docencia{" "}
                    </Col>
                </Row>
            </div>
        </footer>
    </Fragment>
);

export default Footer;
