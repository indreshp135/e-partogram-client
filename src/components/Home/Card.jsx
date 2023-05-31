import React from 'react';
import {
  Text, Button, Badge, Flex, Card, createStyles, Group
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const useStyles = createStyles(() => ({

  card: {
    maxWidth: '20rem',
    padding: '.75rem',
    margin: '2rem 0.5rem',
    border: 0,
    flexBasis: '20rem',
    flexGrow: 0,
    flexShrink: 0,
    '@media (max-width: 900px)': {
      maxWidth: '100%',
      height: '100%',
      flexBasis: '100%'
    }
  }
}));

export function PatientCard({
  name, critical, index, id
}) {
  const classes = useStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <Card className={classes.card} radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color={critical > 3 ? 'red' : critical < 1 ? 'green' : 'orange'} variant="light">
          {critical > 3 ? 'Critical' : critical < 1 ? 'Normal' : 'Moderate'}
        </Badge>
      </Group>
      <Text size="sm" color="dimmed">
        {`Patient Number: ${index + 100}`}
      </Text>
      <Flex gap="md">
        <Button variant="light" fullWidth mt="md" radius="md" onClick={() => navigate(`/patient-history/${id}`)}>
          View
        </Button>
        {
          user.role === 'Doctor' ? (
            <Button variant="light" fullWidth mt="md" radius="md" color="blue" onClick={() => navigate(`/nearbyhospital/${id}`)}>
              Referral
            </Button>
          ) : null
        }
      </Flex>
    </Card>
  );
}

PatientCard.propTypes = {
  name: PropTypes.string.isRequired,
  critical: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};
