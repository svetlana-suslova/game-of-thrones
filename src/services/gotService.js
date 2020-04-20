export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async () => {
        const characters = await this.getResource('/characters?page=6&pageSize=7');
        return characters.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllBooks = async () => {
        const books = await this.getResource('/books');
        return books.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    getAllHouses = async () => {
        const houses = await this.getResource('/houses');
        return houses.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }
    isSet(data) {
        if (data) {
            return data;
        } else {
            return "no data :(";
        }  
    }
    _extractId(item) {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }
    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}