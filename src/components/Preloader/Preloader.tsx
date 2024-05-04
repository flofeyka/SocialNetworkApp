import loader from '../../assets/loader.gif';

function Preloader() {
    return <div className="bg-none">
        <img src={loader} alt="Loader for unload's pages"/>
    </div>
}

export default Preloader;