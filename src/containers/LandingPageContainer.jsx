import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderNav } from '../components/Header';
import { Faq } from '../components/Landing/FAQ';
import { FeaturesGrid } from '../components/Landing/Features';
import { TopLanding } from '../components/Landing/TopLanding';

export function LandingPageContainer() {
  const location = useLocation();
  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_title: 'Landing Page',
      page_path: location.pathname + location.search,
      page_location: window.location.href
    });
  }, [location]);
  return (
    <div>
      <HeaderNav opened={false} setOpened={() => {}} />
      <TopLanding />
      <FeaturesGrid />
      <Faq />
    </div>
  );
}
