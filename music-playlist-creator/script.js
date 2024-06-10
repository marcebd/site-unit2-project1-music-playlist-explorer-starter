document.addEventListener('DOMContentLoaded', main);

//Get Playlist by ID
function getPlaylistById(playlistId) {
   for (const playlist of data.playlists) {
     if (playlist.playlistID === parseInt(playlistId)) {
       return playlist;
     }
   }
   return null; // Return null if no matching playlist is found
 }

 function createPlaylistCard(playlist) {
   // Create a container to hold the dynamically generated divs (card)
   const playlistCard = document.createElement("div");
   playlistCard.className = "card";
   playlistCard.id = data.playlists[playlist].playlistID;

   //Create a container to hold cover image
   const playlistCoverImg = document.createElement("img");
   playlistCoverImg.className = "playlistCover";
   playlistCoverImg.id = "cover" + data.playlists[playlist].playlistID;
   playlistCoverImg.src = data.playlists[playlist].playlist_art;
   playlistCard.appendChild(playlistCoverImg);

   //Create a container to hold playlist name
   const playlistName = document.createElement("div");
   playlistName.className = "playlistName";
   playlistName.id = "name" + data.playlists[playlist].playlistID;
   playlistName.innerText = data.playlists[playlist].playlist_name;
   playlistCard.appendChild(playlistName);

   //Create a container to hold playlist creator
   const playlistCreator = document.createElement("div");
   playlistCreator.className = "playlistName";
   playlistCreator.id = "creator" + data.playlists[playlist].playlistID;
   playlistCreator.innerText = data.playlists[playlist].playlist_creator;
   playlistCard.appendChild(playlistCreator);

   //Create a container to hold like-count
   const likeCountImage = document.createElement("img");
   likeCountImage.className = "likeCountImage";
   likeCountImage.id = "countImage" + data.playlists[playlist].playlistID;
   likeCountImage.src = "assets/img/favicon.ico";
   playlistCard.appendChild(likeCountImage);

   const likeCount = document.createElement("div");
   likeCount.className = "likeCount";
   likeCount.id = "likeCount" + data.playlists[playlist].playlistID;
   // Initialize likeCount to 0 if it's not already set
   if (typeof data.playlists[playlist].likeCount === 'undefined') {
       data.playlists[playlist].likeCount = 0;
   }
   likeCount.innerText = data.playlists[playlist].likeCount;
   playlistCard.appendChild(likeCount);

   // Event listener for the like count image
   likeCountImage.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the event from bubbling up to the card
      data.playlists[playlist].likeCount = data.playlists[playlist].likeCount === 0 ? 1 : 0; // Toggle the like count
      likeCount.innerText = data.playlists[playlist].likeCount; // Update the displayed like count
   });

   // Event listener for the card (excluding the like count image)
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
   const headerDiv = document.getElementById("modalHeader");

   //Get the container to hold cover image
   const playlistCoverImg = document.getElementById("playlistCoverModal");
   playlistCoverImg.src = data.playlists[playlist].playlist_art;
   headerDiv.appendChild(playlistCoverImg);

   //Get the container to hold playlist name
   const playlistName = document.getElementById("playlistNameModal");
   playlistName.innerText = data.playlists[playlist].playlist_name;
   headerDiv.appendChild(playlistName);

   //Create a container to hold playlist creator
   const playlistCreator = document.getElementById("playlistCreatorModal");
   playlistCreator.innerText = data.playlists[playlist].playlist_creator;
   headerDiv.appendChild(playlistCreator);
}

function playlistSongs(playlist) {
   // Create a container to hold the dynamically generated divs
   const targetParent = document.getElementById("playlistSongs");
      for(const song in data.playlists[playlist].songs) {
         //Create song card
         let songCard = createSongCard(playlist, song);

         // Append the container to the body
         targetParent.appendChild(songCard);
      }
}

function createSongCard(playlist, song){
   //Create a new div for each song
   const songDiv = document.createElement("div");
   // Set the class for the new div
   songDiv.className = "song";
   //Set the ID for the new div
   songDiv.id = data.playlists[playlist].songs[song].songID;

   //Create a container to hold cover image
   const songCoverImg = document.createElement("img");
   // Set the class for the new div
   songCoverImg.className = "songCover";
   //Set the ID for the new div
   songCoverImg.id = "songCover" + data.playlists[playlist].songs[song].songID;
   songCoverImg.src = data.playlists[playlist].songs[song].cover_art;
   songDiv.appendChild(songCoverImg);

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

let modalOpen = false;

function modal(playlist) {
   // If the modal is already open, close it before opening a new one
   if (modalOpen) {
      document.getElementById("playlistModal").classList.remove("open");
      document.getElementById("playlistModal").style.display = "none";
   }

   //Populate Modal Header
   modalHeader(playlist);
   //Populate Playlist Songs4
   playlistSongs(playlist);

   // Open the modal
   document.getElementById("playlistModal").classList.add("open");
   document.getElementById("playlistModal").style.display = "block";

   // Set the modalOpen flag to true
   modalOpen = true;
}

/******************* MAIN ********************/

// Close the modal when the user clicks on the close button
const closeButton = document.getElementById('closeButton');
closeButton.onclick = function(event) {
   // Remove the "open" class and set the display style to "none"
   document.getElementById('playlistModal').classList.remove('open');
   document.getElementById('playlistModal').style.display = 'none';
};

function main() {
   //Call home() function
   home();
}
