import React, { useRef } from 'react';
import {
  createStyles, Text, Paper, Group, rem, Center, Stack
} from '@mantine/core';
import {
  IconVaccine,
  IconDeviceDesktopAnalytics,
  IconStethoscope,
  IconUserCheck
} from '@tabler/icons';
import { PropTypes } from 'prop-types';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    boxShadow: theme.shadows.sm,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column'
    }
  },

  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.lg,
    color: theme.colors[theme.primaryColor][6]
  },

  stat: {
    minWidth: rem(98),
    paddingTop: theme.spacing.xl,
    minHeight: rem(140),
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    // hover
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
      transform: 'translateY(-2px)'
    }
  },

  label: {
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors.gray[6],
    lineHeight: 1.2
  },

  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: theme.black
  },

  count: {
    color: theme.colors.gray[6]
  },

  day: {
    fontSize: rem(44),
    fontWeight: 700,
    color: theme.colors[theme.primaryColor][6],
    lineHeight: 1,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  month: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors[theme.primaryColor][6],
    lineHeight: 1,
    textAlign: 'center'
  },

  controls: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: `calc(${theme.spacing.xl})`,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
      marginBottom: theme.spacing.xl
    }
  },

  date: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },

  control: {
    height: rem(28),
    width: '100%',
    color: theme.colors[theme.primaryColor][2],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    transition: 'background-color 50ms ease',

    [theme.fn.smallerThan('xs')]: {
      height: rem(34),
      width: rem(34)
    },

    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.white
    }
  },

  controlIcon: {
    [theme.fn.smallerThan('xs')]: {
      transform: 'rotate(-90deg)'
    }
  }
}));

const data = [
  { icon: IconStethoscope, label: 'Patients' },
  { icon: IconUserCheck, label: 'Normal' },
  { icon: IconDeviceDesktopAnalytics, label: 'Monitored' },
  { icon: IconVaccine, label: 'Critical' }
];

export function StatsControls({ statData }) {
  const { classes } = useStyles();
  const date = useRef(new Date());

  const stats = data.map((stat) => (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label}>

      <stat.icon size={32} className={classes.icon} stroke={1.5} />
      <Center>
        <Stack>
          <Text className={classes.label}>{stat.label}</Text>
          <Text
            fz="xs"
            className={classes.count}
            sx={{
              textAlign: 'center'
            }}
          >
            {statData[stat.label]}
          </Text>
        </Stack>

      </Center>
    </Paper>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.controls}>

        <div className={classes.date}>
          <Text className={classes.day}>
            {date.current.getDate()}
          </Text>
          <Text className={classes.month}>
            {
              date.current.toLocaleString('default', { month: 'long' })
            }
          </Text>
        </div>

      </div>
      <Group sx={{ flex: 1 }}>{stats}</Group>
    </div>
  );
}

StatsControls.propTypes = {
  statData: PropTypes.shape(
    {
      Patient: PropTypes.number.isRequired,
      Normal: PropTypes.number.isRequired,
      Monitored: PropTypes.number.isRequired,
      Critical: PropTypes.number.isRequired
    }
  ).isRequired
};
