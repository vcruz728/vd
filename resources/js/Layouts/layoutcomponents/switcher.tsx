import { FC, Fragment, useEffect, useState } from "react";
import * as SwitcherData from "../../commondata/switcherdata";
import { Row } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import { Imagesdata } from "../../commondata/commonimages";

interface SwitcherProps {}

const Switcher: FC<SwitcherProps> = () => {
    useEffect(() => {
        SwitcherData.localStorageBackUp();
    });

    return (
        <Fragment>
            <div className="switcher-wrapper">
                <div className="demo_changer">
                    <div className="form_holder sidebar-right1">
                        <Row>
                            <div className="predefined_styles">
                                <div className="swichermainleft text-center">
                                    <div className="p-3 d-grid gap-2">
                                        <img
                                            src={Imagesdata("buapAzul")}
                                            alt="logo"
                                            style={{ border: "none" }}
                                        />
                                    </div>
                                </div>
                                <div className="swichermainleft">
                                    <h4>Barra de navegación</h4>
                                    <div className="skin-body">
                                        <div className="switch_section">
                                            <div className="switch-toggle d-flex">
                                                <span className="me-auto">
                                                    Menú Vertical
                                                </span>
                                                <p className="onoffswitch2">
                                                    <input
                                                        type="radio"
                                                        name="onoffswitch15"
                                                        id="myonoffswitch34"
                                                        className="onoffswitch2-checkbox"
                                                        defaultChecked
                                                        onClick={() =>
                                                            SwitcherData.VerticalMenu()
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="myonoffswitch34"
                                                        className="onoffswitch2-label"
                                                    ></label>
                                                </p>
                                            </div>
                                            <div className="switch-toggle d-flex mt-2">
                                                <span className="me-auto">
                                                    Menú de clic horizontal
                                                </span>
                                                <p className="onoffswitch2">
                                                    <input
                                                        type="radio"
                                                        name="onoffswitch15"
                                                        id="myonoffswitch35"
                                                        className="onoffswitch2-checkbox"
                                                        onClick={() =>
                                                            SwitcherData.Horizontal()
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="myonoffswitch35"
                                                        className="onoffswitch2-label"
                                                    ></label>
                                                </p>
                                            </div>
                                            <div className="switch-toggle d-flex mt-2">
                                                <span className="me-auto">
                                                    Menú flotante horizontal
                                                </span>
                                                <p className="onoffswitch2">
                                                    <input
                                                        type="radio"
                                                        name="onoffswitch15"
                                                        id="myonoffswitch111"
                                                        className="onoffswitch2-checkbox"
                                                        onClick={() =>
                                                            SwitcherData.HorizontalHoverMenu()
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="myonoffswitch111"
                                                        className="onoffswitch2-label"
                                                    ></label>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="swichermainleft">
                                    <h4>Estilos de ancho de diseño</h4>
                                    <div className="skin-body">
                                        <div className="switch_section">
                                            <div className="switch-toggle d-flex">
                                                <span className="me-auto">
                                                    Ancho completo
                                                </span>
                                                <p className="onoffswitch2">
                                                    <input
                                                        type="radio"
                                                        name="onoffswitch4"
                                                        id="myonoffswitch9"
                                                        className="onoffswitch2-checkbox"
                                                        defaultChecked
                                                        onClick={() =>
                                                            SwitcherData.FullWidth()
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="myonoffswitch9"
                                                        className="onoffswitch2-label"
                                                    ></label>
                                                </p>
                                            </div>
                                            <div className="switch-toggle d-flex mt-2">
                                                <span className="me-auto">
                                                    En caja
                                                </span>
                                                <p className="onoffswitch2">
                                                    <input
                                                        type="radio"
                                                        name="onoffswitch4"
                                                        id="myonoffswitch10"
                                                        className="onoffswitch2-checkbox"
                                                        onClick={() =>
                                                            SwitcherData.Boxed()
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="myonoffswitch10"
                                                        className="onoffswitch2-label"
                                                    ></label>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swichermainleft">
                                    <h4>Posición del encabezado</h4>
                                    <div className="skin-body">
                                        <div className="switch_section">
                                            <div className="switch-toggle d-flex">
                                                <span className="me-auto">
                                                    Fija
                                                </span>
                                                <p className="onoffswitch2">
                                                    <input
                                                        type="radio"
                                                        name="onoffswitch5"
                                                        id="myonoffswitch11"
                                                        className="onoffswitch2-checkbox"
                                                        defaultChecked
                                                        onClick={() =>
                                                            SwitcherData.Fixed()
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="myonoffswitch11"
                                                        className="onoffswitch2-label"
                                                    ></label>
                                                </p>
                                            </div>
                                            <div className="switch-toggle d-flex mt-2">
                                                <span className="me-auto">
                                                    Desplazable
                                                </span>
                                                <p className="onoffswitch2">
                                                    <input
                                                        type="radio"
                                                        name="onoffswitch5"
                                                        id="myonoffswitch12"
                                                        className="onoffswitch2-checkbox"
                                                        onClick={() =>
                                                            SwitcherData.Scrollable()
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="myonoffswitch12"
                                                        className="onoffswitch2-label"
                                                    ></label>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Switcher;
