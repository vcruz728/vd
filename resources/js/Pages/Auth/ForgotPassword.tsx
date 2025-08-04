import { FormEventHandler, useState } from "react";
import { Form, InputGroup, Alert } from "react-bootstrap";
import { Link, useForm } from "@inertiajs/react";
import { Imagesdata } from "../../commondata/commonimages";

function SignIn({ status }: { status?: string }) {
    const [loading, setLoader] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoader(true);
        post(route("password.email"), {
            onFinish: termina,
        });
    };

    const termina = () => {
        setLoader(false);
    };

    return (
        <div className="login-img">
            <div className="page">
                <div className="mx-auto mt-7">
                    <div className="text-center">
                        <p style={{ color: "white" }}>
                            ¿Olvidaste tu contraseña? No hay problema.
                            Simplemente indícanos tu correo electrónico y te
                            enviaremos un enlace para restablecer tu contraseña.
                            Podrás elegir una nueva.
                        </p>
                    </div>
                </div>
                <div className="container-login100">
                    <div className="wrap-login100 p-6" style={{ width: "25%" }}>
                        <div className="login100-form validate-form">
                            {status && (
                                <Alert
                                    variant="success"
                                    className="alert-dismissible"
                                >
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
                                <div className="container-login100-form-btn">
                                    <button
                                        className="login100-form-btn btn-primary"
                                        disabled={processing}
                                    >
                                        Enviar enlace
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

export default SignIn;
