import React, { useEffect, useState } from 'react';
import {
  createStyles, Container,
  Title, Center, SimpleGrid
} from '@mantine/core';
import '@lottiefiles/lottie-player';
import { StatsControls } from './Stats';

import { useLoading } from '../../hooks/useLoading';
import { listPatientsRequest } from '../../utils/requests';
import { PatientCard } from './Card';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5
  },

  title: {
    margin: '10px 0'
  },

  paper: {
    cursor: 'pointer'
  },

  animation: {
    width: '80%',
    maxWidth: '800px'
  },

  link: {
    ...theme.fn.focusStyles(),
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    width: '100%',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}));

export function Homepage() {
  const { classes } = useStyles();
  const [data, setData] = useState([]);
  const [stat, setStats] = useState({
    Patients: 0,
    Critical: 0,
    Monitored: 0,
    Normal: 0
  });

  const { request } = useLoading();

  const getPatients = async () => {
    const response = await request(() => listPatientsRequest());
    if (response.status === 200) {
      setData(response.data);
      setStats({
        Patients: response.data.length,
        Critical: response.data.filter((patient) => patient.critical > 3).length,
        Monitored: response.data.filter((patient) => (patient.critical <= 3
          && patient.critical > 0)).length,
        Normal: response.data.filter((patient) => patient.critical === 0).length
      });
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div className={classes.root}>
      <Container px={0}>
        <StatsControls statData={stat} />
        <Center mt={40}>
          <Title className={classes.title} order={3}>
            Patient Details
          </Title>
        </Center>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
          {data.map((patient, ind) => (
            <PatientCard
              name={patient.name}
              critical={patient.critical}
              index={ind}
              id={patient.id}
            />
          ))}
        </SimpleGrid>
      </Container>

    </div>
  );
}
