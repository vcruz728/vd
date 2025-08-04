import { FormEventHandler, useState } from "react";
import { Form, InputGroup, Alert } from "react-bootstrap";
import { Link, useForm } from "@inertiajs/react";
import { Imagesdata } from "../../commondata/commonimages";

function SignIn({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [loading, setLoader] = useState(false);
    const [passwordshow, setPasswordshow] = useState(false);

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoader(true);
        post(route("login"), {
            onFinish: termina,
        });
    };

    const termina = () => {
        reset("password");
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
                                Inicia Sesión
                            </span>
                            {status && (
                                <Alert
                                    variant="success"
                                    className="alert-dismissible"
                                >
                                    <i
                                        className="fa fa-check-circle-o me-2"
                                        aria-hidden="true"
                                    ></i>
                                    {status}
                                </Alert>
                            )}
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
                                        placeholder="Contraseña"
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
                                <div className="container-login100-form-btn">
                                    <button
                                        className="login100-form-btn btn-primary"
                                        disabled={processing}
                                    >
                                        Ingresar
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
                            <div className="text-center pt-3">
                                <p className="text-dark mb-0 fs-13">
                                    ¿No recuerdadas tu contraseña?
                                    <Link
                                        href={route("password.request")}
                                        className="text-primary ms-1"
                                    >
                                        Recuperala
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
