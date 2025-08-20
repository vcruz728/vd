import { Worker, Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Col, Offcanvas } from "react-bootstrap";
import { getFullUrl } from "./url";
import { useEffect, useState } from "react";

const VerPdf = ({
    urlPdf,
    show,
    setShow,
    tipo,
}: {
    urlPdf: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    tipo?: string;
}) => {
    const [tema, setTema] = useState("light");

    useEffect(() => {
        if (document.querySelector("body")?.classList.contains("dark-mode")) {
            setTema("dark");
        } else {
            setTema("light");
        }
    });

    // 🔹 Función para construir correctamente la URL
    const buildUrl = (url: string) => {
        if (url.startsWith("http")) {
            return url;
        }
        if (url.startsWith("imprime")) {
            return getFullUrl(`/${url}`);
        }
        return getFullUrl(`/files/${url}`);
    };

    const finalUrl = buildUrl(urlPdf);
    console.log("Final PDF URL =>", finalUrl);

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            placement="end"
            className="ancho40"
        >
            <Offcanvas.Header>
                <a
                    href={finalUrl}
                    target="_BLANK"
                    className="btn btn-danger"
                    download
                >
                    Descargar archivo PDF
                </a>

                <button
                    className="btn btn-primary ms-2"
                    onClick={() => {
                        const printWindow = window.open(finalUrl, "_blank");
                        if (printWindow) {
                            printWindow.onload = function () {
                                printWindow.focus();
                                printWindow.print();
                            };
                        }
                    }}
                >
                    Imprimir PDF
                </button>
                <Offcanvas.Title></Offcanvas.Title>
                <span className="d-flex ms-auto" onClick={() => setShow(false)}>
                    <i className="fe fe-x ms-auto"></i>
                </span>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {tipo === "pdf" ? (
                    <Worker workerUrl={getFullUrl("/js/pdf.worker.min.js")}>
                        <Viewer theme={{ theme: tema }} fileUrl={finalUrl} />
                    </Worker>
                ) : (
                    <Col className="text-center">
                        <img src={finalUrl} alt="" />
                    </Col>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default VerPdf;
