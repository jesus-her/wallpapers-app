export interface Category {
    id: number | null
    name: string
    description: string
  }

  export interface IPrice {
    quantity?: number
    currency: string
    price: string
    size: string
  }
  
  export interface Tag {
    id: number
    name: string
    description: string
  }
  export interface IProduct {
    id: string
    name: string
    description: string
    main_image: string
    image_url: string

    favourite: boolean
    prices: IPrice[]

    added_on: Date
    available: boolean
    average_rating: number
    created_at: string
    updated_at: string
    category: Category
    tag: string
    type: string
  }
  