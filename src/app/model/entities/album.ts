import { Artist } from "./artist";
import { Track } from "./track";

export interface Album {
    id: number;
    title: string;
    cover_xl: string; //pic
    cover_medium: string;
    genres: any; //genres:data[0]:name
    type: string;
    nb_tracks: number;
    release_date: Date;
    artist: Artist;
    tracks: Track[]
}
