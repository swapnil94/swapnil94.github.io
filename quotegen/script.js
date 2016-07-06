$("document").ready(function() {
  newQuote();
  $("#generate").on("click",newQuote);
});
function newQuote(){
	$.getJSON("api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json", function(data) {
        console.log(data);
	});
}