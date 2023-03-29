import React from 'react';
import {
  createStyles, Accordion, Grid, Col, Container, Title
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 20,
    paddingBottom: 20
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
  }
}));

const FAQ = [
  {
    question: 'What is E-Partogram?',
    answer: ' E-Partogram is a digital solution that provides healthcare providers with real-time monitoring, automated calculations, decision support, secure data management, and customizable settings for maternal and fetal monitoring during labor.',
    value: 'what'
  },
  {
    question: 'How does E-Partogram work?',
    answer: 'E-Partogram works by capturing maternal and fetal parameters such as cervical dilation, fetal heart rate, contractions, and more. The software then analyzes this data in real-time, providing alerts and prompts to healthcare providers based on predefined thresholds.',
    value: 'how'
  },
  {
    question: 'Who can use E-Partogram?',
    answer: 'E-Partogram can be used by healthcare providers, such as obstetricians, midwives, and nurses, who are involved in maternal and fetal monitoring during labor.',
    value: 'who'
  }

];

export function Faq() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets10.lottiefiles.com/packages/lf20_bd8pdzay.json"
            />

          </Col>
          <Col span={12} md={6}>
            <Title order={2} align="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="what" variant="separated">

              {FAQ.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                  <Accordion.Control>
                    {item.question}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {item.answer}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
