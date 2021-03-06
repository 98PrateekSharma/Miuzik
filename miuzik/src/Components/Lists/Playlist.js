import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import NormalList from '../NormalListLayout/NormalList'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
})

export default function Playlist({ code }) {
    const accessToken = code.code.code;
    const [playlist, setPlaylist] = useState([]);
    const [tracks, setTracks] = useState([])
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

    }, [accessToken])

    useEffect(() => {
        const arr = []
        if (!accessToken) return;
        spotifyApi.getFeaturedPlaylists({ limit: 3, offset: 1, country: 'IN', locale: 'sv_SE', timestamp: '2021-10-23T09:00:00' })
            .then(function (data) {
                setPlaylist(data.body.playlists.items[0].id);
                spotifyApi.getPlaylist(data.body.playlists.items[1].id)
                    .then(data => {
                        setTracks(data.body.tracks.items.map(track => {
                            return {
                                artist: track.track.artists[0].name,
                                title: track.track.name,
                                uri: track.track.uri,
                                albumUrl: track.track.album.images[2].url,
                            }
                        }))
                    }).catch((err) => {
                        console.log("Something went wrong!", err);
                    });
            }, function (err) {
                console.log("Something went wrong!", err);
            });
    }, [accessToken])
    // const chech = () => {
    //     tracks.map((track) => {
    //         console.log(track.track[0])
    //     })
    // }
    // useEffect(() => {

    //     console.log(playlist)
    // }, [playlist])
    // useEffect(() => {
    //     if (!accessToken) return;
    //     if (playlist != null) {
    //         spotifyApi.getPlaylist(playlist)
    //             .then(data => {
    //                 setTracks(data.body.tracks.items.map(track => {
    //                     return {
    //                         artist: track.track.artists[0].name,
    //                         title: track.track.name,
    //                         uri: track.track.uri,
    //                         albumUrl: track.track.album.images[2].url,
    //                     }
    //                 }))
    //             }).catch((err) => {
    //                 console.log("Something went wrong!", err);
    //             });
    //     }
    // }, [accessToken, playlist])
    return (
        <div>
            <NormalList data={{ title: "Playlist", tracks: tracks, setTrack: code.code.setTrack }}></NormalList>
        </div >
    )
}