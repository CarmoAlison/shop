import SearchIcon from '@mui/icons-material/Search';

export default function Pesquisar() {

    return (
        <div className='main-pesquisar'>
            <div className="pesquisar">
                <SearchIcon size="20px" />
                <input type="text" placeholder='Pesquisar...'/>
            </div>
        </div>
    );
}