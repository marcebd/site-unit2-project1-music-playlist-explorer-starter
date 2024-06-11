// This script is executed when the DOM content has fully loaded.
document.addEventListener('DOMContentLoaded', function() {
   // Retrieve a random playlist from the data.
   const selectedPlaylist = getRandomPlaylist();
   // Display the details of the selected playlist.
   displayPlaylistDetails(selectedPlaylist);
   // Display the songs of the selected playlist.
   displayPlaylistSongs(selectedPlaylist);
   // Display other playlists on the featured page.
   displayOtherPlaylists();

   // Setup the navigate button to go back to the home page when clicked.
   const navButton = document.getElementById('navigateButton');
   navButton.addEventListener('click', function() {
       main(); // Call the main function to initialize the home page content.
   });
});

// Function to select a random playlist from the available data.
function getRandomPlaylist() {
   // Generate a random index based on the number of playlists.
   const randomIndex = Math.floor(Math.random() * data.playlists.length);
   // Return the playlist at the randomly selected index.
   return data.playlists[randomIndex];
}

// Function to display the details of a playlist on the featured page.
function displayPlaylistDetails(playlist) {
   // Get the HTML elements for displaying playlist details.
   const playlistImage = document.getElementById('playlistImageFeatured');
   const playlistName = document.getElementById('playlistNameFeatured');
   const playlistCreator = document.getElementById('playlistCreatorFeatured');

   // Set the source of the playlist image to the playlist's artwork URL.
   playlistImage.src = playlist.playlist_art;
   // Set the text content of the playlist name element.
   playlistName.textContent = playlist.playlist_name;
   // Set the text content of the playlist creator element.
   playlistCreator.textContent = playlist.playlist_creator;
}

// Function to display songs for a specific playlist on the featured page.
function displayPlaylistSongs(playlist) {
   // Get the HTML element where songs will be listed.
   const songList = document.getElementById('songListFeatured');
   // Clear any existing songs from the list to prepare for new content.
   songList.innerHTML = '';

   // Iterate over each song in the playlist.
   playlist.songs.forEach(song => {
       // Create a div element for each song.
       const songDiv = document.createElement('div');
       songDiv.className = 'song-item';

       // Create an image element for the song cover.
       const songCoverImg = document.createElement('img');
       songCoverImg.src = song.cover_art;
       songCoverImg.alt = 'Cover Art';
       songCoverImg.className = 'song-cover';

       // Create a div for holding the song details.
       const songDetailsDiv = document.createElement('div');
       songDetailsDiv.className = 'song-details';

       // Create and append elements for the song title.
       const songTitle = document.createElement('div');
       songTitle.className = 'song-title';
       songTitle.textContent = song.title;

       // Create and append elements for the song artist.
       const songArtist = document.createElement('div');
       songArtist.className = 'song-artist';
       songArtist.textContent = song.artist;

       // Create and append elements for the song duration.
       const songDuration = document.createElement('div');
       songDuration.className = 'song-duration';
       songDuration.textContent = song.duration;

       // Append title, artist, and duration to the song details div.
       songDetailsDiv.appendChild(songTitle);
       songDetailsDiv.appendChild(songArtist);
       songDetailsDiv.appendChild(songDuration);

       // Append the cover image and details div to the main song div.
       songDiv.appendChild(songCoverImg);
       songDiv.appendChild(songDetailsDiv);

       // Append the complete song div to the song list container.
       songList.appendChild(songDiv);
   });
}

// Function to display other playlists on the featured page.
function displayOtherPlaylists() {
   // Get the HTML element where other playlists will be displayed.
   const otherPlaylistsDiv = document.getElementById('otherPlaylists');
   // Clear any existing playlists from the display to prepare for new content.
   otherPlaylistsDiv.innerHTML = '';

   // Initialize an array to hold the playlists to be displayed.
   let playlists = [];
   // Ensure that exactly three unique playlists are selected.
   while (playlists.length < 3) {
       let randomPlaylist = getRandomPlaylist();
       // Check if the randomly selected playlist is already included.
       if (!playlists.includes(randomPlaylist)) {
           playlists.push(randomPlaylist);
       }
   }

   // Iterate over each selected playlist and create elements to display them.
   playlists.forEach(playlist => {
       // Create a div for each playlist.
       const playlistDiv = document.createElement('div');
       playlistDiv.className = 'playlist-item';

       // Create an image element for the playlist cover.
       const playlistCoverImg = document.createElement('img');
       playlistCoverImg.src = playlist.playlist_art;
       playlistCoverImg.alt = 'Playlist Cover';
       playlistCoverImg.className = 'playlist-cover';

       // Create a div for the playlist name.
       const playlistName = document.createElement('div');
       playlistName.className = 'playlist-name';
       playlistName.textContent = playlist.playlist_name;

       // Append the cover image and name to the playlist div.
       playlistDiv.appendChild(playlistCoverImg);
       playlistDiv.appendChild(playlistName);

       // Append the complete playlist div to the container for other playlists.
       otherPlaylistsDiv.appendChild(playlistDiv);
   });
}
