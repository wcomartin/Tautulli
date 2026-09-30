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
