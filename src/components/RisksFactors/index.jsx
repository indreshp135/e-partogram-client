import React, { useEffect, useState } from 'react';
import {
  Tabs, Timeline, Text, List, ActionIcon, Paper
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IconCheck, IconEye, IconX, IconPlus
} from '@tabler/icons';
import { useLoading } from '../../hooks/useLoading';
import { getPatientRequest } from '../../utils/requests';
import { CanvasChart } from '../Chart';

export function RisksAndSuggestions() {
  const { request } = useLoading();
  const { id } = useParams();
  const [timeStampArray, setTimeStampArray] = useState([]);

  const getData = async () => {
    const response = await request(() => getPatientRequest(id));
    let timeStamps = response.data.patient.measurements.risks.map((risk) => risk.timeStamp);
    timeStamps = timeStamps.concat(
      response.data.patient.measurements.suggestions.map((suggestion) => suggestion.timeStamp)
    );
    timeStamps = [...new Set(timeStamps)];
    timeStamps = timeStamps.sort((a, b) => new Date(a) - new Date(b));
    setTimeStampArray(timeStamps.map((timeStamp) => ({
      timeStamp,
      risks: response.data.patient.measurements.risks.filter(
        (risk) => risk.timeStamp === timeStamp
      ).map((risk) => risk.risks)[0],
      suggestions: response.data.patient.measurements.suggestions.filter(
        (suggestion) => suggestion.timeStamp === timeStamp
      ).map((suggestion) => suggestion.suggestions)[0]
    })));
  };

  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Tabs defaultValue="partogram">
        <Tabs.List grow position="center">
          <Tabs.Tab value="partogram">Partogram</Tabs.Tab>
          <Tabs.Tab value="analysis">Analysis</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="partogram" py={20}>
          <CanvasChart />
        </Tabs.Panel>
        <Tabs.Panel value="analysis" py={20}>
          <Paper p="xl">
            <Timeline
              bulletSize={24}
              lineWidth={2}
            >
              {timeStampArray.map((timeStamp) => (
                <Timeline.Item
                  bullet={timeStamp.risks.length > 0 ? <IconX size={12} color="red" /> : timeStamp.suggestions.length > 0 ? <IconEye size={12} color="yellow" /> : <IconCheck size={12} color="green" />}
                  key={timeStamp.timeStamp}
                  title={(new Date(timeStamp.timeStamp).toLocaleString('en-IN')).toString()}
                >
                  {
                    timeStamp.risks.length > 0 ? (
                      <>
                        <Text color="red" size="md">Risks:</Text>
                        <List>
                          {timeStamp.risks.map((r) => (
                            <List.Item key={r}>
                              <Text size="md">
                                {r}
                              </Text>
                            </List.Item>
                          ))}
                        </List>
                      </>
                    ) : null
                  }
                  {
                    timeStamp.suggestions.length > 0 ? (
                      <>
                        <Text color="yellow" size="md">Suggestions:</Text>
                        <List>
                          {timeStamp.suggestions.map((r) => (
                            <List.Item key={r}>
                              <Text size="md">
                                {r}
                              </Text>
                            </List.Item>
                          ))}
                        </List>
                      </>
                    ) : null
                  }
                  {
                    timeStamp.risks.length === 0 && timeStamp.suggestions.length === 0 ? (
                      <Text size="md">Patient is normal</Text>
                    ) : null
                  }
                </Timeline.Item>
              ))}
            </Timeline>
          </Paper>
        </Tabs.Panel>
      </Tabs>
      <ActionIcon
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem'
        }}
        color="pink"
        variant="filled"
        radius="xl"
        size="xl"
        onClick={() => navigate(`/add-measurement/${id}`)}
      >
        <IconPlus size="2rem" />
      </ActionIcon>
    </>
  );
}
