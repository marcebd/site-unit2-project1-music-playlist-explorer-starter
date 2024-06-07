//Getter functions
function getCoverImage(playlist){
   var img = data.playlists[playlist].playlist_art;
   return img;
}

function getPlaylistName(){
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

function getTitle(playlist, song){
   var title = data.playlists[playlist].songs[song].album
}

function getArtist(playlist, song){
   var artist = data.playlists[playlist].songs[song].artist;
}

function getAlbum(playlist, song){
   var album = data.playlists[playlist].songs[song].album;
}

function getDuration(playlist, song){
   var duration = data.playlists[playlist].songs[song].duration;
}

//Populate playlist cover img
function popPlaylistImg(playlist) {
   var playListCoverImg = document.getElementByClass("playlistCover");
   var img = getCoverImage(playlist);
   playListImg.setAttribute("src", img);
}

//Populate playlist name
function popPlaylistName(playlist) {
   var playListName = document.getElementByClass("playlistName");
   var name = getPlaylistName(playlist);
   playListTitleDiv.innerText = $(name).text();
}

//Populate playlist creator
function popPlaylistCreator(playlist) {
   var playListCreator = document.getElementByClass("creatorsName");
   var creator = getPlaylistCreator(playlist);
   playListCreator.innerText = $(creator).text();
}

//Populate like-count
function popLikeCount(playlist) {
   var likeCount = document.getElementByClass("likeCount");
   var likeCountNum = getLikeCount(playlist);
   likeCount.innerText = $(likeCountNum).text();
}

//Populate song cover img
function popSongImg(playlist, song) {
   var songCoverImg = document.getElementByClass("coverArt");
   var img = getCoverImage(playlist, song);
   songCoverImg.setAttribute("src", img);
}

//Populate song title
function popSongTitle(playlist, song) {
   var songTitleDiv = document.getElementByClass("title");
   var title = getTitle(playlist, song);
   songTitleDiv.innerText = $(title).text();
}

//Populate song artist
function popSongArtist(playlist, song) {
   var songArtistDiv = document.getElementByClass("artist");
   var artist = getArtist(playlist, song);
   songArtistDiv.innerText = $(artist).text();
}

//Populate song album
function popSongAlbum(playlist, song) {
   var songAlbumDiv = document.getElementByClass("album");
   var album = getAlbum(playlist, song);
   songAlbumDiv.innerText = $(album).text();
}

//Populate song duration
function popSongDuration(playlist, song) {
   var songDurationDiv = document.getElementByClass("duration");
   var duration = getDuration(playlist, song);
   songDurationDiv.innerText = $(duration).text();
}

/******************  HOME *******************/
function home() {
   // Create a container to hold the dynamically generated divs
   const playlistContainer = document.createElement("div");
   for (const playlist in data.playlists) {
      //Create a new div for each playlist
      const playlistDiv = document.createElement("div");

      // Set the class for the new div
      playlistDiv.className = "playlist";
      //Set the ID for the new div
      playlistDiv.id = data.playlists[playlist].playlistID;

      //Populate playlist cover img
      popPlaylistImg(playlist);

      //Populate playlist name
      popPlaylistName(playlist);

      //Populate playlist creator
      popPlaylistCreator(playlist);

      //Populate like-count
      popLikeCount(playlist);
      //Append Child
      playlistContainer.appendChild(playlistDiv);
   }
   // Append the container to the body
   const targetParent = document.getElementByClass("playlistCards");
   targetParent.appendChild(playlistContainer);
}

/******************* MODAL *******************/
function modalHeader(playlist){
   //Populate Playlist Cover Image
   popPlaylistImg(playlist);

   //Populate Playlist Name
   popPlaylistName(playlist);

   //Populate Playlist Creator
   popPlaylistCreator(playlist);
}

function playlistSongs() {
   // Create a container to hold the dynamically generated divs
   const songContainer = document.createElement("div");
   for (const playlist in data.playlists) {
      for(const song in data.playlists[playlist].songs) {
         //Create a new div for each song
         const songDiv = document.createElement("div");

         // Set the class for the new div
         songDiv.className = "song";
         //Set the ID for the new div
         songDiv.id = data.playlists[playlist].songs[song].songID;

         //Populate song cover img
         popSongImg(playlist, song);

         //Populate song title
         popSongTitle(playlist, song);

         //Populate playlist artist
         popSongArtist(playlist, song);

         //Populate song album
         popSongAlbum(playlist, song);

         //Populate song duration
         popSongDuration(playlist, song);

         //Append Child
         songContainer.appendChild(songDiv);
      }
   }
   // Append the container to the body
   const targetParent = document.getElementById("playlistSongs");
   targetParent.appendChild(songContainer);
}

function modal() {

}
/******************* MAIN ********************/
function main() {

}
data.playlists[0].songs[0].album
