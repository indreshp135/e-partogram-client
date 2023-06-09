import React, { useEffect, useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from '@react-google-maps/api';
import {
  Badge, Button, Card, Center, createStyles, Flex, Group, Loader, Text, Title, Modal, Stack, Switch
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { API_KEY } from '../../config';
import { getNearbyHospitalsRequest } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const useStyles = createStyles(() => ({
  row: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: '0 5rem',
    overflowX: 'auto',
    overflowY: 'hidden',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '0 1rem'
    }
  },
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

export function NearByHospitals() {
  const { classes } = useStyles();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  });
  const { request } = useLoading();
  const [res, setResponse] = useState({});
  const [, setMap] = useState(/** @type google.maps.Map */ (null));
  const [select, setSelect] = useState(-1);
  const [distance, setDistance] = useState('0 km');
  const [duration, setDuration] = useState('0 min');
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [user] = useLocalStorage('user', null);
  const [center, setCenter] = useState();
  const [showModal, setShowModal] = useState(true);
  const getNearByHospitals = async () => {
    try {
      const response = await request(() => getNearbyHospitalsRequest(user.token));
      if (response.status === 200) {
        setCenter({ lat: response.data.response.lat, lng: response.data.response.lon });
        setResponse(response.data.response);
      } else {
        notifications.show({
          color: 'red',
          title: 'Error while fetching data',
          message: response.data.message
        });
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error while fetching data',
        message: error.response.data
          && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  useEffect(() => {
    getNearByHospitals();
  }, []);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
  }

  async function calculateRoute(i) {
    clearRoute();
    setSelect(i);
    const chosenHospital = res.nearby[i];
    const origin = `${res.lat},${res.lon}`;
    const destination = `${chosenHospital.lat},${chosenHospital.lon}`;
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  if (!isLoaded) {
    return <Loader />;
  }
  if (!res.nearby) return <Text> </Text>;
  return (
    <>
      <Modal
        opened={showModal}
        centered
        onClose={() => setShowModal(false)}
        title="Reason For Transferring"
      >
        <Stack spacing="xs">
          <Switch
            label="Specialist Needed"
          />
          <Switch
            label="Cesaerian Section Needed"
          />
          <Button onClick={() => setShowModal(false)}>
            Set
          </Button>
        </Stack>
      </Modal>
      <Flex style={{ overflow: 'hidden' }} width="100%" height="90vh" direction="column">
        <Flex
          width="100%"
          height="100%"
          sx={{
            flexDirection: 'row',
            '@media (max-width: 900px)': {
              flexDirection: 'column',
              overflow: 'hidden'
            }
          }}
        >
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
            onLoad={(mp) => setMap(mp)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
          <Flex
            justify="flex-start"
            flex={1}
            width="100%"
            sx={{
              padding: '0 1rem',
              flexDirection: 'column'
            }}
          >
            <Card
              sx={{
                margin: '0 0 1rem 0',
                width: '20rem',
                '@media (max-width: 900px)': {
                  margin: '1rem 0rem',
                  width: '100%'
                }
              }}
              radius="md"
              withBorder
            >

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{res.name}</Text>
                <Badge color="pink" variant="light">
                  {res.tier === 1 ? 'PHC' : 'UHC'}
                </Badge>
              </Group>

              <Text size="sm" color="dimmed" mt="md" mb="xs">
                {`Accomadation Capacity: ${res.capacity}`}
              </Text>

              <Button
                onClick={() => {
                  notifications.show({
                    title: 'Success',
                    color: 'teal',
                    message: 'Patient Transfer Successfull'
                  });
                }}
                type="submit"
                disabled={select === -1}
                fullWidth
                mt="md"
                radius="md"
              >
                Transfer Patient
              </Button>

            </Card>
            <Card
              sx={{
                margin: '1rem 0 0 0',
                width: '20rem',
                '@media (max-width: 900px)': {
                  margin: '1rem 0rem',
                  width: '100%'
                }
              }}
              radius="md"
              withBorder
            >
              {select === -1 ? <Text color="dimmed">*Select A Hospital*</Text> : (
                <Group mt="md" mb="xs">
                  <Text weight={500}>Hospital:</Text>
                  <Text color="pink" variant="light">
                    { res.nearby[select].name}
                  </Text>
                </Group>
              )}
              <Group mt="md" mb="xs">
                <Text weight={500}>Distance:</Text>
                <Text color="pink" variant="light">
                  {distance}
                </Text>
              </Group>
              <Group mt="md" mb="xs">
                <Text weight={500}>Duration:</Text>
                <Text color="pink" variant="light">
                  {duration}
                </Text>
              </Group>
            </Card>
          </Flex>
        </Flex>
        <Center mt={40}>
          <Title order={3}>
            Nearby Hospitals
          </Title>
        </Center>
        <div className={classes.row}>
          {res.nearby.map((item, index) => (
            <Card className={classes.card} radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{item.name}</Text>
                <Badge color="pink" variant="light">
                  {item.tier === 1 ? 'PHC' : 'UHC'}
                </Badge>
              </Group>
              <Text size="sm" color="dimmed">
                {`Accomadation Capacity: ${item.capacity}`}
              </Text>
              <Button onClick={() => calculateRoute(index)} variant="light" color="blue" fullWidth mt="md" radius="md">
                Show On Map
              </Button>
            </Card>
          ))}
        </div>
      </Flex>
    </>
  );
}
