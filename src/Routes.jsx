import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Import pages
import PlayerLandingPage from "./pages/player-landing-page";
import PlayerRegistration from "./pages/player-registration";
import PlayerLogin from "./pages/player-login";
import ForgotPassword from "./pages/forgot-password";
import VenueSearchResults from "./pages/venue-search-results";
import VenueDetails from "./pages/venue-details";
import BookingConfirmation from "./pages/booking-confirmation";
import PlayerProfileBookingHistory from "./pages/player-profile-booking-history";
import ProviderDashboard from "./pages/provider-dashboard";
import ProviderVenueManagement from "./pages/provider-venue-management";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <PlayerLandingPage /> },
    { path: "/player-landing-page", element: <PlayerLandingPage /> },
    { path: "/player-registration", element: <PlayerRegistration /> },
    { path: "/player-login", element: <PlayerLogin /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/venue-search-results", element: <VenueSearchResults /> },
    { path: "/venue-details", element: <VenueDetails /> },
    { path: "/booking-confirmation", element: <BookingConfirmation /> },
    { path: "/player-profile-booking-history", element: <PlayerProfileBookingHistory /> },
    { path: "/provider-dashboard", element: <ProviderDashboard /> },
    { path: "/provider-venue-management", element: <ProviderVenueManagement /> },
  ]);

  return element;
};

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <ProjectRoutes />
    </Router>
  );
};

export default Routes;