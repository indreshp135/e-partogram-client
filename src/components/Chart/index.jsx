import React, { useRef, useEffect, useState } from 'react';
import {
  Center,
  Container, Image, Flex, Title, useMantineTheme, Button
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import {
  drawBorder, drawCervix, drawDrugDrops, drawUrine,
  drawContractions, drawFetalHeartRate, drawHeader, drawLiquorMoulding, drawOxytocinDrops
} from './canvasApi';
import './loading.css';
import { getPatientRequest } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';

export function CanvasChart() {
  const { id } = useParams();

  const canvas = useRef(null);

  const [height, setHeight] = useState(1950);
  const [width, setWidth] = useState(1100);
  const [imageSrc, setImageSrc] = useState('');
  const theme = useMantineTheme();

  const draw = (ctx, data) => {
    if (!ctx) return;
    setHeight(5000);
    setWidth(1300);
    drawBorder(ctx, width, height, theme);
    console.log(data);
    drawHeader(ctx, width, {
      name: data.name,
      age: data.age,
      height: data.height,
      parity: data.parity,
      alive: data.alive,
      edd: data.edd,
      sb: data.sb,
      nnd: data.nnd,
      abortion: data.abortion,
      riskFactors: data.riskFactors,
      contractionStartTime: data.contractionStartTime,
      membraneRuptureTime: data.membraneRuptureTime
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

  const { request } = useLoading();

  const getData = async () => {
    const response = await request(() => getPatientRequest(id));
    console.log(response.data);
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      draw(ctx, response.data.patient);
    }
  };

  useEffect(() => {
    getData();
  }, [canvas]);

  const downloadAsImage = () => {
    const link = document.createElement('a');
    link.download = 'Time.png';
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
