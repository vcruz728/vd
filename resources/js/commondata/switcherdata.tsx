//FULLWIDTH
export const FullWidth = () => {
    document.querySelector(".app")?.classList.remove("layout-boxed");
    document.querySelector(".app")?.classList.add("layout-fullwidth");

    localStorage.setItem("sashlayoutfullwidth", "true");
    localStorage.removeItem("sashlayoutboxed");
    let myonoffswitch9 = document.querySelector(
        "#myonoffswitch9"
    ) as HTMLInputElement;
    myonoffswitch9.checked = true;
};
//BOXED
export const Boxed = () => {
    document.querySelector(".app")?.classList.remove("layout-fullwidth");
    document.querySelector(".app")?.classList.add("layout-boxed");

    localStorage.setItem("sashlayoutboxed", "true");
    localStorage.removeItem("sashlayoutfullwidth");
    let myonoffswitch10 = document.querySelector(
        "#myonoffswitch10"
    ) as HTMLInputElement;
    myonoffswitch10.checked = true;
};
//FIXED
export const Fixed = () => {
    document.querySelector(".app")?.classList.remove("scrollable-layout");
    document.querySelector(".app")?.classList.add("fixed-layout");

    localStorage.setItem("sashfixedlayout", "true");
    localStorage.removeItem("sashscrollablelayout");
    let myonoffswitch11 = document.querySelector(
        "#myonoffswitch11"
    ) as HTMLInputElement;
    myonoffswitch11.checked = true;
};
//SCROLLABLE
export const Scrollable = () => {
    document.querySelector(".app")?.classList.remove("fixed-layout");
    document.querySelector(".app")?.classList.add("scrollable-layout");

    localStorage.setItem("sashscrollablelayout", "true");
    localStorage.removeItem("sashfixedlayout");
    let myonoffswitch12 = document.querySelector(
        "#myonoffswitch12"
    ) as HTMLInputElement;
    myonoffswitch12.checked = true;
};

//VERTICALMENU
export const VerticalMenu = () => {
    document.querySelector(".app")?.classList.add("sidebar-mini");
    document.querySelector(".header")?.classList.add("app-header");
    document.querySelector(".main-content")?.classList.add("app-content");
    document.querySelector(".main-container")?.classList.add("container-fluid");

    document.querySelector(".app")?.classList.remove("horizontal");
    document.querySelector(".app")?.classList.remove("horizontal-hover");
    document.querySelector(".app-sidebar")?.classList.remove("horizontal-main");
    document.querySelector(".header")?.classList.remove("hor-header");
    document.querySelector(".main-sidemenu")?.classList.remove("container");
    document.querySelector(".main-container")?.classList.remove("container");
    document.querySelector(".main-content")?.classList.remove("hor-content");
    document.querySelector(".side-app")?.classList.remove("container");

    localStorage.removeItem("sashhorizontal");
    localStorage.setItem("sashvertical", "true");
    localStorage.removeItem("sashhorizontalHover");
};
//HORIZONTALMENU
export const Horizontal = () => {
    document.querySelector(".sideboot")?.classList.add("mega-slide-menu");
    document.querySelector(".app")?.classList.add("horizontal");
    document.querySelector(".main-container")?.classList.add("container");
    document.querySelector(".main-sidemenu")?.classList.add("container");
    document.querySelector(".main-content")?.classList.add("hor-content");
    document.querySelector(".app-sidebar")?.classList.add("horizontal-main");
    document.querySelector(".header")?.classList.add("hor-header");
    document.querySelector(".side-app")?.classList.add("container");
    // document.querySelector(".app-sidebar")?.classList.add("fixed-header");
    // document.querySelector(".sticky")?.classList.add("stickyClass");

    document.querySelector(".app")?.classList.remove("sidebar-mini");
    document.querySelector(".header")?.classList.remove("app-header");
    document.querySelector(".main-content")?.classList.remove("app-content");
    document
        .querySelector(".main-container")
        ?.classList.remove("container-fluid");
    document.querySelector(".app")?.classList.remove("sidenav-toggled");
    document.querySelector(".app")?.classList.remove("horizontal-hover");

    document
        .querySelector(".horizontal .side-menu")
        ?.classList.add("flex-nowrap");

    checkHoriMenu();
    Horizontalmenudefultclose();
    switcherArrowFn();

    localStorage.removeItem("sashvertical");
    localStorage.setItem("sashhorizontal", "true");
    localStorage.removeItem("sashhorizontalHover");
};
//HORIZONTALHOVERMENU
export const HorizontalHoverMenu = () => {
    document.querySelector(".app")?.classList.add("horizontal-hover");
    document.querySelector(".app")?.classList.add("horizontal");
    document.querySelector(".main-content")?.classList.add("hor-content");
    document.querySelector(".main-container")?.classList.add("container");
    document.querySelector(".header")?.classList.add("hor-header");
    document.querySelector(".app-sidebar")?.classList.add("horizontal-main");
    document.querySelector(".main-sidemenu")?.classList.add("container");
    document.querySelector(".side-app")?.classList.add("container");

    document.querySelector("#slide-left")?.classList.remove("d-none");
    document.querySelector("#slide-right")?.classList.remove("d-none");
    document.querySelector(".header")?.classList.remove("app-header");
    document.querySelector(".main-content")?.classList.remove("app-content");
    document
        .querySelector(".main-container")
        ?.classList.remove("container-fluid");
    document.querySelector(".app")?.classList.remove("sidebar-mini");
    document.querySelector(".app")?.classList.remove("sidenav-toggled");

    document
        .querySelector(".horizontal-hover .side-menu")
        ?.classList.add("flex-nowrap");
    let li = document.querySelectorAll(".side-menu li");

    li.forEach((e: any, _i) => {
        if (e?.classList.contains("is-expaned")) {
            let ele = [...e.children];
            ele.forEach((el, _i) => {
                el?.classList.remove("active");
                if (el?.classList.contains("slide-menu")) {
                    el.style = "";
                    el.style.display = "none";
                }
            });
            e?.classList.remove("is-expaned");
        }
    });

    checkHoriMenu();
    Horizontalmenudefultclose();
    switcherArrowFn();

    localStorage.removeItem("sashvertical");
    localStorage.setItem("sashhorizontalHover", "true");
    localStorage.removeItem("sashhorizontal");
};

// Color theme
export const LightTheme = () => {
    document.querySelector(".app")?.classList.add("light-mode");
    document.querySelector(".app")?.classList.remove("transparent-mode");
    document.querySelector(".app")?.classList.remove("dark-mode");
    document.querySelector("body")?.classList.remove("dark-header");
    document.querySelector("body")?.classList.remove("color-header");
    document.querySelector("body")?.classList.remove("gradient-header");
    document.querySelector("body")?.classList.remove("dark-menu");
    document.querySelector("body")?.classList.remove("color-menu");
    document.querySelector("body")?.classList.remove("gradient-menu");

    let html: any = document.querySelector("html");
    html.style = "";
    localStorage.removeItem("Sashdarktheme");

    localStorage.setItem("sashlighttheme", "true");
    localStorage.removeItem("sashtransperenttheme");
};

export const dark = () => {
    document.querySelector("body")?.classList.add("dark-mode");
    document.querySelector("body")?.classList.remove("transparent-mode");
    document.querySelector("body")?.classList.remove("light-mode");
    document.querySelector("body")?.classList.remove("header-light");
    document.querySelector("body")?.classList.remove("color-header");
    document.querySelector("body")?.classList.remove("gradient-header");
    document.querySelector("body")?.classList.remove("light-menu");
    document.querySelector("body")?.classList.remove("color-menu");
    document.querySelector("body")?.classList.remove("gradient-menu");

    localStorage.setItem("sashdarktheme", "true");
    localStorage.removeItem("sashlightmode");
    localStorage.removeItem("sashlightheader");
    localStorage.removeItem("sashlighmenu");
};

export function checkHoriMenu() {
    let menuWidth: any = document.querySelector(".horizontal-main");
    let menuItems: any = document.querySelector(".side-menu");
    let mainSidemenuWidth: any = document.querySelector(".main-sidemenu");

    let menuContainerWidth =
        menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    let marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
    );
    let marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginRight.split("px")[0])
    );
    let check =
        menuItems.scrollWidth +
        (0 - menuWidth?.offsetWidth) +
        menuContainerWidth;

    if (document.querySelector(".app")?.classList.contains("ltr")) {
        menuItems.style.marginRight = 0;
    } else {
        menuItems.style.marginLeft = 0;
    }

    if (
        menuItems.scrollWidth - 2 <
        menuWidth?.offsetWidth - menuContainerWidth
    ) {
        document.querySelector(".slide-left")?.classList.add("d-none");
        document.querySelector(".slide-right")?.classList.add("d-none");
        document.querySelector(".slide-leftRTL")?.classList.add("d-none");
        document.querySelector(".slide-rightRTL")?.classList.add("d-none");
    } else if (marginLeftValue !== 0 || marginRightValue !== 0) {
        document.querySelector(".slide-right")?.classList.remove("d-none");
        document.querySelector(".slide-rightRTL")?.classList.remove("d-none");
    } else if (marginLeftValue !== -check || marginRightValue !== -check) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
    }
    if (
        menuItems.scrollWidth - 2 >
        menuWidth?.offsetWidth - menuContainerWidth
    ) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-right")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
        document.querySelector(".slide-rightRTL")?.classList.remove("d-none");
    }
    if (marginLeftValue === 0 || marginRightValue === 0) {
        document.querySelector(".slide-left")?.classList.add("d-none");
        document.querySelector(".slide-leftRTL")?.classList.add("d-none");
    }
    if (marginLeftValue !== 0 || marginRightValue !== 0) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
    }
}

export function handleThemeUpdate(cssVars: any) {
    const root: any = document.querySelector(":root");
    const keys = Object.keys(cssVars);

    keys.forEach((key) => {
        root.style.setProperty(key, cssVars[key]);
    });
}

// COLOUR VARIABLE

//   LOCAL STORAGE BACK-UP

export function localStorageBackUp() {
    let html = document.querySelector("html")?.style;
    let body = document.querySelector("body");

    if (localStorage.getItem("sashlayoutfullwidth")) {
        FullWidth();
    }
    if (localStorage.getItem("sashlayoutboxed")) {
        Boxed();
    }
    if (localStorage.getItem("sashfixedlayout")) {
        Fixed();
    }
    if (localStorage.getItem("sashscrollablelayout")) {
        Scrollable();
    }
    if (localStorage.getItem("sashdarktheme")) {
        dark();
    }
    if (localStorage.getItem("sashprimaryColor") !== null) {
        body?.classList.add("light-mode");

        body?.classList.remove("dark-mode");
        body?.classList.remove("transparent-mode");
        html?.setProperty(
            "--primary-bg-color",
            localStorage.getItem("sashprimaryColor")
        );
        html?.setProperty(
            "--primary-bg-hover",
            localStorage.getItem("sashprimaryHoverColor")
        );
        html?.setProperty(
            "--primary-bg-border",
            localStorage.getItem("sashprimaryBorderColor")
        );
    }
    if (localStorage.getItem("sashdarkPrimaryColor") !== null) {
        body?.classList.add("dark-mode");

        let ltr = document.getElementById("myonoffswitch2") as HTMLInputElement;
        ltr.checked = true;

        body?.classList.remove("light-mode");
        body?.classList.remove("transparent-mode");

        html?.setProperty(
            "--primary-bg-color",
            localStorage.getItem("sashdarkPrimaryColor")
        );
        html?.setProperty(
            "--primary-bg-hover",
            localStorage.getItem("sashdarkPrimaryColor")
        );
        html?.setProperty(
            "--primary-bg-border",
            localStorage.getItem("sashdarkPrimaryColor")
        );
    }
    if (localStorage.getItem("sashtransparentPrimaryColor") !== null) {
        body?.classList.add("transparent-mode");
        document.getElementById("myonoffswitchTransparent");

        body?.classList.remove("light-mode");
        body?.classList.remove("dark-mode");
        html?.setProperty(
            "--primary-bg-color",
            localStorage.getItem("sashtransparentPrimaryColor")
        );
    }
    if (localStorage.getItem("sashtransparentBgColor") !== null) {
        body?.classList.add("transparent-mode");
        document.getElementById("myonoffswitchTransparent");

        body?.classList.remove("light-mode");
        body?.classList.remove("dark-mode");
        html?.setProperty(
            "--transparent-body",
            localStorage.getItem("sashtransparentBgColor")
        );
    }
    if (
        localStorage.getItem("sashtransparent-bgImgPrimaryColor") !== null ||
        localStorage.getItem("sashBgImage") !== null
    ) {
        body?.classList.add("transparent-mode");
        document.getElementById("myonoffswitchTransparent");

        body?.classList.remove("light-mode");
        body?.classList.remove("dark-mode");
        let img: any = localStorage.getItem("sashBgImage");
        html?.setProperty(
            "--primary-bg-color",
            localStorage.getItem("sashtransparent-bgImgPrimaryColor")
        );
        body?.classList.add(img);
    }

    if (localStorage.sashrtl) {
        document.querySelector(".app")?.classList.add("rtl");
        document.querySelector("html[lang=en]")?.setAttribute("dir", "rtl");
        document.querySelector(".app")?.classList.remove("ltr");
        let mySwitch = document.querySelector(
            "#myonoffswitch23"
        ) as HTMLInputElement;
        mySwitch.checked = false;
        let myonoffswitch = document.querySelector(
            "#myonoffswitch24"
        ) as HTMLInputElement;
        myonoffswitch.checked = true;
    }

    if (localStorage.sashhorizontal) {
        document.querySelector("body")?.classList.add("horizontal");
        document.querySelector(".main-container")?.classList.add("container");
        document.querySelector(".main-sidemenu")?.classList.add("container");
        document.querySelector(".main-content")?.classList.add("hor-content");
        document
            .querySelector(".app-sidebar")
            ?.classList.add("horizontal-main");
        document.querySelector(".header")?.classList.add("hor-header");
        document.querySelector(".side-app")?.classList.add("container");
        document.querySelector(".app")?.classList.remove("sidebar-mini");
        document.querySelector(".header")?.classList.remove("app-header");
        document
            .querySelector(".main-content")
            ?.classList.remove("app-content");
        document
            .querySelector(".main-container")
            ?.classList.remove("container-fluid");
        document.querySelector(".app")?.classList.remove("sidenav-toggled");
        document.querySelector(".app")?.classList.remove("horizontal-hover");
        document
            .querySelector(".horizontal .side-menu")
            ?.classList.add("flex-nowrap");

        let mySwitch = document.querySelector(
            "#myonoffswitch34"
        ) as HTMLInputElement;
        mySwitch.checked = false;
        let myonoffswitch = document.querySelector(
            "#myonoffswitch35"
        ) as HTMLInputElement;
        myonoffswitch.checked = true;
        checkHoriMenu();
        Horizontalmenudefultclose();
        switcherArrowFn();
    }

    if (localStorage.sashhorizontalHover) {
        document.querySelector("body")?.classList.add("horizontal-hover");
        document.querySelector(".app")?.classList.add("horizontal-hover");
        document.querySelector(".app")?.classList.add("horizontal");
        document.querySelector(".main-content")?.classList.add("hor-content");
        document.querySelector(".main-container")?.classList.add("container");
        document.querySelector(".header")?.classList.add("hor-header");
        document
            .querySelector(".app-sidebar")
            ?.classList.add("horizontal-main");
        document.querySelector(".main-sidemenu")?.classList.add("container");
        document.querySelector(".side-app")?.classList.add("container");

        document.querySelector("#slide-left")?.classList.remove("d-none");
        document.querySelector("#slide-right")?.classList.remove("d-none");
        document
            .querySelector(".main-content")
            ?.classList.remove("app-content");
        document
            .querySelector(".main-container")
            ?.classList.remove("container-fluid");
        let myonoffswitch = document.querySelector(
            "#myonoffswitch1"
        ) as HTMLInputElement;
        myonoffswitch.checked = false;
        let myonoffswitcher = document.querySelector(
            "#myonoffswitch2"
        ) as HTMLInputElement;
        myonoffswitcher.checked = false;
        let HorizontalHover = document.querySelector(
            "#myonoffswitch111"
        ) as HTMLInputElement;
        HorizontalHover.checked = true;
        document.querySelector(".header")?.classList.remove("app-header");
        document.querySelector(".app")?.classList.remove("sidebar-mini");
        document.querySelector(".app")?.classList.remove("sidenav-toggled");

        document
            .querySelector(".horizontal .side-menu")
            ?.classList.add("nowrap");

        let li = document.querySelectorAll(".side-menu li");
        li.forEach((e: any, _i) => {
            if (e?.classList.contains("is-expaned")) {
                let ele = [...e.children];
                ele.forEach((el, _i) => {
                    el?.classList.remove("active");
                    if (el?.classList.contains("slide-menu")) {
                        el.style = "";
                        el.style.display = "none";
                    }
                });
                e?.classList.remove("is-expaned");
            }
        });
        checkHoriMenu();
        Horizontalmenudefultclose();
        switcherArrowFn();
    }

    if (localStorage.getItem("sashlighttheme") !== null) {
        LightTheme();
    }
}
//HORIZONTAL ARROWS
window.addEventListener("resize", () => {
    if (
        document.querySelector(".login-img") &&
        document.querySelector(".error-bg")
    ) {
        let menuWidth: any = document.querySelector(".main-sidemenu");
        let menuItems: any = document.querySelector(".side-menu");
        let mainSidemenuWidth: any = document.querySelector(".main-sidemenu");
        let menuContainerWidth =
            menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
        let marginLeftValue = Math.ceil(
            Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
        );
        let marginRightValue = Math.ceil(
            Number(
                window.getComputedStyle(menuItems).marginRight.split("px")[0]
            )
        );
        let check =
            menuItems.scrollWidth +
            (0 - menuWidth?.offsetWidth) +
            menuContainerWidth;
        if (menuWidth?.offsetWidth > menuItems.scrollWidth) {
            document.querySelector(".slide-left")?.classList.add("d-none");
            document.querySelector(".slide-right")?.classList.add("d-none");
        } else {
            document.querySelector(".slide-left")?.classList.remove("d-none");
            document.querySelector(".slide-right")?.classList.remove("d-none");
        }
        if (menuWidth?.offsetWidth > menuItems.scrollWidth) {
            document.querySelector(".slide-leftRTL")?.classList.add("d-none");
            document.querySelector(".slide-rightRTL")?.classList.add("d-none");
        }
        // to check and adjst the menu on screen size change
        if (document.querySelector("body")?.classList.contains("ltr")) {
            if (
                marginLeftValue >= -check === false &&
                menuWidth?.offsetWidth - menuContainerWidth <
                    menuItems.scrollWidth
            ) {
                menuItems.style.marginLeft = -check;
            } else {
                menuItems.style.marginLeft = 0;
            }
        } else {
            if (
                marginRightValue > -check === false &&
                menuWidth?.offsetWidth < menuItems.scrollWidth
            ) {
                menuItems.style.marginRight = -check;
            } else {
                menuItems.style.marginRight = 0;
            }
        }

        if (document.querySelector("body")?.classList.contains("rtl")) {
            if (
                marginRightValue >= -check === false &&
                menuWidth?.offsetWidth - menuContainerWidth <
                    menuItems.scrollWidth
            ) {
                menuItems.style.marginRight = -check;
            } else {
                menuItems.style.marginRight = 0;
            }
        } else {
            if (
                marginLeftValue > -check === false &&
                menuWidth?.offsetWidth < menuItems.scrollWidth
            ) {
                menuItems.style.marginLeft = -check;
            } else {
                menuItems.style.marginLeft = 0;
            }
        }
    }
});

// SWITCHER ARROW FUNCTION

export function switcherArrowFn() {
    let slideLeftLTR: any = document.querySelector(".slide-left");
    let slideRightLTR: any = document.querySelector(".slide-right");

    slideLeftLTR?.addEventListener("click", () => {
        slideClick();
    });
    slideRightLTR?.addEventListener("click", () => {
        slideClick();
    });

    // used to remove is-expanded class and remove class on clicking arrow buttons
    function slideClick() {
        let slide = document.querySelectorAll(".slide");
        let sideMenuitem = document.querySelectorAll(".slide-menu__item");
        let slideMenu = document.querySelectorAll(".slide-menu");
        slide.forEach((element, _index) => {
            if (element?.classList.contains("is-expanded") === true) {
                element?.classList.remove("is-expanded");
            }
        });
        sideMenuitem.forEach((element, _index) => {
            if (element?.classList.contains("active") === true) {
                element?.classList.remove("active");
            }
        });
        slideMenu.forEach((element, _index) => {
            if (element) {
                element.classList.add("d-none");
            }
        });
    }

    // horizontal arrows

    window.addEventListener("resize", () => {
        let menuWidth: any = document.querySelector(".horizontal-main");
        let menuItems: any = document.querySelector(".side-menu");
        let mainSidemenuWidth: any = document.querySelector(".main-sidemenu");
        let menuContainerWidth =
            menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
        let marginLeftValue = Math.ceil(
            Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
        );
        let marginRightValue = Math.ceil(
            Number(
                window.getComputedStyle(menuItems).marginRight.split("px")[0]
            )
        );
        let check =
            menuItems.scrollWidth +
            (0 - menuWidth?.offsetWidth) +
            menuContainerWidth;

        if (
            menuWidth?.offsetWidth - menuContainerWidth >
            menuItems.scrollWidth
        ) {
            document.querySelector(".slide-left")?.classList.add("d-none");
            document.querySelector(".slide-right")?.classList.add("d-none");
            menuItems.style.marginRight = 0;
            menuItems.style.marginLeft = 0;
        } else {
            document.querySelector(".slide-right")?.classList.remove("d-none");
        }

        if (document.querySelector("html")?.getAttribute("dir") === "rtl") {
            if (
                Math.abs(marginRightValue) < Math.abs(check) === false &&
                menuWidth?.offsetWidth - menuContainerWidth <
                    menuItems.scrollWidth
            ) {
                menuItems.style.marginRight = -check + "px";
                document
                    .querySelector(".slide-left")
                    ?.classList.remove("d-none");
            } else {
                menuItems.style.marginRight = 0;
            }
        } else {
            if (
                Math.abs(marginLeftValue) < Math.abs(check) === false &&
                menuWidth?.offsetWidth - menuContainerWidth <
                    menuItems.scrollWidth
            ) {
                menuItems.style.marginLeft = -check + "px";
                document.querySelector(".slide-right")?.classList.add("d-none");
            } else {
                menuItems.style.marginLeft = 0;
            }
        }
    });

    if (
        !document.querySelector("body")?.classList.contains("login-img") &&
        !document.querySelector("body")?.classList.contains("error-bg")
    ) {
        checkHoriMenu();
    }

    slideLeftLTR.addEventListener("click", () => {
        slideClick();
        let menuWidth: any = document.querySelector(".horizontal-main");
        let menuItems: any = document.querySelector(".side-menu");
        let mainSidemenuWidth: any = document.querySelector(".main-sidemenu");
        let menuContainerWidth =
            menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
        let marginLeftValue =
            Math.ceil(
                Number(
                    window.getComputedStyle(menuItems).marginLeft.split("px")[0]
                )
            ) + 100;
        let marginRightValue =
            Math.ceil(
                Number(
                    window
                        .getComputedStyle(menuItems)
                        .marginRight.split("px")[0]
                )
            ) + 100;

        if (document.querySelector("html")?.getAttribute("dir") === "rtl") {
            if (marginRightValue < 0) {
                menuItems.style.marginLeft = "0px";
                menuItems.style.marginRight =
                    Number(menuItems.style.marginRight.split("px")[0]) +
                    100 +
                    "px";
                document
                    .querySelector(".slide-right")
                    ?.classList.remove("d-none");
                document
                    .querySelector(".slide-left")
                    ?.classList.remove("d-none");
            } else {
                document.querySelector(".slide-left")?.classList.add("d-none");
            }

            if (marginRightValue >= 0) {
                menuItems.style.marginLeft = "0px";
                menuItems.style.marginRight = "0px";
            }
            // to remove dropdown when clicking arrows in horizontal menu
            let subNavSub = document.querySelectorAll(".sub-nav-sub");
            subNavSub.forEach((e: any) => {
                e.style.display = "";
            });
            let subNav = document.querySelectorAll(".nav-sub");
            subNav.forEach((e: any) => {
                e.style.display = "";
            });
        } else {
            if (marginLeftValue < 0) {
                menuItems.style.marginLeft =
                    Number(menuItems.style.marginLeft.split("px")[0]) +
                    100 +
                    "px";
                if (
                    menuWidth?.offsetWidth - menuContainerWidth <
                    menuItems.scrollWidth
                ) {
                    document
                        .querySelector(".slide-left")
                        ?.classList.remove("d-none");
                    document
                        .querySelector(".slide-right")
                        ?.classList.remove("d-none");
                }
            } else {
                document.querySelector(".slide-left")?.classList.add("d-none");
            }

            if (marginLeftValue >= 0) {
                menuItems.style.marginLeft = "0px";
                if (menuWidth?.offsetWidth < menuItems.scrollWidth) {
                    document
                        .querySelector(".slide-left")
                        ?.classList.add("d-none");
                }
            }

            // to remove dropdown when clicking arrows in horizontal menu
            let subNavSub = document.querySelectorAll(".sub-nav-sub");
            subNavSub.forEach((e: any) => {
                e.style.display = "";
            });
            let subNav = document.querySelectorAll(".nav-sub");
            subNav.forEach((e: any) => {
                e.style.display = "";
            });
        }
    });
    slideRightLTR.addEventListener("click", () => {
        slideClick();
        let menuWidth: any = document.querySelector(".horizontal-main");
        let menuItems: any = document.querySelector(".side-menu");
        let mainSidemenuWidth: any = document.querySelector(".main-sidemenu");
        let menuContainerWidth =
            menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
        let marginLeftValue =
            Math.ceil(
                Number(
                    window.getComputedStyle(menuItems).marginLeft.split("px")[0]
                )
            ) - 100;
        let marginRightValue =
            Math.ceil(
                Number(
                    window
                        .getComputedStyle(menuItems)
                        .marginRight.split("px")[0]
                )
            ) - 100;
        let check =
            menuItems.scrollWidth +
            (0 - menuWidth?.offsetWidth) +
            menuContainerWidth;

        if (document.querySelector("html")?.getAttribute("dir") === "rtl") {
            if (marginRightValue > -check) {
                menuItems.style.marginLeft = "0px";
                menuItems.style.marginRight =
                    Number(menuItems.style.marginRight.split("px")[0]) -
                    100 +
                    "px";
            } else {
                menuItems.style.marginLeft = "0px";
                menuItems.style.marginRight = -check + "px";
                document.querySelector(".slide-right")?.classList.add("d-none");
                document
                    .querySelector(".slide-left")
                    ?.classList.remove("d-none");
            }

            if (marginRightValue !== 0) {
                document
                    .querySelector(".slide-left")
                    ?.classList.remove("d-none");
            }
            // to remove dropdown when clicking arrows in horizontal menu
            let subNavSub = document.querySelectorAll(".sub-nav-sub");
            subNavSub.forEach((e: any) => {
                e.style.display = "";
            });
            let subNav = document.querySelectorAll(".nav-sub");
            subNav.forEach((e: any) => {
                e.style.display = "";
            });
        } else {
            if (marginLeftValue > -check) {
                // menuItems.style.marginRight = 0;
                menuItems.style.marginLeft =
                    Number(menuItems.style.marginLeft.split("px")[0]) -
                    100 +
                    "px";
            } else {
                // menuItems.style.marginRight = 0;
                menuItems.style.marginLeft = -check + "px";
                document.querySelector(".slide-right")?.classList.add("d-none");
            }
            if (marginLeftValue !== 0) {
                document
                    .querySelector(".slide-left")
                    ?.classList.remove("d-none");
            }
            // to remove dropdown when clicking arrows in horizontal menu
            let subNavSub = document.querySelectorAll(".sub-nav-sub");
            subNavSub.forEach((e: any) => {
                e.style.display = "";
            });
            let subNav = document.querySelectorAll(".nav-sub");
            subNav.forEach((e: any) => {
                e.style.display = "";
            });
            //
        }
    });
}

// RESPONSIVE SIDE-BAR CLOSED

//Header page

export const responsiveSidebarclose = () => {
    //leftsidemenu
    document.querySelector(".app")?.classList.remove("sidenav-toggled");
    //rightsidebar
    document.querySelector(".sidebar-right")?.classList.remove("sidebar-open");
    //swichermainright
    document.querySelector(".demo_changer")?.classList.remove("active");
    let Rightside: any = document.querySelector(".demo_changer");
    Rightside.style.insetInlineEnd = "-270px";
};

export function Horizontalmenudefultclose() {
    if (document.querySelector(".horizontal")) {
        let slide = document.querySelectorAll(".slide");
        let sideMenuitem = document.querySelectorAll(".slide-menu__item");
        let slideMenu = document.querySelectorAll(".slide-menu");
        slide.forEach((element) => {
            if (element?.classList.contains("is-expanded") === true) {
                element?.classList.remove("is-expanded");
            }
        });
        sideMenuitem.forEach((element) => {
            if (element?.classList.contains("active") === true) {
                element?.classList.remove("active");
            }
        });
        slideMenu.forEach((element) => {
            if (element) {
                element.classList.add("d-none");
            }
        });
    }
}
