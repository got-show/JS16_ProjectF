var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api');
var Store = require('../stores/CharactersStore');

var CharactersActions = {
    loadCharacters: function() {
        var characters = [];

        Api.get('book/characters').then(function(responseBooks){
            for (let index in responseBooks) {
                let character = {};

                character.hasBook = true;
                character.book    = responseBooks[index];
                character.hasShow = false;
                character.show    = {};
                characters.push(character);
            }

            Api.get('show/characters').then(function(responseShow){
                for (let index in responseShow) {
                    let hasCharacterBook = false;

                    for (let indexBook in characters) {
                        if (responseShow[index].name == characters[indexBook].book.name) {
                            hasCharacterBook = true;
                            characters[indexBook].hasShow = true;
                            characters[indexBook].show    = responseShow[index];
                        }
                    }

                    if (!hasCharacterBook) {
                        let character = {};

                        character.hasBook = false;
                        character.book    = {};
                        character.hasShow = true;
                        character.show    = responseShow[index];
                        characters.push(character);
                    }
                }

                // final editing
                for (let i in characters) {
                    let name = characters[i].hasShow ? characters[i].show.name : characters[i].book.name;
                    characters[i].name = name;

                    let plod = characters[i].hasShow ? characters[i].show.plodB : characters[i].book.plodB;
                    characters[i].plod = Math.round(plod * 100);

                    let imageLink = characters[i].hasShow ? characters[i].show.image : characters[i].book.image;
                    characters[i].imageLink = imageLink;

                    let pageRank = characters[i].hasShow && characters[i].show.pagerank ? characters[i].show.pagerank.rank : 
                        characters[i].book.pagerank ? characters[i].book.pagerank.rank : 0;
                    characters[i].pageRank = pageRank;
                }

                console.log(characters); /*eslint no-console:0,no-undef:0*/

                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_CHARACTERS,
                    data: characters
                });
            });
        });
    },
    loadCharacter: function(name) {
        var character = {
            hasShow: false,
            hasBook: false,
            book: {},
            show: {}
        };

        this.loadCharacterBookData(name, character);
    },

    loadCharacterBookData: function(name, character) {
        var that = this;

        Api.get('book/characters/' + name).then(function(response){
            // success
            character.book    = response;   
            character.hasBook = true;

            that.loadCharacterShowData(name, character);
        }, function(fail) {
            // fail
            character.hasBook = false;
            that.loadCharacterShowData(name, character);
        });
    },

    loadCharacterShowData: function(name, character) {
        var that = this;

        Api.get('show/characters/' + name).then(function(response) {
            // success
            character.show    = response;
            character.hasShow = true;

            that.dispatchCharacter(character);
        }, function(fail) {
            // fail
            that.dispatchCharacter(character);
        });
    },

    dispatchCharacter: function(character) {
        character.name = character.hasShow ? character.show.name : character.book.name;

        AppDispatcher.handleServerAction({
            actionType: Constants.RECEIVE_CHARACTER,
            data: character
        });
    }
};

module.exports = CharactersActions;
