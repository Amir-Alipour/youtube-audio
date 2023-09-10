export {};

declare global {
    type Video = {
        type: string
        videoId: string
        url: string
        title: string
        description: string
        image: string
        thumbnail: string
        seconds: number
        timestamp: string
        duration: Duration
        ago: string
        views: number
        author: Author
    }
    
    type Duration = {
        seconds: number
        timestamp: string
    }
    
    type Author = {
        name: string
        url: string
    }

    export type Audio = {
        videoDetail: VideoDetail
        download_link: DownloadLink
        isLive: boolean
      }
      
      export type VideoDetail = {
        videoId: string
        title: string
        lengthSeconds: string
        channelId: string
        isOwnerViewing: boolean
        shortDescription: string
        isCrawlable: boolean
        thumbnail: Thumbnail
        allowRatings: boolean
        viewCount: string
        author: string
        isPrivate: boolean
        isUnpluggedCorpus: boolean
        isLiveContent: boolean
      }
      
      export type Thumbnail = {
        thumbnails: Thumbnail2[]
      }
      
      export type Thumbnail2 = {
        url: string
        width: number
        height: number
      }
      
      export type DownloadLink = {
        mp4: Media
        webm: Media
      }
      
      export type Media = {
        url: string
      }

      export type Playlist = {
        playlist_name: string
        title: string
        thumnail: string | null
        items: Audio[]
        last_update: Date | null
    }
}