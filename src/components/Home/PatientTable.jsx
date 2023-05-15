import React, { useState } from 'react';
import {
  createStyles, Table, ScrollArea, rem, Text
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

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

export function PatientTable({ data }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.filter((patient) => patient.active).map((row, idx) => (
    <tr key={`row-${idx * 2}`}>
      <td>{idx + 1}</td>
      <td>
        <Link
          to={`/patient-history/${row.id}`}
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
          color: row.critical > 3 ? 'red' : row.critical < 1 ? 'green' : 'orange'
        }}
      >
        {row.critical > 3 ? 'Critical' : row.critical < 1 ? 'Normal' : 'Moderate'}
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

PatientTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    critical: PropTypes.number,
    active: PropTypes.bool
  })).isRequired
};
