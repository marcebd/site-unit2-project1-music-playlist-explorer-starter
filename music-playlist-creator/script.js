document.addEventListener('DOMContentLoaded', main);

//Getter functions
function getCoverImage(playlist){
   var img = data.playlists[playlist].playlist_art;
   return img;
}

function getPlaylistName(playlist){
   var name = data.playlists[playlist].playlist_name;
   return name;
}

function getPlaylistCreator(playlist){
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

// Populate playlist cover img
function popPlaylistImg(playlist) {
   // Get the element with their ids
   const playListCoverImg = document.getElementsByClassName("cover");

   // Get the image URL using the getCoverImage function
   const img = getCoverImage(playlist);
   console.log('Populating playlist cover image:', img);

   // Set the src attribute of the image element
   console.log(playListCoverImg.src);
   playListCoverImg.src = 'https://picsum.photos/id/43/200';

 }

//Populate playlist name
function popPlaylistName(playlist) {
   var playListTitleDiv = document.getElementsByClassName("playlistName");

   var name = getPlaylistName(playlist);
   console.log('Populating playlist name:', name);
   playListTitleDiv.innerText = name;
}

//Populate playlist creator
function popPlaylistCreator(playlist) {
   var playListCreator = document.getElementsByClassName("creatorsName");
   var creator = getPlaylistCreator(playlist);
   console.log('Populating playlist creator:', creator);
   playListCreator.innerText = (creator);
}

//Populate like-count
function popLikeCount(playlist) {
   var likeCount = document.getElementsByClassName("likeCount");
   var likeCountNum = getLikeCount(playlist);
   console.log('Populating playlist likeCount:', likeCountNum);
   likeCount.innerText = (likeCountNum);
}

//Populate song cover img
function popSongImg(playlist, song) {

}

//Populate song title
function popSongTitle(playlist, song) {
   var songTitleDiv = document.getElementsByClassName("title");
   var title = getTitle(playlist, song);
   console.log('Populating playlist title:', title);
   songTitleDiv.innerText = (title);
}

//Populate song artist
function popSongArtist(playlist, song) {
   var songArtistDiv = document.getElementsByClassName("artist");
   var artist = getArtist(playlist, song);
   console.log('Populating playlist artist:', artist);
   songArtistDiv.innerText = (artist);
}

//Populate song album
function popSongAlbum(playlist, song) {
   var songAlbumDiv = document.getElementsByClassName("album");
   var album = getAlbum(playlist, song);
   console.log('Populating playlist album:', album);
   songAlbumDiv.innerText = (album);
}

//Populate song duration
function popSongDuration(playlist, song) {
   var songDurationDiv = document.getElementsByClassName("duration");
   var duration = getDuration(playlist, song);
   console.log('Populating playlist duration:', duration);
   songDurationDiv.innerText = (duration);
}

//Get Playlist by ID
function getPlaylistById(playlistId) {
   for (const playlist of data.playlists) {
     if (playlist.playlistID === parseInt(playlistId)) {
       return playlist;
     }
   }
   return null; // Return null if no matching playlist is found
 }

 /******** Create Playlist Card  *******/
 function createPlaylistCard(playlist) {
   // Create a container to hold the dynamically generated divs (card)
   const playlistCard = document.createElement("div");
   // Set the class for the new div
   playlistCard.className = "card";
   //Set the ID for the new div
   playlistCard.id = data.playlists[playlist].playlistID;

   //Create a container to hold cover image
   const playlistCoverImg = document.createElement("img");
   // Set the class for the new div
   playlistCoverImg.className = "playlistCover";
   //Set the ID for the new div
   playlistCoverImg.id = "cover" + data.playlists[playlist].playlistID;
   playlistCoverImg.src = data.playlists[playlist].playlist_art;
   playlistCard.appendChild(playlistCoverImg);

   //Create a container to hold playlist name
   const playlistName = document.createElement("div");
   // Set the class for the new div
   playlistName.className = "playlistName";
   //Set the ID for the new div
   playlistName.id = "name" + data.playlists[playlist].playlistID;
   playlistName.innerText = data.playlists[playlist].playlist_name;
   playlistCard.appendChild(playlistName);

   //Create a container to hold playlist creator
   const playlistCreator = document.createElement("div");
   // Set the class for the new div
   playlistCreator.className = "playlistName";
   //Set the ID for the new div
   playlistCreator.id = "creator" + data.playlists[playlist].playlistID;
   playlistCreator.innerText = data.playlists[playlist].playlist_creator;
   playlistCard.appendChild(playlistCreator);

   //Create a container to hold like-count
   const likeCountImage = document.createElement("img");
   // Set the class for the new div
   likeCountImage.className = "likeCountImage";
   //Set the ID for the new div
   likeCountImage.id = "countImage" + data.playlists[playlist].playlistID;
   likeCountImage.src = "assets/img/favicon.ico";
   likeCountImage.className = "heartImage";
   playlistCard.appendChild(likeCountImage);

   const likeCount = document.createElement("div");
   // Set the class for the new div
   likeCount.className = "likeCount";
   //Set the ID for the new div
   likeCount.id = "likeCount" + data.playlists[playlist].playlistID;
   likeCount.innerText = data.playlists[playlist].likeCount;
   console.log('Created playlist card for playlist ID:', data.playlists[playlist].playlistID);

   playlistCard.appendChild(likeCount)
   playlistCard.addEventListener("click", () => {
      modal(playlist);
   });
   return playlistCard;
 }

/******************  HOME *******************/
function home() {
   const targetParent = document.getElementById("playlistCardsContainer");
   for (let playlist in data.playlists) {
      //Create playlist card
      let playlistCard = createPlaylistCard(playlist);

      // Append the container to the body
      targetParent.appendChild(playlistCard);
   }
}

/******************* MODAL *******************/
function modalHeader(playlist){
   //Populate Playlist Cover Image
   popPlaylistImg(playlist);

   //Populate Playlist Name
   popPlaylistName(playlist);

   //Populate Playlist Creator
   popPlaylistCreator(playlist);
   document.getElementById("playlistModal").style.display = "block";
}

function playlistSongs(playlist) {
   // Create a container to hold the dynamically generated divs
   const songContainer = document.createElement("div");
      for(const song in data.playlists[playlist].songs) {
         //Create song card
         let songCard = createSongCard(playlist, song);

         // Append the container to the body
         songContainer.appendChild(songCard);
      }
   targetParent.appendChild(songContainer);
}

function createSongCard(playlist, song){
   //Create a new div for each song
   const songDiv = document.createElement("div");
   // Set the class for the new div
   songDiv.className = "song";
   //Set the ID for the new div
   songDiv.id = data.playlists[playlist].songs[song].songID;

   //Create a container to hold cover image
   const songCoverImg = document.createElement("CoverImg");
   // Set the class for the new div
   playlistCoverImg.className = "songCover";
   //Set the ID for the new div
   playlistCoverImg.id = "songCover" + data.playlists[playlist].songs[song].songID;
   playlistCoverImg.src = data.playlists[playlist].songs[song].cover_art;
   songDiv.appendChild(playlistCoverImg);

   //Create a container to hold song title
   const songTitle = document.createElement("div");
   // Set the class for the new div
   songTitle.className = "songTitle";
   //Set the ID for the new div
   songTitle.id = "songTitle" + data.playlists[playlist].songs[song].songID;
   songTitle.innerText = data.playlists[playlist].songs[song].title;
   songDiv.appendChild(songTitle);

   //Create a container to hold song artist
   const songArtist = document.createElement("div");
   // Set the class for the new div
   songArtist.className = "songArtist";
   //Set the ID for the new div
   songArtist.id = "songArtist" + data.playlists[playlist].songs[song].songID;
   songArtist.innerText = data.playlists[playlist].songs[song].artist;
   songDiv.appendChild(songArtist);

   //Create a container to hold song album
   const songAlbum = document.createElement("div");
   // Set the class for the new div
   songAlbum.className = "songAlbum";
   //Set the ID for the new div
   songAlbum.id = "songAlbum" + data.playlists[playlist].songs[song].songID;
   songAlbum.innerText = data.playlists[playlist].songs[song].album;
   songDiv.appendChild(songAlbum);

   //Create a container to hold song duration
   const songDuration = document.createElement("div");
   // Set the class for the new div
   songDuration.className = "songDuration";
   //Set the ID for the new div
   songDuration.id = "songDuration" + data.playlists[playlist].songs[song].songID;
   songDuration.innerText = data.playlists[playlist].songs[song].duration;
   songDiv.appendChild(songDuration);

   return songDiv;
}

function modal(playlist) {

   //Populate Modal Header
   modalHeader(playlist);
   //Populate Playlist Songs4
   playlistSongs(playlist);
}
/******************* MAIN ********************/
function main() {
   //Call home() function
   home();

   // Select the parent div with class 'playlistCards'
   const parentDiv = document.querySelector('.playlistCards');

   // Add a click event listener to the parent div
   parentDiv.addEventListener('click', (event) => {
         // Check if the target element has the class 'card'
         if (event.target.classList.contains('card')) {
            var playlist = getPlaylistById(event.target.id);
            // Call the modal() function
            modal(playlist);
      }
   });
}
