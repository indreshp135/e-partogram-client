import React, { useEffect, useState } from 'react';
import {
  createStyles, Table, ScrollArea, Button,
  rem, Text, Modal, Anchor, Textarea, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { dischargePatientRequest, listPatientsRequest } from '../../utils/requests';

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

  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState('');

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

  const submit = async () => {
    const response = await request(() => dischargePatientRequest(selected, comments));
    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        color: 'green',
        message: 'Patient discharged successfully'
      });
      getPatients();
    }
  };

  const rows = data.filter((patient) => patient.active).map((row, idx) => (
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
          color: row.critical > 3 ? 'red' : row.critical < 1 ? 'green' : 'orange'
        }}
      >
        {row.critical > 3 ? 'Critical' : row.critical < 1 ? 'Normal' : 'Moderate'}
      </td>
      <td>
        <Anchor
          color="yellow"
          onClick={() => {
            open();
            setSelected(row.id);
          }}
        >
          Discharge
        </Anchor>
      </td>
      <td>
        <Link
          to={`/nearbyhospital/${row.id}`}
          style={{
            textDecoration: 'none'
          }}
        >
          <Text
            color="violet"
          >
            Transfer
          </Text>
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Comments">
        <Textarea
          placeholder="Add Comments"
          onChange={(e) => {
            setComments(e.target.value);
          }}
        />
        <Center mt={20}>
          <Button
            onClick={() => {
              submit();
              close();
            }}
          >
            Discharge
          </Button>
        </Center>
      </Modal>
      <ScrollArea h={300} p={20} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table striped highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Discharge</th>
              <th>Transfer</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
