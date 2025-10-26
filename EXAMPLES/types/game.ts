// types/game.ts
export interface Game {
  name: string
  affiliateLink: string
  imgLink: string
  ytLink?: string
  crossbuy: boolean
  bhaptics: boolean
}

export interface GameFilters {
  search: string
  hasVideo: boolean
  hasCrossbuy: boolean
  hasHaptic: boolean
}

export interface GameListOptions {
  pageSize?: number
  initialPage?: number
}
