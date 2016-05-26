

  function onClick() {


        var xhr = new XMLHttpRequest();

        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById("lastName").value;


              xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {

                    var data = xhr.responseText;

                    var parsedData = JSON.parse(data);

                    var id = parsedData.artists.items[0].id;



                    xhr.onreadystatechange = function() {
                      var artistData = xhr.responseText;
                      var secondParse = JSON.parse(artistData);

                      document.getElementById('artistInformation').innerHTML =secondParse.name;
                      document.getElementById('information').innerHTML = secondParse.popularity;

                      var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + secondParse.name + '&format=json&callback=wikiCallback';

                        $.ajax({
                        url:wikiURL,
                        dataType:"jsonP",
                        success:function(response){
                          var articleList = response[1];

                          for(var i = 0; i<articleList.length; i++){
                            articleStr = articleList[i];
                            var url = 'http://en.wikipedia.org/wiki/' + articleStr;

                            var para = document.createElement("p");
                            var node = document.getElementById('wikiElem').innerHTML = '<p><a href="' + url + '">' + articleStr + '</a></p>'
                            para.firstChild(node);

                            var element = document.getElementById("div1");
                            // document.getElementById('wikiLink').style.visibility = "inline";
                            // $("#wikiLink").show();
                            element.appendChild(para);

                          }
                        }
                      });


                    }



                    xhr.open("GET","https://api.spotify.com/v1/artists/"+ id);
                    xhr.send();



                }
          }



      xhr.open("GET","https://api.spotify.com/v1/search?q="+firstName+ "+"+ lastName+"+&type=artist&market=US");
      xhr.send();
    
}
