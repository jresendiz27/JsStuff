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
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
            //evaluating a jquery selector and returning the information
            var data = page.evaluate(function () {
                var tag_array = [];
                //Using a jquery selector and iterating over all the tags 
                $("span.nolink").each(function (index, value) {
                    //adding the information to the array, just getting the text
                    var word = $(this).text().toLowerCase();
                    tag_array.push(word);
                });
                return tag_array;
            });
            //Showing the data into the system's console
            //You could create a txt file, check how to integrate phantom js with node
            //the add the file management and that's it!
            for (var i = 0; i < data.length; i++) {
                data[i]
                stemmer.setCurrent(spanishHelper(data[i]));
                stemmer.stem();
                console.log(stemmer.getCurrent());
            }
            // It seems to be a bug and throws an exception, just use this line :P
            setTimeout(function () {
                phantom.exit();
            }, 0);
        });
    }
});