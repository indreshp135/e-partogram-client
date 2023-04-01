import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  NumberInput,
  Group,
  Button,
  Title,
  Stack,
  Container,
  useMantineTheme,
  Switch,
  Stepper,
  Box,
  createStyles,
  Select,
  ScrollArea,
  Textarea,
  Center,
  SimpleGrid
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import { addMeasurementRequest } from '../../utils/requests';

const liquorOptions = [
  { value: 'I', label: 'I' },
  { value: 'C', label: 'C' },
  { value: 'M1', label: 'M1' },
  { value: 'M2', label: 'M2' },
  { value: 'M3', label: 'M3' }
];

const mouldingOptions = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
];

const urineFields = [
  {
    name: 'albumin', label: 'Albumin', component: Switch, description: 'Is Albumin present?'
  },
  {
    name: 'acetone', label: 'Acetone', component: Switch, description: 'Is Acetone present?'
  },
  {
    name: 'glucose', label: 'Glucose', component: Switch, description: 'Is Glucose present?'
  },
  {
    name: 'voimitus', label: 'Voimitus', component: Switch, description: 'Is Voimitus present?'
  }
];

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    cursor: 'pointer'
  }
}));

export function CronForm() {
  const { id } = useParams();
  const initialValues = {
    foetalHeartRate: '',
    liquor: '',
    moulding: '',
    cervix: '',
    descent: '',
    contraction: '',
    pulse: '',
    systolic: '',
    diastolic: '',
    temperature: '',
    urine: {
      volume: '',
      albumin: false,
      acetone: false,
      glucose: false,
      voimitus: false
    },
    drugs: ''
  };
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [active, setActive] = useState(0);

  const { request } = useLoading();

  const form = useForm({
    initialValues
  });

  const handleSubmit = async () => {
    const response = await request(() => addMeasurementRequest(id, form.values));
    if (response.status === 201) {
      notifications.show({
        title: 'Success',
        message: response.data.message,
        color: 'teal'
      });
    }
  };

  return (
    <Container size="xl">
      <Stack>
        <Group position="center" my="md">
          <Title order={1}>Add Readings</Title>
        </Group>

        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="xs"
          allowNextStepsSelect={false}
          styles={{
            separator: {
              backgroundColor: theme.colorScheme === 'dark' ? 'white' : 'black'
            }
          }}
        >
          <Stepper.Step description="30 Minutes" label="Vitals">
            <ScrollArea style={{ height: 350 }}>
              <Box className={classes.box}>
                <Stack
                  spacing="md"
                  justify="center"
                  align="stretch"
                  sx={{
                    height: 300,
                    padding: '0 20px'
                  }}
                >
                  <NumberInput
                    label="Foetal Heart Rate"
                    {...form.getInputProps('foetalHeartRate')}
                    placeholder="Enter foetal heart rate"
                  />
                  <NumberInput
                    label="Contraction"
                    {...form.getInputProps('contraction')}
                    placeholder="Enter contraction"
                  />
                  <NumberInput
                    label="Temperature"
                    {...form.getInputProps('temperature')}
                    placeholder="Enter temperature"
                  />

                </Stack>
              </Box>
            </ScrollArea>
          </Stepper.Step>
          <Stepper.Step description="30 Minutes" label="Pulses">
            <ScrollArea style={{ height: 350 }}>
              <Box className={classes.box}>
                <Stack
                  spacing="md"
                  justify="center"
                  align="stretch"
                  sx={{
                    height: 300,
                    padding: '0 20px'
                  }}
                >

                  <NumberInput
                    label="Pulse"
                    {...form.getInputProps('pulse')}
                    placeholder="Enter pulse"
                  />

                  <NumberInput
                    label="Systolic"
                    {...form.getInputProps('systolic')}
                    placeholder="Enter systolic"
                  />

                  <NumberInput
                    label="Diastolic"
                    {...form.getInputProps('diastolic')}
                    placeholder="Enter diastolic"
                  />
                </Stack>
              </Box>
            </ScrollArea>
          </Stepper.Step>

          <Stepper.Step description="1 Hr" label="Semi-Vitals">
            <ScrollArea style={{ height: 350 }}>
              <Box className={classes.box}>
                <Stack
                  spacing="md"
                  justify="center"
                  align="stretch"
                  sx={{
                    minHeight: 300,
                    padding: '0 20px'
                  }}
                >
                  <Textarea
                    label="Drugs"
                    {...form.getInputProps('drugs')}
                    placeholder="Enter drugs"
                  />
                  <Select
                    label="Liquor"
                    {...form.getInputProps('liquor')}
                    data={liquorOptions}
                    placeholder="Select liquor"
                  />

                  <Select
                    label="Moulding"
                    {...form.getInputProps('moulding')}
                    data={mouldingOptions}
                    placeholder="Select moulding"
                  />
                </Stack>
              </Box>
            </ScrollArea>
          </Stepper.Step>
          <Stepper.Step description="4 Hrs" label="Readings">
            <ScrollArea style={{ height: 350 }}>
              <Box className={classes.box}>
                <Stack
                  spacing="md"
                  justify="center"
                  align="stretch"
                  sx={{
                    minHeight: 300,
                    padding: '0 20px'
                  }}
                >
                  <NumberInput
                    label="Cervix"
                    {...form.getInputProps('cervix')}
                    placeholder="Enter cervix"
                  />

                  <NumberInput
                    label="Descent"
                    {...form.getInputProps('descent')}
                    placeholder="Enter descent"
                  />
                </Stack>
              </Box>
            </ScrollArea>
          </Stepper.Step>
          <Stepper.Step description="1 or 4 Hrs" label="Urine">
            <ScrollArea style={{ height: 350 }}>
              <Box className={classes.box}>
                <Stack
                  spacing="md"
                  justify="center"
                  align="stretch"
                  sx={{
                    minHeight: 300,
                    padding: '0 20px'
                  }}
                >

                  <Stack spacing="md">
                    <Title order={3}>Urine</Title>
                    <Box
                      shadow="sm"
                      p={20}
                      sx={{
                        borderRadius: 20,
                        border: '1px solid'

                      }}
                    >
                      <NumberInput
                        label="Volume"
                        {...form.getInputProps('urine.volume')}
                        placeholder="Enter volume"
                      />
                      <Center p={20}>
                        <SimpleGrid
                          cols={2}
                          spacing="xl"
                          verticalSpacing="xl"
                          breakpoints={[
                            { maxWidth: 600, cols: 1 },
                            { maxWidth: 1000, cols: 2 }
                          ]}
                        >
                          {urineFields.map((field) => (
                            <field.component
                              key={field.name}
                              label={field.label}
                              {...form.getInputProps(`urine.${field.name}`)}
                              placeholder={`Enter ${field.name}`}
                              onLabel="+ve"
                              offLabel="-ve"
                              size="lg"
                              labelPosition="left"
                              description={field.description}
                            />
                          ))}
                        </SimpleGrid>
                      </Center>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </ScrollArea>
          </Stepper.Step>
        </Stepper>

        <Group position="center" my="md">
          <Button
            color="blue"
            my={10}
            w={100}
            disabled={active === 0}
            onClick={() => {
              if (active > 0) {
                setActive(active - 1);
              }
            }}
          >
            Previous
          </Button>

          <Button
            my={10}
            w={100}
            disabled={active === 5}
            onClick={() => {
              if (active < 4) {
                setActive(active + 1);
              } else {
                handleSubmit();
              }
            }}
          >
            {active >= 4 ? 'Submit' : 'Next'}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
