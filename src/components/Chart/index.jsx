import React, { useRef, useEffect, useState } from 'react';
import {
  Center,
  Container, Image, Flex, Title, useMantineTheme, Button
} from '@mantine/core';
import {
  drawBorder, drawCervix, drawDrugDrops, drawUrine,
  drawContractions, drawFetalHeartRate, drawHeader, drawLiquorMoulding, drawOxytocinDrops
} from './canvasApi';
import './loading.css';

export function CanvasChart() {
  const canvas = useRef(null);

  const [height, setHeight] = useState(1950);
  const [width, setWidth] = useState(1100);
  const [imageSrc, setImageSrc] = useState('');
  const theme = useMantineTheme();

  const draw = (ctx) => {
    if (!ctx) return;
    setHeight(5000);
    setWidth(1300);
    drawBorder(ctx, width, height, theme);
    drawHeader(ctx, width, {
      name: 'John Doe',
      age: 20,
      height: 160,
      parity: 0,
      alive: 0,
      edd: new Date().toLocaleDateString(),
      sb: 0,
      nnd: 0,
      abortion: 0,
      riskFactors: 'No risk factors',
      contractionStartTime: new Date().toLocaleTimeString(),
      membraneRuptureTime: new Date().toLocaleTimeString()
    });
    drawFetalHeartRate(ctx);
    drawLiquorMoulding(ctx);
    drawCervix(ctx);
    drawContractions(ctx);
    drawOxytocinDrops(ctx);
    drawDrugDrops(ctx);
    drawUrine(ctx);
    if (canvas.current) {
      setImageSrc(canvas.current.toDataURL('image/svg+xml'));
    }
  };

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      draw(ctx);
    }
  }, [canvas]);

  const downloadAsImage = () => {
    const link = document.createElement('a');
    link.download = 'patientID-Time.png';
    link.href = imageSrc;
    link.click();
  };

  return (
    <>
      <Center>
        <Title order={2}>Patient Partogram</Title>
      </Center>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ xs: 'end' }}
      >
        <Button onClick={downloadAsImage}>Download Partogram</Button>
      </Flex>
      <canvas
        ref={canvas}
        height={height}
        width={width}
        style={{
          display: 'none'
        }}
      />
      {imageSrc ? (
        <Container my={20}>
          <Image py={10} src={imageSrc} alt="Chiller Diagram" radius="xs" />
        </Container>
      ) : (
        <div className="loading">
          <div className="loading-1" />
          <div className="loading-2" />
          <div className="loading-3" />
          <div className="loading-4" />
        </div>
      )}
    </>
  );
}
