import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { AppShell, useMantineTheme } from '@mantine/core';
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
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
          height: '100%',
          '& > *': {
            height: '100%'
          }
        }
      }}
      header={
        <HeaderNav opened={false} setOpened={() => {}} />
      }
    >
      <div style={{
        height: '100%',
        '& > *': {
          height: '100%'
        }
      }}
      >
        <TopLanding />
        <FeaturesGrid />
        <Faq />
      </div>
    </AppShell>

  );
}
