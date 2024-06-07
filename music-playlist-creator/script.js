/* Open on click */

//Call the populate div function

/* Populate song div */

/* Add more song divs */

/* Shuffle songs */

//  .appendChild
// Create Element

/******************  HOME *******************/
function playlistName(playListTitleDiv, name) {
   playListTitleDiv.innerText = $(name).text();
}

function playListImg(playListImg, img) {
   playListImg.setAttribute("src", img);
}

function playListCreator(playListCreator, creator) {
   playListCreator.innerText = $(creator).text();
}

function likeCount(likeCount, likeCountNum) {
   likeCount.innerText = $(likeCountNum).text();
}

function getCoverImage(playlist){
   var img = data.playlists[playlist].playlist_art;
   return img;
}

function getPlaylistName(playlist){
   var name = data.playlists[playlist].playlist_name;
   return name;
}

function getplaylistCreator(playlist){
   var creator = data.playlists[playlist].playlist_creator;
   return creator;
}

function getLikeCount(playlist){
   var likeCountNum = data.playlists[playlist].likeCount;
   return likeCountNum;
}


function home() {
   // Create a container to hold the dynamically generated divs
   const playlistContainer = document.createElement("div");
   for (const playlist in data.playlists) {
      //Create a new div for each playlist
      const playlistDiv = document.createElement("div");

      // Set the class for the new div
      playlistDiv.className = "playlist";

      //Populate playlist cover img
      var playListCoverImg = document.getElementById("playlistCoverImg");
      var img = getCoverImage(playlist);
      playListImg(playListCoverImg, img);

      //Populate playlist name
      var playListName = document.getElementById("playName");
      var name = getPlaylistName(playlist);
      playListName(playListName, name);

      //Populate playlist creator
      var playListCreator = document.getElementById("creatorsName");
      var creator = getPlaylistCreator(playlist);
      playListCreator(playListCreator, creator);

      //Populate like-count
      var likeCount = document.getElementById("likeCount");
      var likeCountNum = getLikeCount(playlist);
      likeCount(likeCount, likeCountNum);
      //Append Child
      playlistContainer.appendChild(playlistDiv);
   }
   // Append the container to the body
   const targetParent = document.getElementById("playlistCards");
   targetParent.appendChild(playlistContainer);
}
/******************* MODAL *******************/
function title(titleDiv, title) {
   titleDiv.innerText = $(title).text();
}

function artist(artistDiv, artist) {
   artistDiv.innerText = $(artist).text();
}

function album(albumDiv, album) {
   albumDiv.innerText = $(album).text();
}

function duration(durationDiv, duration) {
   durationDiv.innerText = $(duration).text();
}

function modal() {
   // Create a container to hold the dynamically generated divs
   const songContainer = document.createElement("div");
   for (const playlist in data.playlists) {
      //Create a new div for each song
      const songDiv = document.createElement("div");

      // Set the class for the new div
      songDiv.className = "song";

      //Populate song cover img
      var songCoverImg = document.getElementById("coverArt");
      var img = data.playlists[playlist].playlist_art;
      playListImg(playListCoverImg, img);

      //Populate song name
      var songName = document.getElementById("playName");
      var title = data.playlists[playlist].playlist_name;
      playListName(playListName, name);

      //Populate playlist creator
      var playListCreator = document.getElementById("creatorsName");
      var creator = data.playlists[playlist].playlist_creator;
      playListCreator(playListCreator, creator);

      //Populate like-count
      var likeCount = document.getElementById("likeCount");
      var likeCountNum = data.playlists[playlist].likeCount;

      //Append Child
      playlistContainer.appendChild(playlistDiv);
   }
   // Append the container to the body
   const targetParent = document.getElementById("playlistCards");
   targetParent.appendChild(playlistContainer);
}

/******************* MAIN ********************/
function main() {

}
data.playlists[0].songs[0].album
