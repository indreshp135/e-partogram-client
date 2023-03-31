import React from 'react';
import {
  Select, NumberInput, Switch, Textarea, Button, Stack, Container,
  Title, Center, SimpleGrid, Box
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';

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
    name: 'vomitus', label: 'Vomitus', component: Switch, description: 'Is Vomitus present?'
  }
];

export function CronForm() {
  const { id } = useParams();
  console.log(id);
  const form = useForm({
    initialValues: {
      foetalHeartRate: '',
      liquor: '',
      moulding: '',
      cervix: '',
      descent: '',
      contraction: '',
      pulse: '',
      systolic: '',
      diastolic: '',
      urine: {
        volume: '',
        albumin: false,
        acetone: false,
        glucose: false,
        vomitus: false
      },
      drugs: ''
    }
  });

  const handleSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <Container>
      <Center>
        <Title order={2}>Add Readings</Title>
      </Center>
      <Stack spacing="md" p={20}>
        <NumberInput
          label="Foetal Heart Rate"
          {...form.getInputProps('foetalHeartRate')}
          placeholder="Enter foetal heart rate"
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

        <NumberInput
          label="Contraction"
          {...form.getInputProps('contraction')}
          placeholder="Enter contraction"
        />

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

        <Textarea
          label="Drugs"
          {...form.getInputProps('drugs')}
          placeholder="Enter drugs"
        />

      </Stack>
      <Center>
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Center>
    </Container>
  );
}
