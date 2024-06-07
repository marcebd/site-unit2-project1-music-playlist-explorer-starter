/* Open on click */

//Call the populate div function

/* Populate song div */

/* Add more song divs */

/* Shuffle songs */

//  .appendChild
// Create Element
function playlistName(playListTitleDiv, name) {
   playListTitleDiv.innerText = $(name).text();
}

function playListCoverImg(playListCoverImg, img) {
   playListCoverImg.setAttribute("src", img);
}

function playListCreator(playListCreator, creator) {
   playListCreator.innerText = $(creator).text();
}

function likeCount(likeCount, likeCountNum) {
   likeCount.innerText = $(likeCountNum).text();
}

/******************  HOME *******************/
function home() {
   // Create a container to hold the dynamically generated divs
  const playlistContainer = document.createElement("div");
   for (const playlist in data.playlists) {
      //Populate playlist cover img
      var playListCoverImg = document.getElementById("playlistCoverImg");
      var img = data.playlists[playlist].playlist_art;
      playListCoverImg(playListCoverImg, img);

      //Populate playlist name
      var playListName = document.getElementById("playName");
      var name = data.playlists[playlist].playlist_name;
      playListName(playListName, name);

      //Populate playlist creator
      var playListCreator = document.getElementById("creatorsName");
      var creator = data.playlists[playlist].playlist_creator;
      playListCreator(playListCreator, creator);

      //Populate like-count
      var likeCount = document.getElementById("likeCount");
      var likeCountNum = data.playlists[playlist].likeCount;
   }
}
/******************* MODAL *******************/
function modal() {

}

/******************* MAIN ********************/
function main() {

}
data.playlists[0].songs[0].album
