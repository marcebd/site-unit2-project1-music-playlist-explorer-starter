document.addEventListener('DOMContentLoaded', main);

/************* Helper functions  *********************/
// Get Playlist by ID
function getPlaylistById(playlistId) {
    for (const playlist of data.playlists) {
        if (playlist.playlistID === parseInt(playlistId)) {
            return playlist;
        }
    }
    return null; // Return null if no matching playlist is found
}

/*************** Home Page *******************/
//Create each playlist card
function createPlaylistCard(index) {
    const playlist = data.playlists[index];
    const playlistCard = document.createElement("div");
    playlistCard.className = "card";
    playlistCard.id = playlist.playlistID;

    const playlistCoverImg = document.createElement("img");
    playlistCoverImg.className = "playlistCover";
    playlistCoverImg.id = "cover" + playlist.playlistID;
    playlistCoverImg.src = playlist.playlist_art;
    playlistCard.appendChild(playlistCoverImg);

    const playlistName = document.createElement("div");
    playlistName.className = "playlistName";
    playlistName.id = "name" + playlist.playlistID;
    playlistName.innerText = playlist.playlist_name;
    playlistCard.appendChild(playlistName);

    const playlistCreator = document.createElement("div");
    playlistCreator.className = "playlistName";
    playlistCreator.id = "creator" + playlist.playlistID;
    playlistCreator.innerText = playlist.playlist_creator;
    playlistCard.appendChild(playlistCreator);

    const likeCountImage = document.createElement("img");
    likeCountImage.className = "likeCountImage";
    likeCountImage.id = "countImage" + playlist.playlistID;
    likeCountImage.src = "assets/img/favicon.ico";
    playlistCard.appendChild(likeCountImage);

    const likeCount = document.createElement("div");
    likeCount.className = "likeCount";
    likeCount.id = "likeCount" + playlist.playlistID;
    likeCount.innerText = playlist.likeCount || 0;
    playlistCard.appendChild(likeCount);

    likeCountImage.addEventListener("click", (event) => {
        event.stopPropagation();
        playlist.likeCount = playlist.likeCount === 0 ? 1 : 0;
        likeCount.innerText = playlist.likeCount;
    });

    playlistCard.addEventListener("click", () => {
        modal(index);
    });

    return playlistCard;
}
//Create all playlist cards for a playlist
function home() {
    const targetParent = document.getElementById("playlistCardsContainer");
    data.playlists.forEach((playlist, index) => {
        let playlistCard = createPlaylistCard(index);
        targetParent.appendChild(playlistCard);
    });
}
/**************** Modal **********************/
//Pop modal header
function modalHeader(playlistIndex) {
    const playlist = data.playlists[playlistIndex];
    const headerDiv = document.getElementById("modalHeader");

    const playlistCoverImg = document.getElementById("playlistCoverModal");
    playlistCoverImg.src = playlist.playlist_art;

    const playlistName = document.getElementById("playlistNameModal");
    playlistName.innerText = playlist.playlist_name;

    const playlistCreator = document.getElementById("playlistCreatorModal");
    playlistCreator.innerText = playlist.playlist_creator;

    const shuffleButton = document.getElementById("shuffleButton");
    shuffleButton.onclick = () => shuffleSongs(playlistIndex);
    headerDiv.appendChild(shuffleButton);
}

//Random Shuffle songs
function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]]; // Swap elements
   }
}

function shuffleSongs(playlistIndex) {
   const playlist = data.playlists[playlistIndex];
   const shuffledSongs = [...playlist.songs]; // Copy the songs array
   shuffleArray(shuffledSongs); // Shuffle the copy

   const targetParent = document.getElementById("playlistSongs");
   targetParent.innerHTML = '';  // Clear existing songs

   shuffledSongs.forEach((song) => {
       const originalIndex = playlist.songs.findIndex(originalSong => originalSong.songID === song.songID);
       let songCard = createSongCard(playlistIndex, originalIndex);
       targetParent.appendChild(songCard);
   });
}

//Create a song card for each song in a playlist
function playlistSongs(playlistIndex) {
    const playlist = data.playlists[playlistIndex];
    const targetParent = document.getElementById("playlistSongs");
    targetParent.innerHTML = '';

    playlist.songs.forEach((song, index) => {
        let songCard = createSongCard(playlistIndex, index);
        targetParent.appendChild(songCard);
    });
}

//Create a song card for a specific song in a playlist
function createSongCard(playlistIndex, songIndex) {
   const song = data.playlists[playlistIndex].songs[songIndex];
   const songDiv = document.createElement("div");
   songDiv.className = "song";
   songDiv.id = song.songID;
   const     songCoverImg = document.createElement("img");
   songCoverImg.className = "songCover";
   songCoverImg.id = "songCover" + song.songID;
   songCoverImg.src = song.cover_art;
   songDiv.appendChild(songCoverImg);

   const songTitle = document.createElement("div");
   songTitle.className = "songTitle";
   songTitle.id = "songTitle" + song.songID;
   songTitle.innerText = song.title;
   songDiv.appendChild(songTitle);

   const songArtist = document.createElement("div");
   songArtist.className = "songArtist";
   songArtist.id = "songArtist" + song.songID;
   songArtist.innerText = song.artist;
   songDiv.appendChild(songArtist);

   const songAlbum = document.createElement("div");
   songAlbum.className = "songAlbum";
   songAlbum.id = "songAlbum" + song.songID;
   songAlbum.innerText = song.album;
   songDiv.appendChild(songAlbum);

   const songDuration = document.createElement("div");
   songDuration.className = "songDuration";
   songDuration.id = "songDuration" + song.songID;
   songDuration.innerText = song.duration;
   songDiv.appendChild(songDuration);

   return songDiv;
}

let modalOpen = false;

//Open and pop modal
function modal(playlistIndex) {
   if (modalOpen) {
       document.getElementById("playlistModal").classList.remove("open");
       document.getElementById("playlistModal").style.display = "none";
   }

   modalHeader(playlistIndex);
   playlistSongs(playlistIndex);

   document.getElementById("playlistModal").classList.add("open");
   document.getElementById("playlistModal").style.display = "block";

   modalOpen = true;
}

/*********************** Main Homepage **********************/
//populatie and make the close button in modal
function main() {
   home();
   const closeButton = document.getElementById('closeButton');
   closeButton.onclick = function(event) {
   document.getElementById('playlistModal').classList.remove('open');
   document.getElementById('playlistModal').style.display = 'none';
   modalOpen = false;
};
}
