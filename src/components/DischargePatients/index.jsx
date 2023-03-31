import React from 'react';
import {
  createStyles, Container, Paper,
  Title, Center
} from '@mantine/core';
import '@lottiefiles/lottie-player';
import { PatientTable } from './DischargeTable';
// import { useAuth } from '../../hooks/useAuth';

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

export function Discharge() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Center mt={40}>
          <Title className={classes.title} order={3}>
            Discharge Patients
          </Title>
        </Center>
        <Paper m={10}>

          <PatientTable />
        </Paper>
      </Container>

    </div>
  );
}
