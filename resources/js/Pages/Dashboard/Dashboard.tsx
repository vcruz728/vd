import { Fragment } from "react";
import PageHeader from "../../Layouts/layoutcomponents/pageHeader";
import {
    Alert,
    Card,
    Col,
    OverlayTrigger,
    ProgressBar,
    Row,
    Tooltip,
} from "react-bootstrap";
import { Imagesdata } from "../../commondata/commonimages";
import { Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/app";

function Dashboard({ errors }: { errors: { error: string } }) {
    console.log(errors);
    interface activity {
        id: number;
        color: string;
        data: string;
        data1: string;
        text: string;
        text1: string;
    }
    const activitys: activity[] = [
        {
            id: 1,
            color: "primary",
            data: "Task Finished",
            data1: "09 July 2021",
            text: "Adam Berry finished task on",
            text1: "Project Management",
        },
        {
            id: 2,
            color: "secondary",
            data: "New Comment",
            data1: "05 July 2021",
            text: "Victoria commented on Project",
            text1: "Angular JS Template",
        },
        {
            id: 3,
            color: "success",
            data: "New Comment",
            data1: "25 June 2021",
            text: "Victoria commented on Project ",
            text1: "Angular JS Template",
        },
        {
            id: 4,
            color: "warning",
            data: "Task Overdue",
            data1: "14 June 2021",
            text: "Petey Cruiser finished task",
            text1: "Integrated Management",
        },
        {
            id: 5,
            color: "danger",
            data: "Task Overdue",
            data1: "29 June 2021",
            text: "Petey Cruiser finished task ",
            text1: "Integrated Management",
        },
    ];
    return (
        <AppLayout>
            <Fragment>
                <PageHeader
                    titles="Dashboard 01"
                    active="Dashboard 01"
                    items={["Home"]}
                />
                <Row>
                    <Col lg={12} md={12} sm={12} xl={12}>
                        {errors?.error && (
                            <Alert
                                variant="danger"
                                className="alert-dismissible"
                            >
                                <i className="fe fe-slash"> </i>

                                {errors?.error}
                            </Alert>
                        )}
                        <Row>
                            <Col lg={6} md={6} sm={12} xl={3}>
                                <Card className="overflow-hidden">
                                    <Card.Body>
                                        <div className="d-flex">
                                            <div className="mt-2">
                                                <h6 className="">
                                                    Total Users
                                                </h6>
                                                <h2 className="mb-0 number-font">
                                                    44,278
                                                </h2>
                                            </div>
                                            <div className="ms-auto">
                                                <div className="chart-wrapper mt-1"></div>
                                            </div>
                                        </div>
                                        <span className="text-muted fs-12">
                                            <span className="text-secondary me-2">
                                                <i className="fe fe-arrow-up-circle  text-secondary"></i>{" "}
                                                5%
                                            </span>
                                            Last week
                                        </span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6} md={6} sm={12} xl={3}>
                                <div className="card overflow-hidden">
                                    <Card.Body>
                                        <div className="d-flex">
                                            <div className="mt-2">
                                                <h6 className="">
                                                    Total Profit
                                                </h6>
                                                <h2 className="mb-0 number-font">
                                                    67,987
                                                </h2>
                                            </div>
                                            <div className="ms-auto">
                                                <div className="chart-wrapper mt-1"></div>
                                            </div>
                                        </div>
                                        <span className="text-muted fs-12">
                                            <span className="text-pink me-2">
                                                <i className="fe fe-arrow-down-circle text-pink"></i>{" "}
                                                0.75%
                                            </span>
                                            Last 6 days
                                        </span>
                                    </Card.Body>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12} xl={3}>
                                <div className="card overflow-hidden">
                                    <Card.Body>
                                        <div className="d-flex">
                                            <div className="mt-2">
                                                <h6 className="">
                                                    Total Expenses
                                                </h6>
                                                <h2 className="mb-0 number-font">
                                                    $76,965
                                                </h2>
                                            </div>
                                            <div className="ms-auto">
                                                <div className="chart-wrapper mt-1"></div>
                                            </div>
                                        </div>
                                        <span className="text-muted fs-12">
                                            <span className="text-green me-2">
                                                <i className="fe fe-arrow-up-circle text-green"></i>{" "}
                                                0.9%
                                            </span>
                                            Last 9 days
                                        </span>
                                    </Card.Body>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12} xl={3}>
                                <Card className="overflow-hidden">
                                    <Card.Body>
                                        <div className="d-flex">
                                            <div className="mt-2">
                                                <h6 className="">Total Cost</h6>
                                                <h2 className="mb-0 number-font">
                                                    $59,765
                                                </h2>
                                            </div>
                                            <div className="ms-auto">
                                                <div className="chart-wrapper mt-1"></div>
                                            </div>
                                        </div>
                                        <span className="text-muted fs-12">
                                            <span className="text-warning me-2">
                                                <i className="fe fe-arrow-up-circle text-warning"></i>{" "}
                                                0.6%
                                            </span>
                                            Last year
                                        </span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xl={6} md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4" className="fw-semibold">
                                    Daily Activity
                                </Card.Title>
                            </Card.Header>
                            <Card.Body className="pb-0">
                                {activitys.map((activity) => (
                                    <ul
                                        className="task-list"
                                        key={Math.random()}
                                    >
                                        <li className="d-sm-flex">
                                            <div>
                                                <i
                                                    className={`task-icon bg-${activity.color}`}
                                                ></i>
                                                <h6 className="fw-semibold">
                                                    {activity.data}
                                                    <span className="text-muted fs-11 ms-2 fw-normal">
                                                        {activity.data1}
                                                    </span>
                                                </h6>
                                                <p className="text-muted fs-12">
                                                    {activity.text}
                                                    <Link
                                                        href="#"
                                                        className="fw-semibold"
                                                    >
                                                        {" "}
                                                        {activity.text1}
                                                    </Link>
                                                </p>
                                            </div>
                                            <div className="ms-auto d-md-flex">
                                                <Link href="#">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                Edit
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <span className="fe fe-edit me-2 text-muted"></span>
                                                    </OverlayTrigger>
                                                </Link>
                                                <Link href="#">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                Delete
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <span className="fe fe-trash-2 text-muted"></span>
                                                    </OverlayTrigger>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6} lg={6} md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h3" className="fw-semibold">
                                    Browser Usage
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="browser-stats">
                                    <Row className="mb-4">
                                        <Col
                                            sm={2}
                                            lg={3}
                                            xl={3}
                                            xxl={2}
                                            className="mb-sm-0 mb-3"
                                        >
                                            <img
                                                src={Imagesdata("chrome")}
                                                className="img-fluid"
                                                alt="img"
                                            />
                                        </Col>
                                        <Col
                                            sm={10}
                                            lg={9}
                                            xl={9}
                                            xxl={10}
                                            className="ps-sm-0"
                                        >
                                            <div className="d-flex align-items-end justify-content-between mb-1">
                                                <h6 className="mb-1">Chrome</h6>
                                                <h6 className="fw-semibold mb-1">
                                                    35,502{" "}
                                                    <span className="text-success fs-11">
                                                        (
                                                        <i className="fe fe-arrow-up"></i>
                                                        12.75%)
                                                    </span>
                                                </h6>
                                            </div>
                                            <ProgressBar
                                                variant="primary"
                                                className="h-2 mb-3 "
                                                now={70}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col
                                            sm={2}
                                            lg={3}
                                            xl={3}
                                            xxl={2}
                                            className="mb-sm-0 mb-3"
                                        >
                                            <img
                                                src={Imagesdata("opera")}
                                                className="img-fluid"
                                                alt="img"
                                            />
                                        </Col>
                                        <Col
                                            sm={10}
                                            lg={9}
                                            xl={9}
                                            xxl={10}
                                            className="ps-sm-0"
                                        >
                                            <div className="d-flex align-items-end justify-content-between mb-1">
                                                <h6 className="mb-1">Opera</h6>
                                                <h6 className="fw-semibold mb-1">
                                                    12,563{" "}
                                                    <span className="text-danger fs-11">
                                                        (
                                                        <i className="fe fe-arrow-down"></i>
                                                        15.12%)
                                                    </span>
                                                </h6>
                                            </div>
                                            <ProgressBar
                                                variant="secondary"
                                                className="h-2 mb-3 "
                                                now={40}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col
                                            sm={2}
                                            lg={3}
                                            xl={3}
                                            xxl={2}
                                            className="mb-sm-0 mb-3"
                                        >
                                            <img
                                                src={Imagesdata("ie")}
                                                className="img-fluid"
                                                alt="img"
                                            />
                                        </Col>
                                        <Col
                                            sm={10}
                                            lg={9}
                                            xl={9}
                                            xxl={10}
                                            className="ps-sm-0"
                                        >
                                            <div className="d-flex align-items-end justify-content-between mb-1">
                                                <h6 className="mb-1">UC</h6>
                                                <h6 className="fw-semibold mb-1">
                                                    25,364{" "}
                                                    <span className="text-success fs-11">
                                                        (
                                                        <i className="fe fe-arrow-down"></i>
                                                        24.37%)
                                                    </span>
                                                </h6>
                                            </div>
                                            <ProgressBar
                                                variant="success"
                                                className="h-2 mb-3 "
                                                now={50}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col
                                            sm={2}
                                            lg={3}
                                            xl={3}
                                            xxl={2}
                                            className="mb-sm-0 mb-3"
                                        >
                                            <img
                                                src={Imagesdata("firefox")}
                                                className="img-fluid"
                                                alt="img"
                                            />
                                        </Col>
                                        <Col
                                            sm={10}
                                            lg={9}
                                            xl={9}
                                            xxl={10}
                                            className="ps-sm-0"
                                        >
                                            <div className="d-flex align-items-end justify-content-between mb-1">
                                                <h6 className="mb-1">
                                                    Firefox
                                                </h6>
                                                <h6 className="fw-semibold mb-1">
                                                    14,635{" "}
                                                    <span className="text-success fs-11">
                                                        (
                                                        <i className="fe fe-arrow-down"></i>
                                                        15.63%)
                                                    </span>
                                                </h6>
                                            </div>
                                            <ProgressBar
                                                variant="danger"
                                                className="h-2 mb-3 "
                                                now={50}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col
                                            sm={2}
                                            lg={3}
                                            xl={3}
                                            xxl={2}
                                            className="mb-sm-0 mb-3"
                                        >
                                            <img
                                                src={Imagesdata("edge")}
                                                className="img-fluid"
                                                alt="img"
                                            />
                                        </Col>
                                        <Col
                                            sm={10}
                                            lg={9}
                                            xl={9}
                                            xxl={10}
                                            className="ps-sm-0"
                                        >
                                            <div className="d-flex align-items-end justify-content-between mb-1">
                                                <h6 className="mb-1">Edge</h6>
                                                <h6 className="fw-semibold mb-1">
                                                    15,453{" "}
                                                    <span className="text-danger fs-11">
                                                        (
                                                        <i className="fe fe-arrow-down"></i>
                                                        23.70%)
                                                    </span>
                                                </h6>
                                            </div>
                                            <ProgressBar
                                                variant="warning"
                                                className="h-2 mb-3 "
                                                now={10}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col
                                            sm={2}
                                            lg={3}
                                            xl={3}
                                            xxl={2}
                                            className="mb-sm-0 mb-3"
                                        >
                                            <img
                                                src={Imagesdata("safari")}
                                                className="img-fluid"
                                                alt="img"
                                            />
                                        </Col>
                                        <Col
                                            sm={10}
                                            lg={9}
                                            xl={9}
                                            xxl={10}
                                            className="ps-sm-0"
                                        >
                                            <div className="d-flex align-items-end justify-content-between mb-1">
                                                <h6 className="mb-1">Safari</h6>
                                                <h6 className="fw-semibold mb-1">
                                                    10,054{" "}
                                                    <span className="text-success fs-11">
                                                        (
                                                        <i className="fe fe-arrow-up"></i>
                                                        11.04%)
                                                    </span>
                                                </h6>
                                            </div>
                                            <ProgressBar
                                                variant="info"
                                                className="h-2 mb-3 "
                                                now={40}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col
                                            sm={2}
                                            lg={3}
                                            xl={3}
                                            xxl={2}
                                            className="mb-sm-0 mb-3"
                                        >
                                            <img
                                                src={Imagesdata("netscape")}
                                                className="img-fluid"
                                                alt="img"
                                            />
                                        </Col>
                                        <Col
                                            sm={10}
                                            lg={9}
                                            xl={9}
                                            xxl={10}
                                            className="ps-sm-0"
                                        >
                                            <div className="d-flex align-items-end justify-content-between mb-1">
                                                <h6 className="mb-1">
                                                    Netscape
                                                </h6>
                                                <h6 className="fw-semibold mb-1">
                                                    35,502{" "}
                                                    <span className="text-success fs-11">
                                                        (
                                                        <i className="fe fe-arrow-up"></i>
                                                        12.75%)
                                                    </span>
                                                </h6>
                                            </div>
                                            <ProgressBar
                                                variant="green"
                                                className="h-2 mb-3 "
                                                now={30}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        </AppLayout>
    );
}

export default Dashboard;
