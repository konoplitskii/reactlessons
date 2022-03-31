import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        newItemLoading:false,
        error: false,
        offset: 210,
        charEnd:false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;

        if(newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset,charList})=> ({
            charList:[...charList,...newCharList],
            loading: false,
            newItemLoading:false,
            offset:offset + 9,
            charEnd:ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading:true,
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, offset, newItemLoading, charEnd} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnd ? 'none' : 'block'}}
                        onClick={()=> this.onRequest(offset)}
                >
                    <div className="inner"
                    >load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;