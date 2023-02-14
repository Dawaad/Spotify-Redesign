export interface searchResult {
    albumResult :SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | undefined,
    artistResult :SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | undefined,
    playlistResult :SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> | undefined,
    trackResult :SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined,
}