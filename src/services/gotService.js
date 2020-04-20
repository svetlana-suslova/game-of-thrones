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
        const characters = await this.getResource('/characters?page=6&pageSize=10');
        return characters.map(this._transformCharacters);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    async getAllBooks() {
        const books = await this.getResource('/books');
        return books.map(this._transformBook);
    }
    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    async getAllHouses() {
        const houses = await this.getResource('/houses');
        return houses.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    isEmpty(str) {
        console.log("hfhfh");
        if (str.trim() === '') 
          return "no data :((";
          
        return str;
    }

    _transformCharacter(char) {
        return {
            name: this.isEmpty(char.name),
            gender: this.isEmpty(char.gender),
            born: this.isEmpty(char.born),
            died: this.isEmpty(char.died),
            culture: this.isEmpty(char.culture)
        }
    }
    _transformCharacters(char) {
        return {
            id: char.url.substring(49),
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