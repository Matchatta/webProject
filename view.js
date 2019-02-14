var keyword = ""
$(document).ready(function () {
    $("#submit").click(function () {
        // Get value from input box 
        keyword = $("#search").val()
        //Clear screen
        refresh()
        console.log(keyword)
        //Get JSON from google search
        $.getJSON("https://www.googleapis.com/customsearch/v1?key=AIzaSyAk8Rq7E9sU5auW9HtCAURdzWjKQrCrkFg&cx=000033207723431939197:bfiav_vmow4&count=20&q="+keyword, 
        function (response) {
                // Call google function for show all conference
                google(response)
            }
        );
        //Get JSON fron youtube data api        
        $.getJSON("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCVi7sbKeMkH6RB-pcIwMNfoPjofj-iw0U&type=video&part=snippet&maxResults=20&q=conference+"+keyword, 
        function (response) {
                // Call youtube function for show all video
                youtube(response)
            }
        );
        // Call twitter function for show all comment
        twitter()      
    });
});
//Clear screen function
function refresh(){
    $("#ref").empty();
    $("#1").empty();
    $("#2").empty();
    $("#3").empty();
    $("#4").empty();
    $("#5").empty();
    $("#com").empty();
}
//Google function
function google(response){
    console.log(response.items)
        //Use to print all data
        $.each(response.items, function (indexInArray, valueOfElement) { 
            //showGoogle(valueOfElement.htmlSnippet,valueOfElement.htmlTitle,valueOfElement.link)
            var title = "<span id=\"content\"><h4>"+(indexInArray+1)+". "+valueOfElement.htmlTitle+"</h4>"
            var content = "<p>"+valueOfElement.htmlSnippet+"<a href=\""+valueOfElement.link+"\" target=_blank>"+"read more</a>"+"</p></span><hr>"
            $("#ref").append(title+content);
        });
}
//Youtube function
function youtube(response){
    var i=0;
    var j=1;
        console.log(response.items)
         //Use to print all data
        $.each(response.items, function (indexInArray, valueOfElement) {
            var ID = "https://www.youtube.com/embed/" + valueOfElement.id.videoId;
            var thumbnail = valueOfElement.snippet.thumbnails.medium.url; 
            var titleV = valueOfElement.snippet.title;
            var content = 
            "<div class=\"col-sm-3\">"+
                "<div class=\"card\" id=\"card\"> "+
                    "<div class=\"card-body round\" onmouseout=\"style.boxShadow=\'0 4px 8px 0 rgba(0, 0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0, 0)\'\" onmouseover=\"style.boxShadow=\'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)\'\">"+
                    "<h5 class=\"card-title\">"+titleV+"</h5>"+
                    "<img class=\"card-img-top\" src=\""+thumbnail+"\" alt=\"Card image cap\">"+
                    "<p class=\"mt-2\"><a href=\""+ID+"\" target=\"_blank\" class=\"btn\" id=\"watch\" style=\"background-color:#98ccd3; color:black\">Watch Video</a></p>"+
                    "</div>"+
                "</div>"+
            "</div>"
            $("#"+j.toString()).append(content);
            if(i==3){
               j++
            }
            i++
        });
}
//Twitter function
function twitter(){
    var str
    //Get data from twitter.php
    $.ajax({
        type: "POST",
        url: "twitter.php",
        data: {"search" : keyword},
        datatype: "text",
        success: function (response) {
        console.log(response)
        $("#com").append(response);
        }
    });
}