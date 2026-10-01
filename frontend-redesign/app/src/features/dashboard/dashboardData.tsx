import type { ReactNode } from 'react'

export type StreamDecision = 'transcode' | 'direct-play' | 'direct-stream'

export type StreamFixture = {
  decision: StreamDecision
  platform: string
  backdrop: string
  poster: string
  title: string
  subtitle: string
  progress: number
  elapsed: string
  duration: string
  eta: string
  user: string
  avatar: string
  device: string
  details: Array<[string, string | ReactNode]>
}

export const activeStreams: StreamFixture[] = [
  {
    decision: 'transcode', platform: 'Plex Web', backdrop: 'https://image.tmdb.org/t/p/w1280/eZ239CUp1d6OryZEBPnO2n87gMG.jpg', poster: 'https://image.tmdb.org/t/p/w342/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', title: 'Dune: Part Two', subtitle: '2024 · Movie', progress: 61, elapsed: '1:42:10', duration: '2:46:00', eta: 'ETA 9:14 PM', user: 'john_doe', avatar: 'john', device: 'Plex Web · Chrome · macOS', details: [['Stream', 'Transcode (3.2×)'], ['Video', <>HEVC HW 4K HDR<br /><span className="text-muted">→ H264 1080p SDR</span></>], ['Audio', 'TrueHD 7.1 Direct'], ['Subtitle', 'EN SRT Direct'], ['Quality', '20 Mbps'], ['Bandwidth', '20.0 Mbps'], ['Location', 'WAN'], ['IP', '203.0.113.42']],
  },
  {
    decision: 'direct-play', platform: 'Apple TV', backdrop: 'https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg', poster: 'https://image.tmdb.org/t/p/w342/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg', title: 'Breaking Bad', subtitle: 'S04 · E10 — Salud', progress: 38, elapsed: '18:32', duration: '48:00', eta: 'ETA 9:41 PM', user: 'sarah_k', avatar: 'sarah', device: 'Apple TV · tvOS 17', details: [['Stream', 'Direct Play'], ['Video', 'H264 1080p'], ['Audio', 'EN · AC3 5.1'], ['Subtitle', 'None'], ['Quality', '8 Mbps'], ['Bandwidth', '8.0 Mbps'], ['Location', 'LAN'], ['IP', '192.168.1.22']],
  },
  {
    decision: 'direct-stream', platform: 'Android', backdrop: 'https://image.tmdb.org/t/p/w1280/dcvbs8z0GEXslC1kCT77x19XDeR.jpg', poster: 'https://image.tmdb.org/t/p/w342/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', title: 'Bohemian Rhapsody', subtitle: 'Queen · A Night at the Opera', progress: 55, elapsed: '3:18', duration: '5:55', eta: 'Paused', user: 'mike99', avatar: 'mike99', device: 'Plex for Android · Pixel 8', details: [['Stream', 'Direct Stream'], ['Audio', 'FLAC → AAC'], ['Container', 'FLAC Direct'], ['Quality', 'Original'], ['Bandwidth', '1.4 Mbps'], ['IP', '198.51.100.7']],
  },
]

export const recentlyAdded = [
  ['Civil War', '2024', '2d ago', 'sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg'],
  ['Interstellar', '', '3d ago', 'yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg'],
  ['The Substance', '', '4d ago', '8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'],
  ['Conclave', '', '5d ago', 'eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg'],
  ['Shogun S01', '', '1w ago', 'ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg'],
  ['Alien: Romulus', '', '1w ago', '1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg'],
  ['Longlegs', '', '1w ago', '1EwNyiiNFd863H4e8nWEzutnZD7.jpg'],
  ['Twisters', '', '2w ago', 'pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg'],
  ['Hit Man', '', '2w ago', 'oil3EZwKFp3CWxZnfGfGglesvm9.jpg'],
  ['A Quiet Place', '', '2w ago', 'nAU74GmpUk7t5iklEp3bufwDq4n.jpg'],
] as const

export const libraryOverview = [
  ['Movies', 'Movie library', '1,248 items', '32 added', '84 plays'],
  ['TV Shows', 'Show library', '384 shows', '12 added', '61 plays'],
  ['Music', 'Artist library', '8,420 tracks', '94 added', '37 plays'],
  ['Home Videos', 'Video library', '92 videos', '4 added', '12 plays'],
] as const

export type LibraryStatistic = {
  id: string
  title: string
  period: string
  featured: {
    title: string
    subtitle: string
    count: number
    backdrop?: string
    image?: string
    shape: 'poster' | 'cover' | 'placeholder'
    placeholder?: string
    layout?: 'center' | 'bottom'
  }
  entries: Array<{
    title: string
    count: number
    progress?: number
    image?: string
    shape?: 'poster' | 'cover' | 'placeholder'
    placeholder?: string
  }>
}

export const libraryStatistics: LibraryStatistic[] = [
  {
    id: 'movies', title: 'Top Movies', period: 'Last 30 days',
    featured: { title: 'Oppenheimer', subtitle: '2023', count: 47, backdrop: 'https://image.tmdb.org/t/p/w1280/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg', image: 'https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', shape: 'poster' },
    entries: [
      { title: 'Dune: Part Two', count: 38, progress: 81, image: 'https://image.tmdb.org/t/p/w342/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', shape: 'poster' },
      { title: 'The Substance', count: 31, progress: 66, image: 'https://image.tmdb.org/t/p/w342/lqoMzCcZYEFK729d6qzt349fB4o.jpg', shape: 'poster' },
      { title: 'Conclave', count: 26, progress: 55, image: 'https://image.tmdb.org/t/p/w342/m5x8D0bZ3eKqIVWZ5y7TnZ2oTVg.jpg', shape: 'poster' },
      { title: 'Civil War', count: 21, progress: 44, image: 'https://image.tmdb.org/t/p/w342/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg', shape: 'poster' },
    ],
  },
  {
    id: 'tv', title: 'Top TV Shows', period: 'Last 30 days',
    featured: { title: 'Breaking Bad', subtitle: 'Drama', count: 124, backdrop: 'https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg', image: 'https://image.tmdb.org/t/p/w342/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg', shape: 'poster' },
    entries: [
      { title: 'The Bear', count: 89, progress: 72, image: 'https://image.tmdb.org/t/p/w342/eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg', shape: 'poster' },
      { title: 'Shōgun', count: 67, progress: 54, image: 'https://image.tmdb.org/t/p/w342/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg', shape: 'poster' },
      { title: 'One Piece', count: 49, progress: 40, image: 'https://image.tmdb.org/t/p/w342/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg', shape: 'poster' },
      { title: 'The Bear', count: 38, progress: 31, image: 'https://image.tmdb.org/t/p/w342/eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg', shape: 'poster' },
    ],
  },
  {
    id: 'music', title: 'Top Music', period: 'Last 30 days',
    featured: { title: 'Taylor Swift', subtitle: 'The Eras Tour', count: 214, backdrop: 'https://image.tmdb.org/t/p/w342/jf3YO8hOqGHCupsREf5qymYq1n.jpg', image: 'https://image.tmdb.org/t/p/w342/jf3YO8hOqGHCupsREf5qymYq1n.jpg', shape: 'cover' },
    entries: [
      { title: 'Queen', count: 154, progress: 72, image: 'https://image.tmdb.org/t/p/w342/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', shape: 'cover' },
      { title: 'Elton John', count: 118, progress: 55, image: 'https://image.tmdb.org/t/p/w342/f4FF18ia7yTvHf2izNrHqBmgH8U.jpg', shape: 'cover' },
      { title: 'Elvis Presley', count: 86, progress: 40, image: 'https://image.tmdb.org/t/p/w342/qBOKWqAFbveZ4ryjJJwbie6tXkQ.jpg', shape: 'cover' },
      { title: 'Whitney Houston', count: 62, progress: 29, image: 'https://image.tmdb.org/t/p/w342/rEHb3f5wrLuDMHQDfirlwcqA3NT.jpg', shape: 'cover' },
    ],
  },
  {
    id: 'home-videos', title: 'Home Videos', period: 'Last 30 days',
    featured: { title: 'Summer 2024', subtitle: 'Family · Jul 2024', count: 43, shape: 'placeholder', placeholder: '▶', layout: 'bottom' },
    entries: [
      { title: 'Christmas 2023', count: 28, progress: 65, shape: 'placeholder', placeholder: '▶' },
      { title: 'Spring Break 2024', count: 19, progress: 44, shape: 'placeholder', placeholder: '▶' },
      { title: 'Birthday Party', count: 13, progress: 30, shape: 'placeholder', placeholder: '▶' },
      { title: 'Graduation 2024', count: 8, progress: 19, shape: 'placeholder', placeholder: '▶' },
    ],
  },
  {
    id: 'documentaries', title: 'Documentaries', period: 'Last 30 days',
    featured: { title: 'Planet Earth III', subtitle: 'Nature', count: 34, shape: 'placeholder', placeholder: '▣' },
    entries: [{ title: 'Free Solo', count: 27 }, { title: 'The Last Dance', count: 21 }, { title: 'Cosmos', count: 16 }],
  },
  {
    id: 'anime', title: 'Anime', period: 'Last 30 days',
    featured: { title: 'One Piece', subtitle: 'Adventure', count: 89, shape: 'placeholder', placeholder: '▤' },
    entries: [{ title: 'Shōgun', count: 67 }, { title: 'Jujutsu Kaisen', count: 53 }, { title: 'Frieren', count: 41 }],
  },
  {
    id: 'kids', title: 'Kids', period: 'Last 30 days',
    featured: { title: 'Moana', subtitle: 'Family', count: 72, shape: 'placeholder', placeholder: '★' },
    entries: [{ title: 'Toy Story', count: 64 }, { title: 'Frozen', count: 51 }, { title: 'Paddington', count: 38 }],
  },
]
