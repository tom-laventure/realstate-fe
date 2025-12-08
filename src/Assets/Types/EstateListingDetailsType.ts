export default interface EstateListingDetails {
  id: number
  estate_id: number
  list_price: string | null
  gross_taxes: string | null
  strata_fees: string | null
  is_pre_approved_available: boolean
  bedrooms: number | null
  full_bathrooms: number | null
  property_type: string | null
  year_built: string | null
  age: string | null
  title: string | null
  style: string | null
  heating_type: string | null
  features: string | null
  amenities: string | null
  appliances: string | null
  community: string | null
  days_on_market: number | null
  views_count: number | null
  mls_number: string | null
  mls_source: string | null
  board: string | null
  created_at: string
  updated_at: string
  source: string | null
  price: string | null
  beds: number | null
  baths: number | null
  sqft: number | null,
  open_houses: []
}