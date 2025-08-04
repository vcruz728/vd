import buapAzul from "../assets/images/logos/buap_azul.png";
import buapBlanco from "../assets/images/logos/buap_blanco.png";
import buapBlancoDos from "../assets/images/logos/buap_blanco_2.png";
import minervaAzul from "../assets/images/logos/minerva_azul.png";
import minervaGris from "../assets/images/logos/minerva_gris.png";
import minervaBlanco from "../assets/images/logos/minerva_blanco.png";
import minervaBuapAcostadoAzul from "../assets/images/logos/minerva_buap_costado_azul.png";
import minervaBuapAcostadoBlanco from "../assets/images/logos/minerva_buap_costado_blanco.png";
import minervaBuapBlanco from "../assets/images/logos/minerva_buap_blanco.png";
import minervaBuapAzul from "../assets/images/logos/minver_buap_azul.png";
import bAzul from "../assets/images/logos/b_azul.png";
import bBlanco from "../assets/images/logos/b_blanco.png";
import user from "../assets/images/user.png";

export const Imagesdata = (data: any) => {
    const img: any = {
        buapAzul,
        buapBlanco,
        minervaAzul,
        minervaGris,
        minervaBlanco,
        minervaBuapAcostadoAzul,
        minervaBuapAcostadoBlanco,
        minervaBuapBlanco,
        minervaBuapAzul,
        bAzul,
        bBlanco,
        buapBlancoDos,
        user,
    };

    return img[data];
};
