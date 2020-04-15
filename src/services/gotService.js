export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }
    async getAllCharacters() {
        const characters = await this.getResource('/characters?page=5&pageSize=10');
        return characters.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    async getAllBooks() {
        const books = await this.getResource('/books');
        return books.map(this._transformCharacter);
    }
    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformCharacter(book);
    }
    async getAllHouses() {
        const houses = await this.getResource('/houses');
        return houses.map(this._transformCharacter);
    }
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformCharacter(house);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}