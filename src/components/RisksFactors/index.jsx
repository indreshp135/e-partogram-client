import React, { useEffect, useState } from 'react';
import {
  Container, Tabs, Timeline, Text
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import { getPatientRequest } from '../../utils/requests';

export function RisksAndSuggestions() {
  const { request } = useLoading();
  const { id } = useParams();
  const [risks, setRisks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const getData = async () => {
    const response = await request(() => getPatientRequest(id));
    setRisks(response.data.patient.measurements.risks);
    setSuggestions(response.data.patient.measurements.suggestions);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Tabs defaultValue="first">
        <Tabs.List grow position="center">
          <Tabs.Tab value="first">Risks</Tabs.Tab>
          <Tabs.Tab value="second">Suggestions</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first" py={20}>
          <Timeline
            active={1}
            bulletSize={24}
            lineWidth={2}
          >
            {risks.map((risk) => (
              <Timeline.Item
                key={risk.timeStamp}
                title={(new Date(risk.timeStamp).toLocaleString('en-IN')).toString()}
              >
                {
                  risk.risks.length === 0 ? <Text color="dimmed" size="md">No risks</Text>
                    : risk.risks.map((r) => (
                      <Text color="red" size="md" key={r}>{r}</Text>
                    ))
                }
              </Timeline.Item>
            ))}
          </Timeline>
        </Tabs.Panel>
        <Tabs.Panel value="second" py={20}>
          <Timeline active={1} bulletSize={24} lineWidth={2}>
            {suggestions.map((risk) => (
              <Timeline.Item
                key={risk.timeStamp}
                title={(new Date(risk.timeStamp).toLocaleString()).toString()}
              >
                {
                  risk.suggestions.length === 0 ? <Text color="dimmed" size="md">No suggestions</Text>
                    : risk.suggestions.map((r) => (
                      <Text color="yellow" size="md" key={r}>{r}</Text>
                    ))
                }
              </Timeline.Item>
            ))}
          </Timeline>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
