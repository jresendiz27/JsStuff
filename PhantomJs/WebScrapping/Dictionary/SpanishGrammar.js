/**
 * Created by alberto on 1/25/15.
 */
//Tool for cleaning a word given in spanish, removing accents, special chars, articles and pronouns
module.exports = SpanishHelper;
//Adding composite articles
var articles = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'del'];
var pronouns = [
    'a', 'ante', 'bajo',
    'cabe', 'con', 'contra', 'de',
    'desde', 'en', 'entre', 'hacia',
    'hasta', 'para', 'por', 'segun',
    'so', 'sin', 'sobre', 'tras'
];
var specialChars = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ñ': 'n', 'ü': 'u','[(]':'','[)]':''};
//helper
function SpanishHelper(wordGiven) {
    var filteredWord = wordGiven;
    //removing articles
    for (var index = 0; index < articles.length; index++) {
        var splittedWord = filteredWord.split(" ");
        var cleanedWord = [];
        //using space as word delimiter
        //a word could partially contain an article, we just want the articles to be separated
        for (var index_splitted = 0; index_splitted < splittedWord.length; index_splitted++) {
            if (splittedWord[index_splitted] !== articles[index] && splittedWord[index_splitted] !== '') {
                cleanedWord.push(splittedWord[index_splitted]);//removing the article
            }
        }
        filteredWord = cleanedWord.join(" ");
    }
    //removing pronouns
    for (var index = 0; index < pronouns.length; index++) {
        var splittedWord = filteredWord.split(" ");
        var cleanedWord = [];
        //using space as word delimiter
        //a word could partially contain a pronoun, we just want the pronouns to be separated
        for (var index_splitted = 0; index_splitted < splittedWord.length; index_splitted++) {
            if (splittedWord[index_splitted] !== pronouns[index] && splittedWord[index_splitted] !== '') {
                cleanedWord.push(splittedWord[index_splitted]);//removing the article
            }
        }
        filteredWord = cleanedWord.join(" ")
    }
    //cleaning special chars
    for (var key in specialChars) {
        if (specialChars.hasOwnProperty(key)) {
            filteredWord = filteredWord.replace(new RegExp(key, 'g'), specialChars[key]);
        }
    }
    return filteredWord;
};