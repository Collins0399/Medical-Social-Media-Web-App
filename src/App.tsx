import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { MessagesPage } from "./pages/MessagesPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SubscriptionPage } from "./pages/SubscriptionPage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "opportunities":
        return <OpportunitiesPage />;
      case "resources":
        return <ResourcesPage />;
      case "messages":
        return <MessagesPage />;
      case "notifications":
        return <NotificationsPage />;
      case "profile":
        return <ProfilePage />;
      case "subscription":
        return <SubscriptionPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  const pageContent = renderPage();
  
  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {pageContent}
    </Layout>
  );
}