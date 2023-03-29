import React, { useState } from 'react';
import {
  createStyles, Table, ScrollArea, rem, Anchor
} from '@mantine/core';

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

  const data = [
    {
      patientId: '1',
      name: 'John Doe',
      status: 'Monitored'
    },
    {
      patientId: '2',
      name: 'Jane Doe',
      status: 'Critical'
    },
    {
      patientId: '1',
      name: 'John Doe',
      status: 'Critical'
    },
    {
      patientId: '2',
      name: 'Jane Doe',
      status: 'Normal'
    },
    {
      patientId: '1',
      name: 'John Doe',
      status: 'Critical'
    },
    {
      patientId: '2',
      name: 'Jane Doe',
      status: 'Normal'
    },
    {
      patientId: '1',
      name: 'John Doe',
      status: 'Monitored'
    },
    {
      patientId: '2',
      name: 'Jane Doe',
      status: 'Monitored'
    },
    {
      patientId: '1',
      name: 'John Doe',
      status: 'Monitored'
    },
    {
      patientId: '2',
      name: 'Jane Doe',
      status: 'Monitored'
    },
    {
      patientId: '1',
      name: 'John Doe',
      status: 'Monitored'
    },
    {
      patientId: '2',
      name: 'Jane Doe',
      status: 'Normal'
    }
  ];

  const rows = data.map((row, idx) => (
    <tr key={row.patientId}>
      <td>{idx + 1}</td>
      <td>
        <Anchor
          href={`/patient/${row.patientId}`}
          target="_blank"
          rel="noopener noreferrer"
          color="blue"
        >
          {row.name}
        </Anchor>
      </td>
      <td
        style={{
          color: row.status === 'Critical' ? 'red' : row.status === 'Normal' ? 'green' : 'orange'
        }}
      >
        {row.status}
      </td>
      <td>
        <Anchor
          href={`/add-measurement/${row.patientId}`}
          target="_blank"
          rel="noopener noreferrer"
          color="teal"
        >
          Add
        </Anchor>
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
