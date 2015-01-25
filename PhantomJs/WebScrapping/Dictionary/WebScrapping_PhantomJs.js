//Just for Educational Purposes
//Creating a web page object from phantom js
var page = require('webpage').create();
var fs = require('fs');
var Snowball = require('./Snowball');
var stemmer = new Snowball('Spanish');
var spanishHelper = require('./SpanishGrammar');
//Getting the web page and start playing with it
page.open("http://lms.educaredes.cl/mod/glossary/view.php?id=117&mode=letter&hook=ALL&sortkey=&sortorder=asc&fullsearch=0&page=-1", function (status) {
    //Loading the page was sucessful
    if (status === "success") {
        //Injecting Jquery into the page
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function includeJS() {
            //evaluating a jquery selector and returning the information
            var data = page.evaluate(function pageEvaluate() {
                var tag_array = [];
                //Using a jquery selector and iterating over all the tags 
                $("span.nolink").each(function jqueryEach(index, value) {
                    //adding the information to the array, just getting the text
                    var word = $(this).text().toLowerCase();
                    tag_array.push(word);
                });
                return tag_array;
            });
            var stemmedTerms = [];
            var termsDictionary = {};
            //Stemming the words (getting word root)
            for (var i = 0; i < data.length; i++) {
                //creating unique information
                var filteredWords = spanishHelper(data[i]).split(" ");
                for(var j = 0; j< filteredWords.length; j++){
                    if(termsDictionary[filteredWords[j]] === undefined){
                        termsDictionary[filteredWords[j]] = 1;
                    } else {
                        termsDictionary[filteredWords[j]] = termsDictionary[filteredWords[j]] + 1;
                    }
                }                
            }
            //creating a unique array
            for (var key in termsDictionary) {
                if (termsDictionary.hasOwnProperty(key)) {
                    stemmer.setCurrent(key);
                    stemmer.stem();     
                    stemmedTerms.push(stemmer.getCurrent());
                }
            }
            //ordering the array
            stemmedTerms = stemmedTerms.sort();
            //Writing the file
            fs.write("dictionary.txt",stemmedTerms.join("\n"),"w");
            // It seems to be a bug and throws an exception, just use this line :P
            setTimeout(function () {
                phantom.exit();
            }, 0);
        });
    }
});