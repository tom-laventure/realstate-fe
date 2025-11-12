import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import EstateListingDetails from "Assets/Types/EstateListingDetailsType";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
    {title}
  </Typography>
);

interface Props {
  listing_detail: EstateListingDetails | null | undefined
}

const EstateDescription: React.FC<Props> = ({ listing_detail }) => {
  if (!listing_detail) return null;

  // map backend fields to UI-friendly names
  const priceDetails = {
    listPrice: listing_detail.list_price ?? listing_detail.price ?? "—",
    taxes: listing_detail.gross_taxes ?? "—",
    strataFees: listing_detail.strata_fees ?? "—",
    isPreApproved: !!listing_detail.is_pre_approved_available
  };

  const homeFacts = {
    bedrooms: listing_detail.bedrooms ?? listing_detail.beds ?? null,
    bathrooms: listing_detail.full_bathrooms ?? listing_detail.baths ?? null,
    propertyType: listing_detail.property_type,
    yearBuilt: listing_detail.year_built,
    age: listing_detail.age,
    title: listing_detail.title,
    style: listing_detail.style,
    heatingType: listing_detail.heating_type,
    features: (listing_detail.features || "").split(/\s*,\s*/).filter(Boolean),
    amenities: (listing_detail.amenities || "").split(/\s*,\s*/).filter(Boolean),
    appliances: (listing_detail.appliances || "").split(/\s*,\s*/).filter(Boolean),
    community: listing_detail.community
  };

  const agentDetails = {
    primaryAgent: listing_detail.source ?? "",
    primaryBroker: "" // adjust if you have broker info elsewhere
  };

  const listingDetails = {
    daysOnMarket: listing_detail.days_on_market,
    views: listing_detail.views_count,
    mlsNumber: listing_detail.mls_number,
    mlsSource: listing_detail.mls_source,
    board: listing_detail.board,
    source: listing_detail.source
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        p: 2,
        maxWidth: 800,
        mx: "auto",
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        {/* PRICE DETAILS */}
        <SectionHeader title="Price Details" />
        <Grid container spacing={1} alignItems="center">
          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              List Price
            </Typography>
            <Typography variant="h6">{priceDetails.listPrice}</Typography>
          </Grid>
          <Grid size={6} display="flex" justifyContent="flex-end">
            {/* optional CTA area */}
          </Grid>

          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Gross Taxes for 2024
            </Typography>
            <Typography>{priceDetails.taxes}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Strata Maintenance Fees
            </Typography>
            <Typography>{priceDetails.strataFees}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* HOME FACTS */}
        <SectionHeader title="Home Facts" />
        <Grid container spacing={1}>
          <Grid size={6}>
            <Typography>Bedrooms: {homeFacts.bedrooms ?? "—"}</Typography>
            <Typography>Full Bathrooms: {homeFacts.bathrooms ?? "—"}</Typography>
            <Typography>Property Type: {homeFacts.propertyType ?? "—"}</Typography>
            <Typography>Year Built: {homeFacts.yearBuilt ?? "—"}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography>Title: {homeFacts.title ?? "—"}</Typography>
            <Typography>Style: {homeFacts.style ?? "—"}</Typography>
            <Typography>Heating Type: {homeFacts.heatingType ?? "—"}</Typography>
            <Typography>Community: {homeFacts.community ?? "—"}</Typography>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Typography variant="body2" fontWeight="bold">
            Features:
          </Typography>
          <Typography color="text.secondary">
            {homeFacts.features.length ? homeFacts.features.join(", ") : "—"}
          </Typography>

          <Typography variant="body2" fontWeight="bold" mt={1}>
            Amenities:
          </Typography>
          <Typography color="text.secondary">
            {homeFacts.amenities.length ? homeFacts.amenities.join(", ") : "—"}
          </Typography>

          <Typography variant="body2" fontWeight="bold" mt={1}>
            Appliances:
          </Typography>
          <Typography color="text.secondary">
            {homeFacts.appliances.length ? homeFacts.appliances.join(", ") : "—"}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* AGENT DETAILS */}
        <SectionHeader title="Agent Details" />
        <Typography>Primary Agent: {agentDetails.primaryAgent || "—"}</Typography>
        <Typography>Primary Broker: {agentDetails.primaryBroker || "—"}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* LISTING DETAILS */}
        <SectionHeader title="Listing Details" />
        <Typography>Days on Market: {listingDetails.daysOnMarket ?? "—"}</Typography>
        <Typography>Property Views: {listingDetails.views ?? "—"}</Typography>
        <Typography>MLS® Number: {listingDetails.mlsNumber ?? "—"}</Typography>
        <Typography>Source: {listingDetails.mlsSource ?? listingDetails.source ?? "—"}</Typography>
        <Typography>Board: {listingDetails.board ?? "—"}</Typography>
      </CardContent>
    </Card>
  );
};

export default EstateDescription;
