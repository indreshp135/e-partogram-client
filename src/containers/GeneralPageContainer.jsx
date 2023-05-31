import React, { useState, useEffect } from 'react';
import {
  AppShell,
  useMantineTheme
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { HeaderNav } from '../components/Header';

export function GeneralPageContainer({ child, name }) {
  const location = useLocation();
  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_title: name,
      page_path: location.pathname + location.search,
      page_location: window.location.href
    });
  }, [location]);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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
      navbarOffsetBreakpoint="xs"
      navbar={
        <NavBar opened={opened} setOpened={setOpened} />
      }
      header={
        <HeaderNav opened={opened} setOpened={setOpened} />
      }
    >
      <div style={{
        height: '100%',
        '& > *': {
          height: '100%'
        }
      }}
      >
        {child}
      </div>
    </AppShell>
  );
}

GeneralPageContainer.propTypes = {
  child: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired
};
