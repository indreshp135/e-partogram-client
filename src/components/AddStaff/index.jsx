import React, { useEffect } from 'react';
import {
  Stack, Container,
  Title, Center, Button, Autocomplete
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLoading } from '../../hooks/useLoading';
import { getAllStaffRequest } from '../../utils/requests';

export function AddStaff() {
  const [data, setData] = React.useState([]);

  const form = useForm({
    initialValues: {
      staff: '',
      isActive: false
    }
  });

  const handleSubmit = () => {
    console.log(form.values);
  };

  const { request } = useLoading();

  const getData = async () => {
    try {
      const response = await request(getAllStaffRequest);
      if (response.status === 200) {
        setData(response.data.map((staff) => ({
          group: staff.role,
          value: staff.email,
          id: staff.email
        })));
        console.log(data, response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Center>
        <Title order={2}>Add Staff</Title>
      </Center>
      <Stack spacing="md" p={20}>
        <Autocomplete
          label="Select Staff"
          placeholder="Select Staff to add"
          {...form.getInputProps('staff')}
          data={data}
        />
      </Stack>
      <Center>
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Center>
    </Container>
  );
}
