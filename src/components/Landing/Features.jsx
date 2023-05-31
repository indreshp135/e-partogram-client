import React from 'react';
import {
  ThemeIcon,
  Text,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles
} from '@mantine/core';
import {
  IconReportAnalytics, IconDeviceMobileMessage, IconCalculatorOff, IconEye
} from '@tabler/icons';
import PropTypes from 'prop-types';

export const FEATURES = [
  {
    icon: IconReportAnalytics,
    title: 'Real-Time Data Visualization',
    description:
        'ePartogram allows doctors and nurses to monitor and visualize maternal and fetal data in real-time, ensuring prompt interventions when needed.'
  },
  {
    icon: IconCalculatorOff,
    title: 'Automated Calculations',
    description:
        'With ePartogram, all necessary calculations such as cervical dilatation, fetal heart rate, and uterine contractions are done automatically, reducing the risk of errors and saving time.'
  },
  {
    icon: IconEye,
    title: 'Decision Support System',
    description:
        'The software provides alerts and prompts for healthcare providers based on predefined thresholds, reducing the risk of adverse outcomes.'
  },
  {
    icon: IconDeviceMobileMessage,
    title: 'Mobile App',
    description:
        'The mobile app enable to receive real-time assignments, report incidents, and access critical information on-the-go, increasing efficiency and flexibility.'
  }
];

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

Feature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: 40
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left'
    }
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left'
    }
  }
}));

export function FeaturesGrid() {
  const { classes, theme } = useStyles();
  const features = FEATURES.map((feature) => <Feature {...feature} key={feature.title} />);

  return (
    <Container className={classes.wrapper}>

      <SimpleGrid
        mt={60}
        cols={2}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' }
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
