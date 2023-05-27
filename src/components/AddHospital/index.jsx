import React, { useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker
} from '@react-google-maps/api';
import {
  Stack, Container, NumberInput, Loader,
  Title, Center, Button, TextInput, Select, Checkbox
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { addHospital } from '../../utils/requests';
import { API_KEY } from '../../config';

export function AddHospital() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  });
  const [lat, setLan] = React.useState(0);
  const [lon, setLon] = React.useState(0);
  const [center, setCenter] = React.useState();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLan(position.coords.latitude);
        setLon(position.coords.longitude);
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    } else {
      notifications.show({
        title: 'Error',
        message: 'Geolocation is not supported by your browser'
      });
    }
  }, []);

  const form = useForm({
    initialValues: {
      name: '',
      tier: 1,
      capacity: 0,
      specialist: false,
      cesarean: false
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

  const handleDragEnd = (e) => {
    setLan(e.latLng.lat());
    setLon(e.latLng.lng());
    setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    !isLoaded ? <Loader /> : (
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
          <Center m={20}>
            <GoogleMap
              flex={1}
              center={center}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '40vh' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
              }}
              onClick={handleDragEnd}
            >
              <Marker
                clickable
                position={center}
                draggable
                onDragEnd={handleDragEnd}
              />
            </GoogleMap>
          </Center>
          <NumberInput
            label="Capacity"
            placeholder="Enter capacity of hospital"
            {...form.getInputProps('capacity')}
          />
          <Checkbox
            size="md"
            label="Specialist Care"
            {...form.getInputProps('specialist')}
          />
          <Checkbox
            size="md"
            label="Cesarean Facility"
            {...form.getInputProps('cesarean')}
          />
          <Center>
            <Button
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Center>
        </Stack>
      </Container>
    )
  );
}
