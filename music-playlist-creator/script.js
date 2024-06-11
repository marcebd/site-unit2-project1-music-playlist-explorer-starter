// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded before running the main function.
document.addEventListener('DOMContentLoaded', main);

/************* Helper functions  *********************/
// Function to retrieve a playlist by its ID from the data object.
function getPlaylistById(playlistId) {
    // Loop through each playlist in the data.playlists array.
    for (const playlist of data.playlists) {
        // Check if the current playlist's ID matches the provided ID.
        if (playlist.playlistID === parseInt(playlistId)) {
            // Return the matching playlist.
            return playlist;
        }
    }
    // Return null if no matching playlist is found.
    return null;
}

/************** Search Bar  ************/
// Setup the search functionality by attaching an event listener to the search input.
function setupSearch() {
    // Get the search input element by its ID.
    const searchInput = document.getElementById('searchInput');
    // Add an 'input' event listener that triggers the handleSearch function whenever the user types in the search bar.
    searchInput.addEventListener('input', handleSearch);
}

// Function to handle the search input.
function handleSearch(event) {
    // Get the search term from the input field and convert it to lowercase for case-insensitive comparison.
    const searchTerm = event.target.value.toLowerCase();
    // Filter the playlists to include only those that match the search term in their name or creator.
    const filteredPlaylists = data.playlists.filter(playlist => {
        const matchesPlaylist = playlist.playlist_name.toLowerCase().includes(searchTerm);
        const matchesCreator = playlist.playlist_creator.toLowerCase().includes(searchTerm);
        return matchesPlaylist || matchesCreator;
    });

    // Display the filtered playlists.
    displayFilteredPlaylists(filteredPlaylists);
}

// Function to display the filtered playlists in the DOM.
function displayFilteredPlaylists(playlists) {
    // Get the container where playlists are displayed.
    const playlistContainer = document.getElementById('playlistCardsContainer');
    // Clear any existing playlists from the container.
    playlistContainer.innerHTML = '';

    // Loop through each filtered playlist.
    playlists.forEach(playlist => {
        // Find the index of the playlist in the original data array to maintain the correct order.
        const index = data.playlists.findIndex(p => p.playlistID === playlist.playlistID);
        // Create a card for each playlist using its index.
        let playlistCard = createPlaylistCard(index);
        // Append the created card to the playlist container.
        playlistContainer.appendChild(playlistCard);
    });
}
/*************** Home Page *******************/

// Function to create a single playlist card based on the index of the playlist in the data array.
function createPlaylistCard(index) {
    // Retrieve the playlist object from the data array using the provided index.
    const playlist = data.playlists[index];

    // Create a new div element to serve as the playlist card.
    const playlistCard = document.createElement("div");
    playlistCard.className = "card";
    playlistCard.id = playlist.playlistID;

    // Create an image element for the playlist cover.
    const playlistCoverImg = document.createElement("img");
    playlistCoverImg.className = "playlistCover";
    playlistCoverImg.id = "cover" + playlist.playlistID;
    playlistCoverImg.src = playlist.playlist_art;
    playlistCard.appendChild(playlistCoverImg);

    // Create a div element for the playlist name.
    const playlistName = document.createElement("div");
    playlistName.className = "playlistName";
    playlistName.id = "name" + playlist.playlistID;
    playlistName.innerText = playlist.playlist_name;
    playlistCard.appendChild(playlistName);

    // Create a div element for the playlist creator.
    const playlistCreator = document.createElement("div");
    playlistCreator.className = "playlistCreator";
    playlistCreator.id = "creator" + playlist.playlistID;
    playlistCreator.innerText = playlist.playlist_creator;
    playlistCard.appendChild(playlistCreator);

    // Create an icon element for the like count, using Font Awesome's heart icon.
    const likeCountImage = document.createElement("i");
    likeCountImage.className = "likeCountImage far fa-heart"; // Font Awesome heart icon, outline by default
    likeCountImage.id = "countImage" + playlist.playlistID;
    playlistCard.appendChild(likeCountImage);

    // Create a div element for displaying the like count.
    const likeCount = document.createElement("div");
    likeCount.className = "likeCount";
    likeCount.id = "likeCount" + playlist.playlistID;
    likeCount.innerText = playlist.likeCount || 0;
    playlistCard.appendChild(likeCount);

    // Add an event listener to the like count image for click events.
    likeCountImage.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the event from bubbling up to parent elements.
        // Toggle the like count and update the class list to reflect the change visually.
        if (playlist.likeCount === 0) {
            playlist.likeCount = 1;
            likeCountImage.classList.remove('far'); // Remove the outline class
            likeCountImage.classList.add('fas', 'liked'); // Add the solid class and 'liked' class
        } else {
            playlist.likeCount = 0;
            likeCountImage.classList.remove('fas', 'liked'); // Remove the solid class and 'liked' class
            likeCountImage.classList.add('far'); // Add the outline class
        }
        likeCount.innerText = playlist.likeCount; // Update the displayed like count.
    });

    // Add an event listener to the playlist card for click events to open the modal.
    playlistCard.addEventListener("click", () => {
        modal(index);
    });

    // Return the fully constructed playlist card.
    return playlistCard;
}

// Function to create and display all playlist cards.
function home() {
    // Get the parent container where playlist cards will be appended.
    const targetParent = document.getElementById("playlistCardsContainer");
    // Iterate over each playlist in the data array and create a card for each.
    data.playlists.forEach((playlist, index) => {
        let playlistCard = createPlaylistCard(index);
        targetParent.appendChild(playlistCard); // Append the created card to the container.
    });
}
/**************** Modal **********************/

// Function to populate the modal header with playlist details.
function modalHeader(playlistIndex) {
    // Retrieve the playlist object using the provided index.
    const playlist = data.playlists[playlistIndex];
    // Get the modal header div element.
    const headerDiv = document.getElementById("modalHeader");

    // Set the playlist cover image in the modal.
    const playlistCoverImg = document.getElementById("playlistCoverModal");
    playlistCoverImg.src = playlist.playlist_art;

    // Set the playlist name in the modal.
    const playlistName = document.getElementById("playlistNameModal");
    playlistName.innerText = playlist.playlist_name;

    // Set the playlist creator in the modal.
    const playlistCreator = document.getElementById("playlistCreatorModal");
    playlistCreator.innerText = playlist.playlist_creator;

    // Get the shuffle button and set its click event to shuffle songs.
    const shuffleButton = document.getElementById("shuffleButton");
    shuffleButton.onclick = () => shuffleSongs(playlistIndex);
    headerDiv.appendChild(shuffleButton);
}

// Function to shuffle an array, used to shuffle songs.
function shuffleArray(array) {
    // Loop through the array elements from the end to the beginning.
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i.
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements array[i] and array[j].
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to shuffle songs in a playlist and display them.
function shuffleSongs(playlistIndex) {
    // Retrieve the playlist object using the provided index.
    const playlist = data.playlists[playlistIndex];
    // Create a copy of the songs array and shuffle it.
    const shuffledSongs = [...playlist.songs];
    shuffleArray(shuffledSongs);

    // Get the container for displaying songs and clear its current content.
    const targetParent = document.getElementById("playlistSongs");
    targetParent.innerHTML = '';

    // Create and append a song card for each shuffled song.
    shuffledSongs.forEach((song) => {
        const originalIndex = playlist.songs.findIndex(originalSong => originalSong.songID === song.songID);
        let songCard = createSongCard(playlistIndex, originalIndex);
        targetParent.appendChild(songCard);
    });
}

// Function to create and display song cards for each song in a playlist.
function playlistSongs(playlistIndex) {
    // Retrieve the playlist object using the provided index.
    const playlist = data.playlists[playlistIndex];
    // Get the container for displaying songs and clear its current content.
    const targetParent = document.getElementById("playlistSongs");
    targetParent.innerHTML = '';

    // Create and append a song card for each song in the playlist.
    playlist.songs.forEach((song, index) => {
        let songCard = createSongCard(playlistIndex, index);
        targetParent.appendChild(songCard);
    });
}

// Function to create a song card for a specific song in a playlist.
function createSongCard(playlistIndex, songIndex) {
    // Retrieve the song object using the playlist and song indices.
    const song = data.playlists[playlistIndex].songs[songIndex];
    // Create a div element for the song card.
    const songDiv = document.createElement("div");
    songDiv.className = "song";
    songDiv.id = song.songID;

    // Create an image element for the song cover.
    const songCoverImg = document.createElement("img");
    songCoverImg.className = "songCover";
    songCoverImg.id = "songCover" + song.songID;
    songCoverImg.src = song.cover_art;
    songDiv.appendChild(songCoverImg);

    // Create a div element for song information.
    const songInfo = document.createElement("div");

    // Create and append elements for song title, artist, and album.
    const songTitle = document.createElement("div");
    songTitle.className = "songTitle";
    songTitle.id = "songTitle" + song.songID;
    songTitle.innerText = song.title;
    songInfo.appendChild(songTitle);

    const songArtist = document.createElement("div");
    songArtist.className = "songArtist";
    songArtist.id = "songArtist" + song.songID;
    songArtist.innerText = song.artist;
    songInfo.appendChild(songArtist);

    const songAlbum = document.createElement("div");
    songAlbum.className = "songAlbum";
    songAlbum.id = "songAlbum" + song.songID;
    songAlbum.innerText = song.album;
    songInfo.appendChild(songAlbum);
    songDiv.appendChild(songInfo);

    // Create and append an element for the song duration.
    const songDuration = document.createElement("div");
    songDuration.className = "songDuration";
    songDuration.id = "songDuration" + song.songID;
    songDuration.innerText = song.duration;
    songDiv.appendChild(songDuration);
    // Return the fully constructed song card.
    return songDiv;
}
let modalOpen = false;

// Function to handle opening and populating the modal with playlist details.
function modal(playlistIndex) {
    // Check if the modal is already open.
    if (modalOpen) {
        // If the modal is open, close it by removing the 'open' class and hiding it.
        document.getElementById("playlistModal").classList.remove("open");
        document.getElementById("playlistModal").style.display = "none";
    }

    // Populate the modal header with playlist details.
    modalHeader(playlistIndex);
    // Populate the modal with songs from the selected playlist.
    playlistSongs(playlistIndex);

    // Open the modal by adding the 'open' class and setting display to block.
    document.getElementById("playlistModal").classList.add("open");
    document.getElementById("playlistModal").style.display = "block";

    // Set the modalOpen flag to true indicating the modal is now open.
    modalOpen = true;
}

/*********************** Main Homepage **********************/

// Main function to initialize the homepage.
function main() {
    // Call the home function to populate the homepage with playlist cards.
    home();
    // Setup the search functionality.
    setupSearch();
    // Get the close button element from the modal.
    const closeButton = document.getElementById('closeButton');
    // Set up an onclick event handler for the close button.
    closeButton.onclick = function(event) {
        // When the close button is clicked, remove the 'open' class and hide the modal.
        document.getElementById('playlistModal').classList.remove('open');
        document.getElementById('playlistModal').style.display = 'none';
        // Set the modalOpen flag to false indicating the modal is now closed.
        modalOpen = false;
    };
}
