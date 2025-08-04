import React from "react";

const TituloCard = ({
    titulo,
    obligatorio,
}: {
    titulo: string;
    obligatorio: boolean;
}) => {
    return (
        <>
            {titulo}

            {obligatorio ? (
                <small style={{ display: "inline" }}>
                    <p
                        style={{
                            color: "red",
                            display: "inline",
                        }}
                    >
                        *
                    </p>
                    campos obligatorios
                </small>
            ) : null}
        </>
    );
};

export default TituloCard;
