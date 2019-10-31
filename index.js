//Setting hint to blank
let hint = "";

//API key
apik = "14348b24";

function getMovie(str) {
  if (str == "" && hint != "") {
    document.getElementById("txthint").innerHTML = "";
    hint = "";
    return;
  } else {
    let xmlh = new XMLHttpRequest();

    xmlh.open("GET", `https://www.omdbapi.com/?t=${str}&apikey=${apik}`, true);

    xmlh.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let hintResponse = `${data.Title}`;

        if (hintResponse != "undefined") {
          hint = hintResponse;
        }

        //Setting the hint
        document.getElementById("txthint").innerHTML = hint;
      }
    };
    xmlh.send();
  }
}

document.getElementById("button").addEventListener("click", getjson);

function getjson() {
  let xhr = new XMLHttpRequest();

  let name = document.getElementById("movieTitle").value;
  xhr.open("GET", `https://www.omdbapi.com/?t=${name}&apikey=${apik}`, true);

  xhr.onload = function() {
    let output = "";

    if (this.status == 200) {
      let data = JSON.parse(this.responseText);

      let undefined_check = `${data.Title}`;

      if (undefined_check == "undefined" && name == "") {
        M.toast({ html: "Enter a title of movie" });
        document.getElementById("information").innerHTML = "";
        return;
      }

      if (undefined_check == "undefined") {
        M.toast({ html: "Movie Not Found" });
        document.getElementById("information").innerHTML = "";
        return;
      }

      output += `<ul> 
            <img src="${data.Poster}" height="230px" width="230px">
            <li>Title:  ${data.Title}  </li> 
            <li>Actors:  ${data.Actors}  </li>
            <li>Box Office: ${data.BoxOffice} </li>
            <li>Release date: ${data.Released} </li>
            <li>Run-Time: ${data.Runtime} </li>
            <li>IMDB Rating: ${data.imdbRating} </li>
            </ul>`;
    }
    document.getElementById("information").innerHTML = output;
  };

  xhr.send();
}
