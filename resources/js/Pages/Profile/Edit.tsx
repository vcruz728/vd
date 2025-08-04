import AppLayout from "../../Layouts/app";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState, Fragment, useRef } from "react";
import { Card, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import PageHeader from "../../Layouts/layoutcomponents/pageHeader";
import { Imagesdata } from "../../commondata/commonimages";
import InputError from "../InputError";
import { toast } from "react-hot-toast";

export default function UpdateProfileInformation() {
    const user = usePage().props.auth.user;
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [loading, setLoader] = useState(false);
    const [passwordshow, setpasswordshow] = useState(false);
    const [passwordshow1, setpasswordshow1] = useState(false);
    const [passwordshow2, setpasswordshow2] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: fSuccess,
            onError: (errors) => {
                if (errors.password) {
                    reset("password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
            onFinish: termina,
        });
    };

    const fSuccess = () => {
        reset();
        setLoader(false);
        toast("Correcto: Contraseña actualizada correctamente.", {
            style: {
                padding: "16px",
                color: "#fff",
                backgroundColor: "#29bf74",
            },
            position: "top-center",
        });
    };

    const termina = () => {
        setLoader(false);
    };

    return (
        <AppLayout>
            <Fragment>
                <PageHeader
                    titles="Editar perfil"
                    active="Editar perfil"
                    items={["Dashboard"]}
                />
                <Row>
                    <Col xl={4}></Col>
                    <Col xl={4}>
                        <form
                            onSubmit={updatePassword}
                            className="mt-6 space-y-6"
                        >
                            <Card>
                                <Card.Header>
                                    <Card.Title>Cambiar contraseña</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="text-center chat-image mb-5">
                                        <div className="avatar avatar-xxl chat-profile mb-3 brround">
                                            <div className="">
                                                <img
                                                    alt="avatar"
                                                    src={Imagesdata("user")}
                                                    className="brround"
                                                />
                                            </div>
                                        </div>
                                        <div className="main-chat-msg-name">
                                            <div>
                                                <h5 className="mb-1 text-dark fw-semibold">
                                                    {user.name}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Form.Group>
                                            <Form.Label>
                                                Contraseña actual
                                            </Form.Label>
                                            <InputGroup
                                                className="wrap-input100 validate-input"
                                                id="Password-toggle"
                                            >
                                                <div
                                                    className="input-group-text bg-white text-muted p-3"
                                                    onClick={() =>
                                                        setpasswordshow(
                                                            !passwordshow
                                                        )
                                                    }
                                                >
                                                    <i
                                                        className={`zmdi ${
                                                            passwordshow
                                                                ? "zmdi-eye"
                                                                : "zmdi-eye-off"
                                                        } text-muted`}
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                                <Form.Control
                                                    className="input100"
                                                    type={
                                                        passwordshow
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    id="current_password"
                                                    name="current_password"
                                                    placeholder="Contraseña"
                                                    value={
                                                        data.current_password
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "current_password",
                                                            e.target.value
                                                        )
                                                    }
                                                    autoComplete="current-password"
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <InputError
                                            className="mt-2"
                                            message={errors.current_password}
                                        />
                                    </div>
                                    <Form.Group>
                                        <Form.Label>
                                            Nueva contraseña
                                        </Form.Label>
                                        <InputGroup
                                            className="wrap-input100 validate-input"
                                            id="Password-toggle1"
                                        >
                                            <div
                                                className="input-group-text bg-white text-muted"
                                                onClick={() =>
                                                    setpasswordshow1(
                                                        !passwordshow1
                                                    )
                                                }
                                            >
                                                <i
                                                    className={`zmdi ${
                                                        passwordshow1
                                                            ? "zmdi-eye"
                                                            : "zmdi-eye-off"
                                                    } text-muted`}
                                                ></i>
                                            </div>
                                            <Form.Control
                                                className="input100"
                                                type={
                                                    passwordshow1
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password"
                                                name="password"
                                                placeholder="Contraseña"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <InputError
                                        className="mt-2"
                                        message={errors.password}
                                    />

                                    <Form.Group>
                                        <Form.Label>
                                            Confirma contraseña
                                        </Form.Label>
                                        <InputGroup
                                            className="wrap-input100 validate-input"
                                            id="Password-toggle2"
                                        >
                                            <div
                                                className="input-group-text bg-white text-muted"
                                                onClick={() =>
                                                    setpasswordshow2(
                                                        !passwordshow2
                                                    )
                                                }
                                            >
                                                <i
                                                    className={`zmdi ${
                                                        passwordshow2
                                                            ? "zmdi-eye"
                                                            : "zmdi-eye-off"
                                                    } text-muted`}
                                                    aria-hidden="true"
                                                ></i>
                                            </div>
                                            <Form.Control
                                                className="input100"
                                                type={
                                                    passwordshow2
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                placeholder="Contraseña"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <InputError
                                        className="mt-2"
                                        message={errors.password_confirmation}
                                    />
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <button
                                        className="btn btn-primary me-1"
                                        disabled={processing}
                                    >
                                        Actualizar
                                        {loading ? (
                                            <span
                                                role="status"
                                                aria-hidden="true"
                                                className="spinner-border spinner-border-sm ms-2"
                                            ></span>
                                        ) : (
                                            ""
                                        )}
                                    </button>

                                    <Link
                                        href="#"
                                        className="btn btn-danger me-1"
                                    >
                                        Cancelar
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </form>
                    </Col>
                    <Col xl={4}></Col>
                </Row>
            </Fragment>
        </AppLayout>
    );
}
