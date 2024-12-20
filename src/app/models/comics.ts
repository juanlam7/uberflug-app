
export interface allComicResponse {
    code: number
    status: string
    copyright: string
    attributionText: string
    attributionHTML: string
    etag: string
    data: DataResponseComic
}

export interface DataResponseComic {
    offset: number
    limit: number
    total: number
    count: number
    results: Comic[]
}

export interface Comic {
    id: number
    digitalId: number
    title: string
    issueNumber: number
    variantDescription: string
    description: string
    modified: string
    isbn: string
    upc: string
    diamondCode: string
    ean: string
    issn: string
    format: string
    pageCount: number
    textObjects: TextObject[]
    resourceURI: string
    urls: Url[]
    series: Series
    variants: any[]
    collections: any[]
    collectedIssues: CollectedIssue[]
    dates: Date[]
    prices: Price[]
    thumbnail: Thumbnail
    images: Image[]
    creators: Creators
    characters: Characters
    stories: Stories
    events: Events
  }
  
  export interface TextObject {
    type: string
    language: string
    text: string
  }
  
  export interface Url {
    type: string
    url: string
  }
  
  export interface Series {
    resourceURI: string
    name: string
  }
  
  export interface CollectedIssue {
    resourceURI: string
    name: string
  }
  
  export interface Date {
    type: string
    date: string
  }
  
  export interface Price {
    type: string
    price: number
  }
  
  export interface Thumbnail {
    path: string
    extension: string
  }
  
  export interface Image {
    path: string
    extension: string
  }
  
  export interface Creators {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
  }
  
  export interface Item {
    resourceURI: string
    name: string
    role: string
  }
  
  export interface Characters {
    available: number
    collectionURI: string
    items: Item2[]
    returned: number
  }
  
  export interface Item2 {
    resourceURI: string
    name: string
  }
  
  export interface Stories {
    available: number
    collectionURI: string
    items: Item3[]
    returned: number
  }
  
  export interface Item3 {
    resourceURI: string
    name: string
    type: string
  }
  
  export interface Events {
    available: number
    collectionURI: string
    items: Item4[]
    returned: number
  }
  
  export interface Item4 {
    resourceURI: string
    name: string
  }
  