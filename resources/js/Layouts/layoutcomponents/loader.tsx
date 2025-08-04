import  { FC } from 'react';
import { Imagesdata } from '../../commondata/commonimages';

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
<div >
    <div id="global-loader">
        <img src={Imagesdata("loader")} className="loader-img" alt="Loading...."/>
</div>
</div>
);

export default Loader;
