import React from 'react';
import {
  Stack, Container, NumberInput,
  Title, Center, Button, TextInput, Select
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { addHospital } from '../../utils/requests';

export function AddHospital() {
  const [lat, setLan] = React.useState(0);
  const [lon, setLon] = React.useState(0);
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLan(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  } else {
    notifications.show({
      title: 'Error',
      message: 'Geolocation is not supported by your browser'
    });
  }

  const form = useForm({
    initialValues: {
      name: '',
      tier: 1,
      capacity: 0
    }
  });

  const { request } = useLoading();

  const handleSubmit = async () => {
    const response = await request(() => addHospital({ ...form.values, lat, lon }));
    if (response.status === 200) {
      notifications.show({
        title: 'Success',
        color: 'teal',
        message: 'Hospital added successfully'
      });
    }
  };

  //   const { request } = useLoading();

  return (
    <Container>
      <Center>
        <Title order={2}>Update Hospital Details</Title>
      </Center>
      <Stack spacing="md" p={20}>
        <TextInput
          label="Name"
          placeholder="Enter name of hospital"
          {...form.getInputProps('name')}
        />
        <Select
          label="Tier"
          placeholder="Select tier"
          {...form.getInputProps('tier')}
          data={[
            { value: 1, label: 'PHC' },
            { value: 2, label: 'UHC' }
          ]}
        />
        <NumberInput
          label="Latitude"
          placeholder="Enter latitude"
          value={lat}
          disabled
        />
        <NumberInput
          label="Longitude"
          placeholder="Enter longitude"
          value={lon}
          disabled
        />
        <NumberInput
          label="Capacity"
          placeholder="Enter capacity of hospital"
          {...form.getInputProps('capacity')}
        />
      </Stack>
      <Center>
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Center>
    </Container>
  );
}
