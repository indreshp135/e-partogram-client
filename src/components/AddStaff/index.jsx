import React, { useEffect } from 'react';
import {
  Stack, Container,
  Title, Center, Button, Autocomplete
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { addStaff, listUnAssignedStaffs } from '../../utils/requests';

export function AddStaff() {
  const [data, setData] = React.useState([]);

  const form = useForm({
    initialValues: {
      staff: '',
      isActive: false
    }
  });

  const { request } = useLoading();

  const handleSubmit = async () => {
    try {
      const response = await request(() => addStaff({
        staffId: data.filter((staff) => staff.value === form.values.staff)[0].id,
        isActive: form.values.isActive
      }));
      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          color: 'teal',
          message: 'Staff added successfully'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await request(listUnAssignedStaffs);
      if (response.status === 200) {
        const { doctors, nurses } = response.data.response;

        const fullData = [
          ...nurses, ...doctors
        ];

        console.log(fullData);

        setData(fullData.map((staff) => ({
          group: staff.role,
          value: staff.email,
          id: staff.uid
        })));
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
