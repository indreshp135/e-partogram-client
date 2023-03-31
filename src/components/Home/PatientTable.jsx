import React, { useEffect, useState } from 'react';
import {
  createStyles, Table, ScrollArea, rem, Text
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import { listPatientsRequest } from '../../utils/requests';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`
    }
  },

  scrolled: {
    boxShadow: theme.shadows.sm
  }
}));

export function PatientTable() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState([]);

  const { request } = useLoading();

  const getPatients = async () => {
    const response = await request(() => listPatientsRequest());
    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  const rows = data.map((row, idx) => (
    <tr key={`row-${idx * 2}`}>
      <td>{idx + 1}</td>
      <td>
        <Link
          href={`/patient/${row.id}`}
          style={{
            textDecoration: 'none'
          }}
        >
          <Text color="blue">
            {row.name}
          </Text>
        </Link>
      </td>
      <td
        style={{
          color: row.status === 'Critical' ? 'red' : row.status === 'Normal' ? 'green' : 'orange'
        }}
      >
        {row.status}
      </td>
      <td>
        <Link
          to={`/add-measurement/${row.id}`}
          style={{
            textDecoration: 'none'
          }}
        >
          <Text
            color="teal"
          >
            Add
          </Text>
        </Link>
      </td>
    </tr>
  ));

  return (
    <ScrollArea h={300} p={20} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table striped highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Measurement</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
