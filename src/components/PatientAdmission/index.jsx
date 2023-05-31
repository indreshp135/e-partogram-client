import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { DateTimePicker, DatePickerInput } from '@mantine/dates';
import {
  NumberInput,
  Group,
  Button,
  Title,
  Stack,
  Container,
  useMantineTheme,
  TextInput,
  Stepper,
  Box,
  createStyles,
  Select,
  Textarea
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { addPatientRequest, listOnDutyStaffRequest } from '../../utils/requests';

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

export function PatientData() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const initialValues = {
    name: '',
    age: 18,
    height: 160,

    parity: 0,
    alive: 0,
    edd: new Date(),
    sb: 0,
    nnd: 0,

    riskFactors: '',
    contractionStartTime: new Date(),

    doctor: '',
    nurse: ''
  };

  const [active, setActive] = useState(0);

  const [staffs, setStaffs] = useState({
    doctors: [],
    nurses: []
  });

  const { request } = useLoading();

  const getStaffs = async () => {
    const response = await request(listOnDutyStaffRequest);
    if (response.status === 200) {
      setStaffs({
        doctors: response.data.response.filter((staff) => staff.role === 'Doctor').map((staff) => ({
          label: staff.name,
          value: staff.uid
        })),
        nurses: response.data.response.filter((staff) => staff.role === 'Nurse').map((staff) => ({
          label: staff.name,
          value: staff.uid
        }))
      });
    }
  };

  useEffect(() => {
    getStaffs();
  }, []);

  const form = useForm({
    initialValues,
    validateInputOnBlur: true,
    validate: {
      name: (value) => value.length < 3 && 'Name must be at least 3 characters',
      age: (value) => value < 18 && 'Age must be at least 18',
      height: (value) => value < 100 && 'Height must be at least 100'
    }
  });

  const handleSubmit = async () => {
    const response = await request(() => addPatientRequest(form.values));
    if (response.status === 201) {
      notifications.show({
        title: 'Success',
        message: response.data.message,
        color: 'teal'
      });
      setActive(active + 1);
    }
  };

  return (
    <Container size="xl">
      <Stack>
        <Title order={3}>Add New Patient</Title>

        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="xs"
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
          <Stepper.Step label="Step 1" description="Add patient details">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
              >
                <TextInput
                  label="Name"
                  withAsterisk
                  {...form.getInputProps('name')}
                  placeholder="Enter name"
                />
                <NumberInput
                  label="Age"
                  withAsterisk
                  {...form.getInputProps('age')}
                  placeholder="Enter age"
                />
                <NumberInput
                  label="Height"
                  withAsterisk
                  {...form.getInputProps('height')}
                  placeholder="Enter height"
                />
              </Stack>
            </Box>
          </Stepper.Step>
          <Stepper.Step label="Step 2" description="Medical History">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
              >
                <NumberInput
                  label="Parity"
                  withAsterisk
                  {...form.getInputProps('parity')}
                />
                <NumberInput
                  label="Alive Children"
                  withAsterisk
                  {...form.getInputProps('alive')}
                />
                <NumberInput
                  label="Still Births"
                  withAsterisk
                  {...form.getInputProps('sb')}
                />
                <NumberInput
                  label="Neonatal Deaths"
                  withAsterisk
                  {...form.getInputProps('nnd')}
                />
                <DatePickerInput
                  popoverProps={{ withinPortal: true }}
                  label="Expected Date of Delivery"
                  placeholder="When is the expected date of delivery?"
                  classNames={classes}
                  clearable={false}
                  {...form.getInputProps('edd')}
                />
              </Stack>
            </Box>
          </Stepper.Step>
          <Stepper.Step label="Step 3" description="Recent History">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
              >
                <Textarea
                  label="Risk Factors"
                  {...form.getInputProps('riskFactors')}
                  placeholder="Enter risk factors"
                />
                <DateTimePicker
                  popoverProps={{ withinPortal: true }}
                  label="Contraction Start Time"
                  placeholder="When did the contractions start?"
                  classNames={classes}
                  clearable={false}
                  {...form.getInputProps('contractionStartTime')}
                />

                <DateTimePicker
                  popoverProps={{ withinPortal: true }}
                  label="Membrane Rupture Time"
                  placeholder="When did the membrane rupture?"
                  classNames={classes}
                  clearable={false}
                  {...form.getInputProps('membraneRuptureTime')}
                />

              </Stack>
            </Box>
          </Stepper.Step>
          <Stepper.Step label="Step 4" description="Hospital Details">
            <Box className={classes.box}>
              <Stack
                spacing="md"
                justify="center"
                align="stretch"
              >

                <Select
                  label="Select Doctor"
                  withAsterisk
                  data={staffs.doctors}
                  {...form.getInputProps(
                    'doctor'
                  )}
                />
                <Select
                  label="Select Nurse"
                  withAsterisk
                  data={staffs.nurses}
                  {...form.getInputProps(
                    'nurse'
                  )}
                />
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
            disabled={active === 4}
            onClick={() => {
              if (active < 3) {
                form.validate();
                if (form.isValid()) {
                  setActive(active + 1);
                }
              } else {
                handleSubmit();
              }
            }}
          >
            {active >= 3 ? 'Submit' : 'Next'}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
