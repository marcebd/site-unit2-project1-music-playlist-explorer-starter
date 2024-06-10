//Featured page display random playlist and other playlists
document.addEventListener('DOMContentLoaded', function() {
    const selectedPlaylist = getRandomPlaylist();
    displayPlaylistDetails(selectedPlaylist);
    displayPlaylistSongs(selectedPlaylist);
    displayOtherPlaylists();

    // Setup the navigate button
    navButton = document.getElementById('navigateButton');
    navButton.addEventListener('click', function() {
       main(); // Initialize the home page content
    });
 });

 //Get random playlist
 function getRandomPlaylist() {
    const randomIndex = Math.floor(Math.random() * data.playlists.length);
    return data.playlists[randomIndex];
 }

 //Display playlist details and songs for featured page
 function displayPlaylistDetails(playlist) {
    const playlistImage = document.getElementById('playlistImageFeatured');
    const playlistName = document.getElementById('playlistNameFeatured');
    const playlistCreator = document.getElementById('playlistCreatorFeatured');

    playlistImage.src = playlist.playlist_art;
    playlistName.textContent = playlist.playlist_name;
    playlistCreator.textContent = playlist.playlist_creator;
 }

 //Display playlist songs for featured page
 function displayPlaylistSongs(playlist) {
    const songList = document.getElementById('songListFeatured');
    songList.innerHTML = ''; // Clear previous songs

    playlist.songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song-item';

        const songCoverImg = document.createElement('img');
        songCoverImg.src = song.cover_art;
        songCoverImg.alt = 'Cover Art';
        songCoverImg.className = 'song-cover';

        const songDetailsDiv = document.createElement('div');
        songDetailsDiv.className = 'song-details';

        const songTitle = document.createElement('div');
        songTitle.className = 'song-title';
        songTitle.textContent = song.title;

        const songArtist = document.createElement('div');
        songArtist.className = 'song-artist';
        songArtist.textContent = song.artist;

        const songDuration = document.createElement('div');
        songDuration.className = 'song-duration';
        songDuration.textContent = song.duration;

        songDetailsDiv.appendChild(songTitle);
        songDetailsDiv.appendChild(songArtist);
        songDetailsDiv.appendChild(songDuration);

        songDiv.appendChild(songCoverImg);
        songDiv.appendChild(songDetailsDiv);

        songList.appendChild(songDiv);
    });
 }

 //Display other playlists for featured page
 function displayOtherPlaylists() {
    const otherPlaylistsDiv = document.getElementById('otherPlaylists');
    otherPlaylistsDiv.innerHTML = ''; // Clear previous playlists

    let playlists = [];
    while (playlists.length < 3) {
        let randomPlaylist = getRandomPlaylist();
        if (!playlists.includes(randomPlaylist)) {
            playlists.push(randomPlaylist);
        }
    }

    playlists.forEach(playlist => {
        const playlistDiv = document.createElement('div');
        playlistDiv.className = 'playlist-item';

        const playlistCoverImg = document.createElement('img');
        playlistCoverImg.src = playlist.playlist_art;
        playlistCoverImg.alt = 'Playlist Cover';
        playlistCoverImg.className = 'playlist-cover';

        const playlistName = document.createElement('div');
        playlistName.className = 'playlist-name';
        playlistName.textContent = playlist.playlist_name;

        playlistDiv.appendChild(playlistCoverImg);
        playlistDiv.appendChild(playlistName);

        otherPlaylistsDiv.appendChild(playlistDiv);
    });
 }
