import { FormEventHandler, useState } from "react";
import { Form, InputGroup, Alert } from "react-bootstrap";
import { Link, useForm } from "@inertiajs/react";
import { Imagesdata } from "../../commondata/commonimages";

function ResetPassword({ token, email }: { token: string; email: string }) {
    const [loading, setLoader] = useState(false);
    const [passwordshow, setPasswordshow] = useState(false);
    const [passwordshowDos, setPasswordshowDos] = useState(false);

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoader(true);
        post(route("password.store"), {
            onFinish: termina,
        });
    };

    const termina = () => {
        reset("password", "password_confirmation");
        setLoader(false);
    };

    return (
        <div className="login-img">
            <div className="page">
                <div className="col-login mx-auto mt-7">
                    <div className="text-center">
                        <img
                            src={Imagesdata("buapBlanco")}
                            className="header-brand-img"
                            alt=""
                        />
                    </div>
                </div>
                <div className="container-login100">
                    <div className="wrap-login100 p-6">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title pb-5 mt-5">
                                {" "}
                                Reinicia contraseña
                            </span>
                            <form onSubmit={submit}>
                                <div
                                    className="wrap-input100 validate-input input-group"
                                    data-bs-validate="Valid email is required: ex@abc.xyz"
                                >
                                    <Link
                                        href="#"
                                        className="input-group-text bg-white text-muted"
                                    >
                                        <i
                                            className="zmdi zmdi-email text-muted"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                    <Form.Control
                                        className="input100 border-start-0 form-control ms-0"
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.email && (
                                    <Alert
                                        variant="danger"
                                        className="alert-dismissible"
                                    >
                                        <i
                                            className="fa fa-frown-o me-2"
                                            aria-hidden="true"
                                        ></i>
                                        {errors.email}
                                    </Alert>
                                )}
                                <InputGroup
                                    className="wrap-input100 validate-input"
                                    id="Password-toggle"
                                >
                                    <InputGroup.Text
                                        id="basic-addon2"
                                        onClick={() =>
                                            setPasswordshow(!passwordshow)
                                        }
                                        className="bg-white p-0"
                                    >
                                        <div className="bg-white text-muted p-3">
                                            <i
                                                className={`zmdi ${
                                                    passwordshow
                                                        ? "zmdi-eye"
                                                        : "zmdi-eye-off"
                                                } text-muted`}
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={
                                            passwordshow ? "text" : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="Nueva contraseña"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                </InputGroup>
                                {errors.password && (
                                    <Alert
                                        variant="danger"
                                        className="alert-dismissible"
                                    >
                                        <i
                                            className="fa fa-frown-o me-2"
                                            aria-hidden="true"
                                        ></i>
                                        {errors.password}
                                    </Alert>
                                )}

                                <InputGroup
                                    className="wrap-input100 validate-input"
                                    id="Password-toggle"
                                >
                                    <InputGroup.Text
                                        id="basic-addon2"
                                        onClick={() =>
                                            setPasswordshowDos(!passwordshowDos)
                                        }
                                        className="bg-white p-0"
                                    >
                                        <div className="bg-white text-muted p-3">
                                            <i
                                                className={`zmdi ${
                                                    passwordshowDos
                                                        ? "zmdi-eye"
                                                        : "zmdi-eye-off"
                                                } text-muted`}
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={
                                            passwordshowDos
                                                ? "text"
                                                : "password"
                                        }
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        placeholder="Confirma contraseña"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </InputGroup>
                                {errors.password_confirmation && (
                                    <Alert
                                        variant="danger"
                                        className="alert-dismissible"
                                    >
                                        <i
                                            className="fa fa-frown-o me-2"
                                            aria-hidden="true"
                                        ></i>
                                        {errors.password_confirmation}
                                    </Alert>
                                )}

                                <div className="container-login100-form-btn">
                                    <button
                                        className="login100-form-btn btn-primary"
                                        disabled={processing}
                                    >
                                        Restablecer contraseña
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
