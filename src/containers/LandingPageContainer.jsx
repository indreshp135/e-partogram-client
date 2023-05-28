import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { HeaderNav } from '../components/Header';
import { Faq } from '../components/Landing/FAQ';
import { FeaturesGrid } from '../components/Landing/Features';
import { TopLanding } from '../components/Landing/TopLanding';

export function LandingPageContainer() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const notifyToken = searchParams.get('_notifyToken');
  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_title: 'Landing Page',
      page_path: location.pathname + location.search,
      page_location: window.location.href
    });
    if (notifyToken) { localStorage.setItem('notifyToken', notifyToken); }
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
