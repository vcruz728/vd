const base = import.meta.env.VITE_APP_URL;

export const MENUITEMS = [
    {
        menutitle: "Oficios",
        rol: [1, 2, 3, 4, 5, 6],
        Items: [
            {
                path: `${base}/oficios/listado-oficio`,
                icon: "fa fa-folder",
                type: "link",
                title: "Listado",
                rol: [1, 2],
            },
            {
                path: `${base}/oficios/recepcion-oficio`,
                icon: "fa fa-plus-circle",
                type: "link",
                title: "Nuevo Oficio",
                rol: [1, 2],
            },
            {
                path: `${base}/oficios/mis-oficios`,
                icon: "fa fa-folder",
                type: "link",
                title: "Mis oficios",
                rol: [1, 3, 4, 6],
            },
            {
                path: `${base}/oficios/respuestas`,
                icon: "fa fa-folder",
                type: "link",
                title: "Oficios",
                rol: [1, 5],
            },
            {
                path: `${base}/oficios/nuevo-oficio/0`,
                icon: "fa fa-file-pdf-o",
                type: "link",
                title: "Nuevo oficio",
                rol: [1, 3, 4, 5],
            },
        ],
    },
    {
        menutitle: "Catalogos",
        rol: [1, 3, 4, 5],
        Items: [
            {
                path: `${base}/catalogos/destinatarios-externos`,
                icon: "fa fa-group",
                type: "link",
                title: "Destinatarios Externos",
                rol: [1, 3, 4, 5],
            },
        ],
    },
];
