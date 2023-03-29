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
  ScrollArea,
  Textarea
} from '@mantine/core';

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
    membraneRuptureTime: new Date(),

    doctor: '',
    nurse: ''
  };

  const [active, setActive] = useState(0);

  const [staffs, setStaffs] = useState({
    doctors: [],
    nurses: []
  });

  useEffect(() => {
    setStaffs({
      doctors: [
        'Dr. A',
        'Dr. B'
      ],
      nurses: [
        'Nurse A',
        'Nurse B'
      ]
    });
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

  const handleSubmit = () => {
    console.log(form.values);
  };

  return (
    <Container size="xl">
      <Stack>
        <Group position="center" my="md">
          <Title order={1}>Add New Patient</Title>
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
          <Stepper.Step label="Step 1" description="Add patient details">
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
            </ScrollArea>
          </Stepper.Step>
          <Stepper.Step label="Step 2" description="Medical History">
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
                    mt="md"
                    popoverProps={{ withinPortal: true }}
                    label="Expected Date of Delivery"
                    placeholder="When is the expected date of delivery?"
                    classNames={classes}
                    clearable={false}
                    {...form.getInputProps('edd')}
                  />
                </Stack>
              </Box>
            </ScrollArea>
          </Stepper.Step>
          <Stepper.Step label="Step 3" description="Recent History">
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
                    label="Risk Factors"
                    withAsterisk
                    {...form.getInputProps('riskFactors')}
                    placeholder="Enter risk factors"
                  />
                  <DateTimePicker
                    mt="md"
                    popoverProps={{ withinPortal: true }}
                    label="Contraction Start Time"
                    placeholder="When did the contractions start?"
                    classNames={classes}
                    clearable={false}
                    {...form.getInputProps('contractionStartTime')}
                  />

                  <DateTimePicker
                    mt="md"
                    popoverProps={{ withinPortal: true }}
                    label="Membrane Rupture Time"
                    placeholder="When did the membrane rupture?"
                    classNames={classes}
                    clearable={false}
                    {...form.getInputProps('membraneRuptureTime')}
                  />

                </Stack>
              </Box>
            </ScrollArea>
          </Stepper.Step>
          <Stepper.Step label="Step 4" description="Hospital Details">
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

                  <Select
                    label="Select Doctor"
                    withAsterisk
                    data={staffs.nurses}
                    {...form.getInputProps(
                      'doctor'
                    )}
                  />
                  <Select
                    label="Select Nurse"
                    withAsterisk
                    data={staffs.doctors}
                    {...form.getInputProps(
                      'nurse'
                    )}
                  />
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

        {/* {chillerFields.length === 0 && (
          <Text color="dimmed" align="center">
            No chiller data...
          </Text>
        )} */}

        {/* <Container>
          <Text size="sm" weight={350} mt="md">
            Form values:
          </Text>
          <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        </Container> */}
      </Stack>
    </Container>
  );
}
