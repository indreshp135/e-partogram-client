import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Auth } from '../components/Auth';

export function AuthPageContainer() {
  const location = useLocation();
  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_title: 'Auth Page',
      page_path: location.pathname + location.search,
      page_location: window.location.href
    });
  }, [location]);
  return (
    <div>
      <Auth />
    </div>
  );
}
