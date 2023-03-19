
export interface IExternalURL {
    spotify: string
}

export interface IOwner {
    "display_name": string,
    "external_urls": IExternalURL,
    "href": string,
    "id": string,
    "type": string,
    "uri": string
}
export interface ITracks {
    href: string,
    total: number
}
export interface IAlbumImage {
    height: number,
    url: string,
    width: number
}
export interface IArtists {
    "external_urls": IExternalURL,
    "href": string,
    "id": string,
    "name": string,
    "type": string,
    "uri": string
}
export interface INewRelease {
    album_group: string,
    album_type: string,
    artists: IArtists[],
    available_markets: string[],
    external_urls: IExternalURL,
    href: string,
    id: string,
    images: IAlbumImage[],
    is_playable: boolean,
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string
}

export interface IFeaturedPlaylist {
    "collaborative": boolean,
    "description": string,
    "external_urls": IExternalURL,
    "href": string,
    "id": string,
    "images": IAlbumImage[],
    "name": string,
    "owner": IOwner,
    "primary_color": string | null,
    "public": string | null,
    "snapshot_id": string,
    "tracks": ITracks,
    "type": string,
    "uri": string
}

export interface ICategory {
    "href": string,
    "icons": IAlbumImage[],
    "id": string,
    "name": string
}
