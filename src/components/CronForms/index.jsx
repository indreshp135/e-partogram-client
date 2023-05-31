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
  Textarea,
  Center,
  SimpleGrid,
  Kbd
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
    padding: theme.spacing.md,
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
    contraction: {
      contraction_rate: '',
      contraction_duration: ''
    },
    pulse: '',
    systolic: '',
    diastolic: '',
    temperature: '',
    oxytocin: {
      dose: '',
      drops: ''
    },
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
    initialValues,
    validate: (values) => {
      const errors = {};
      if (active === 0) {
        if (values.foetalHeartRate === '') {
          errors.foetalHeartRate = 'Please enter foetal heart rate';
        }
        if (values.contraction.contraction_rate === '') {
          errors.contraction = {
            contraction_rate: 'Please enter contraction rate'
          };
        }
        if (values.contraction.contraction_duration === '') {
          errors.contraction = {
            contraction_duration: 'Please enter contraction duration'
          };
        }
        if (values.temperature === '') {
          errors.temperature = 'Please enter temperature';
        }
      } else if (active === 1) {
        if (values.pulse === '') {
          errors.pulse = 'Please enter pulse';
        }
        if (values.systolic === '') {
          errors.systolic = 'Please enter systolic';
        }
        if (values.diastolic === '') {
          errors.diastolic = 'Please enter diastolic';
        }
      } else if (active === 2) {
        if (values.oxytocin.dose === '') {
          errors.oxytocin = {
            dose: 'Please enter oxytocin dose'
          };
        }
        if (values.oxytocin.drops === '') {
          errors.oxytocin = {
            drops: 'Please enter oxytocin drops'
          };
        }
      } else if (active === 3) {
        if (values.urine.volume === '') {
          errors.urine = {
            volume: 'Please enter urine volume'
          };
        }
      }
      return errors;
    }
  });

  const handleSubmit = async () => {
    const response = await request(() => addMeasurementRequest(id, form.values));
    if (response.status === 201) {
      notifications.show({
        title: 'Success',
        message: response.data.message,
        color: 'teal'
      });
      if (response.data.risks.length > 0) {
        notifications.show({
          title: 'Warning Risks Found',
          message: 'Please check the risks tab for more details',
          color: 'red'
        });
      }
    }
  };

  return (
    <Container size="xl">
      <Stack>
        <Title order={3} mt={20}>Add Readings</Title>

        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="xl"
          allowNextStepsSelect={false}
          styles={{
            separator: {
              backgroundColor: theme.colorScheme === 'dark' ? 'white' : 'black'
            },
            stepIcon: {
              borderColor: theme.colorScheme === 'dark' ? 'white' : 'black'
            },
            steps: {
              paddingBlock: '20px'
            }
          }}
        >
          <Stepper.Step description="30 Minutes" label="Vitals">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
              >
                <NumberInput
                  label="Foetal Heart Rate"
                  {...form.getInputProps('foetalHeartRate')}
                  placeholder="Enter foetal heart rate"
                />
                <NumberInput
                  label="Contraction Rate"
                  {...form.getInputProps('contraction.contraction_rate')}
                  placeholder="Enter contraction rate"
                />
                <NumberInput
                  label="Contraction Duration"
                  {...form.getInputProps('contraction.contraction_duration')}
                  placeholder="Enter contraction duration"
                />
                <NumberInput
                  label="Temperature"
                  {...form.getInputProps('temperature')}
                  placeholder="Enter temperature"
                  rightSectionWidth={40}
                  rightSection={<Kbd>°C</Kbd>}
                />

              </Stack>
            </Box>
          </Stepper.Step>
          <Stepper.Step description="30 Minutes" label="Pulse rate and Oxytocin">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
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
          </Stepper.Step>

          <Stepper.Step description="1 Hr" label="Semi-Vitals">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
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
          </Stepper.Step>
          <Stepper.Step description="4 Hrs" label="Readings">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
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
          </Stepper.Step>
          <Stepper.Step description="1 or 4 Hrs" label="Urine">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
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
                          { maxWidth: 500, cols: 1 },
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
                  <Title order={3}>Oxytocin</Title>
                  <Box
                    shadow="sm"
                    p={20}
                    sx={{
                      borderRadius: 20,
                      border: '1px solid'

                    }}
                  >
                    <Stack
                      spacing="md"
                      justify="center"
                      align="stretch"
                    >
                      <NumberInput
                        label="Dose"
                        {...form.getInputProps('oxytocin.dose')}
                        placeholder="Enter dose"
                      />
                      <NumberInput
                        label="Drops"
                        {...form.getInputProps('oxytocin.drops')}
                        placeholder="Enter drops"
                      />

                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stepper.Step>
        </Stepper>

        <Group
          position="center"
          my="md"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Button
            color="blue"
            style={{ flex: 1 }}
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
            style={{ flex: 1 }}
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
