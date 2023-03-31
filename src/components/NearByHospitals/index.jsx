import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from '@react-google-maps/api';
import {
  Badge, Button, Card, Center, createStyles, Flex, Group, Loader, Text, Title
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
    overflowY: 'hidden'
  },
  card: {
    maxWidth: '20rem',
    padding: '.75rem',
    margin: '2rem 0.5rem',
    border: 0,
    flexBasis: '20rem',
    flexGrow: 0,
    flexShrink: 0
  }
}));
const center = { lat: 48.8584, lng: 2.2945 };

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
  const getNearByHospitals = async () => {
    try {
      const response = await request(() => getNearbyHospitalsRequest(user.token));
      if (response.status === 200) {
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
  if (!res.nearby) return <Text>Error Occured</Text>;
  return (
    <Flex style={{ overflow: 'hidden' }} width="100%" height="90vh" direction="column">
      <Flex
        width="100%"
        height="100%"
        sx={{
          flexDirection: 'row',
          '@media (max-width: 900px)': {
            flexDirection: 'column'
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
            flexDirection: 'column',
            '@media (max-width: 900px)': {
              flexDirection: 'row'
            }
          }}
        >
          <Card
            sx={{
              margin: '0 0 1rem 0',
              width: '20rem',
              '@media (max-width: 900px)': {
                margin: '1rem 0.5rem',
                width: '100%'
              }
            }}
            radius="md"
            withBorder
          >

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{res.name}</Text>
              <Badge color="pink" variant="light">
                {`Tier: ${res.tier}`}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed" mt="md" mb="xs">
              {`Accomadation Capacity: ${res.capacity}`}
            </Text>

          </Card>
          <Card
            sx={{
              margin: '1rem 0 0 0',
              width: '20rem',
              '@media (max-width: 900px)': {
                margin: '1rem 0.5rem',
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
                {`Tier: ${item.tier}`}
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
  );
}
