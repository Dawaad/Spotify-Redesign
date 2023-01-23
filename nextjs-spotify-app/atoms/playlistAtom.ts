import {atom} from 'recoil'

export const playlistState = atom<SpotifyApi.PlaylistObjectFull | null>({
    key: 'playlistState',
    default:null
})

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: '20xAkV5V7cJGc57AkghlJa'
});