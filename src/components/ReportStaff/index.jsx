import React, { useEffect } from 'react';
import {
  createStyles, Container, Text,
  Title, rem, Switch
} from '@mantine/core';
import '@lottiefiles/lottie-player';
import { notifications } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { getOnDutyStaff, updateStaff } from '../../utils/requests';

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

  const { request } = useLoading();

  const getData = async () => {
    const response = await request(getOnDutyStaff);
    if (response.status === 200) {
      setData(response.data.response);
    }
  };

  const changeStatus = async (id, status) => {
    const response = await request(() => updateStaff(id, status));
    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        color: 'teal',
        message: 'Staff status updated successfully'
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={classes.root}>
      <Container px={0}>
        <Title className={classes.title} order={3}>
          Staff On Duty
        </Title>
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
                  onChange={(e) => {
                    changeStatus(item.uid, e.currentTarget.checked);
                  }}
                />
              </div>
            </div>
          ))
        }
      </Container>

    </div>
  );
}
