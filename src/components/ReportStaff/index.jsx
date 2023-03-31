import React, { useEffect } from 'react';
import {
  createStyles, Container, Text,
  Title, Center, rem, Switch
} from '@mantine/core';
import '@lottiefiles/lottie-player';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5
  },

  title: {
    margin: '10px 0'
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm
  },

  itemDragging: {
    boxShadow: theme.shadows.sm
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60)
  }
}));

export function ReportStaff() {
  const { classes } = useStyles();

  const [data, setData] = React.useState([]);

  const getData = async () => {
    setData([
      {
        role: 'Doctor',
        name: 'Dr. John Doe',
        email: 'john@a.c'
      },
      {
        role: 'Nurse',
        name: 'Dr. Jane Doe',
        position: 'jane@a.c'
      }
    ]);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={classes.root}>
      <Container>
        <Center mt={40}>
          <Title className={classes.title} order={3}>
            Staff On Duty
          </Title>
        </Center>
        {
          data.map((item) => (
            <div
              className={classes.item}
            >
              <Text className={classes.symbol}>{item.role[0]}</Text>
              <div>
                <Text>{item.name}</Text>
                <Text color="dimmed" size="sm">
                  Email:
                  {' '}
                  {item.email}
                </Text>

              </div>
              <div style={{
                marginLeft: 'auto'
              }}
              >
                <Switch
                  color="teal"
                  size="lg"
                  onLabel="On Duty"
                  offLabel="Off Duty"
                />
              </div>
            </div>
          ))
        }
      </Container>

    </div>
  );
}
