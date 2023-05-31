const GRAPH_START_X = 260;
const FETAL_HEART_RATE_GRAPH_START_Y = 100 + 40;
const LIQOUR_MOULDING_GRAPH_START_Y = FETAL_HEART_RATE_GRAPH_START_Y + 20 * 12 + 40;
const CERVIX_GRAPH_START_Y = LIQOUR_MOULDING_GRAPH_START_Y + 20 * 3 + 20;
const CONTRACTIONS_GRAPH_START_Y = CERVIX_GRAPH_START_Y + 40 * 10 + 20;
const OXYTOCIN_GRAPH_START_Y = CONTRACTIONS_GRAPH_START_Y + 40 * 7 + 20;
const DRUG_GRAPH_START_Y = OXYTOCIN_GRAPH_START_Y + 20 * 2 + 20;
const URINE_GRAPH_START_Y = DRUG_GRAPH_START_Y + 160 + 12 * 20 + 20;

const drawXMark = (ctx, x, y) => {
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 5);
  ctx.lineTo(x + 5, y + 5);
  ctx.stroke();
  ctx.moveTo(x + 5, y - 5);
  ctx.lineTo(x - 5, y + 5);
  ctx.stroke();
};

const drawOMark = (ctx, x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.stroke();
};

const drawCap = (ctx, x, y) => {
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 5);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.moveTo(x + 5, y - 5);
  ctx.lineTo(x, y);
  ctx.stroke();
};

const drawV = (ctx, x, y) => {
  ctx.beginPath();
  ctx.moveTo(x - 5, y + 5);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.moveTo(x + 5, y + 5);
  ctx.lineTo(x, y);
  ctx.stroke();
};

const drawDot = (ctx, x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, 2, 2, 2 * Math.PI);
  ctx.fill();
};

export const drawBorder = (ctx, width, height, theme) => {
  if (ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.strokeStyle = theme === 'dark' ? 'white' : 'black';
    ctx.stroke();
    ctx.fillStyle = theme === 'dark' ? 'black' : 'white';
    ctx.fill();
    ctx.fillStyle = theme === 'dark' ? 'white' : 'black';
  }
};

export const drawDotsInSquare = (ctx, x, y, width, height) => {
  if (ctx) {
    for (let i = 1; i <= 3; i += 1) {
      for (let j = 1; j <= 3; j += 1) {
        drawDot(ctx, x + (width / 4) * i, y + (height / 4) * j);
      }
    }
  }
};

export const drawTwoParallelLines = (ctx, x, y) => {
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x, y + 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 30, y);
    ctx.lineTo(x, y + 30);
    ctx.stroke();
  }
};

export const drawFillRect = (ctx, x, y, width, height) => {
  if (ctx) {
    ctx.fillRect(x, y, width, height);
  }
};

export const drawHeader = (ctx, width, {
  name,
  age,
  height,
  parity,
  alive,
  sb,
  nnd,
  edd,
  abortion,
  contractionStartTime,
  membraneRuptureTime
}) => {
  if (ctx) {
    ctx.font = '14px Arial';

    const row1XStart = 50;
    const row1YStart = 50;

    const row2XStart = 50;
    const row2YStart = 70;

    const row3XStart = 50;
    const row3YStart = 90;

    const gapForColumns3 = width / 3;
    const gapForColumns5 = width / 5;

    ctx.fillText(`Name: ${name}`, row1XStart, row1YStart);
    ctx.fillText(`Age: ${age}`, row1XStart + gapForColumns3, row1YStart);
    ctx.fillText(`Height: ${height}`, row1XStart + gapForColumns3 * 2, row1YStart);

    ctx.fillText(`Parity: ${parity}`, row2XStart, row2YStart);
    ctx.fillText(`Alive: ${alive}`, row2XStart + gapForColumns5, row2YStart);
    ctx.fillText(`SB: ${sb}`, row2XStart + gapForColumns5 * 2, row2YStart);
    ctx.fillText(`NND: ${nnd}`, row2XStart + gapForColumns5 * 3, row2YStart);
    console.log(abortion);

    ctx.fillText(`EDD: ${(new Date(edd)).toLocaleString('en-IN')}`, row3XStart, row3YStart);
    ctx.fillText(`Contraction Start: ${(new Date(contractionStartTime)).toLocaleString('en-IN')}`, row3XStart + gapForColumns3, row3YStart);

    if (membraneRuptureTime) { ctx.fillText(`Membrane Rupture Start: ${(new Date(contractionStartTime)).toLocaleString('en-IN')}`, row3XStart + 2 * gapForColumns3, row3YStart); }

    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(width - 50, 100);
    ctx.stroke();
  }
};

export const drawFetalHeartRate = (ctx, dataPointsMock) => {
  ctx.font = '25px Arial';
  ctx.textAlign = 'end';
  ctx.fillText('Fetal', GRAPH_START_X - 50, FETAL_HEART_RATE_GRAPH_START_Y + 20 * 4);
  ctx.fillText('Heart', GRAPH_START_X - 50, FETAL_HEART_RATE_GRAPH_START_Y + 20 * 6);
  ctx.fillText('Rate', GRAPH_START_X - 50, FETAL_HEART_RATE_GRAPH_START_Y + 20 * 8);
  ctx.font = '15px Arial';
  ctx.textAlign = 'start';

  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 24; i += 0.5) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, FETAL_HEART_RATE_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, FETAL_HEART_RATE_GRAPH_START_Y + 240);
    ctx.stroke();
    if ((i * 2) % 2 === 0) {
      ctx.fillText(i, GRAPH_START_X + i * 30 - 5, FETAL_HEART_RATE_GRAPH_START_Y - 10);
    }
  }

  ctx.textBaseline = 'bottom';

  for (let i = 0; i < 13; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, FETAL_HEART_RATE_GRAPH_START_Y + i * 20);
    ctx.lineTo(GRAPH_START_X + 720, FETAL_HEART_RATE_GRAPH_START_Y + i * 20);
    ctx.stroke();
    ctx.fillText(200 - (i * 10), GRAPH_START_X - 30, FETAL_HEART_RATE_GRAPH_START_Y + i * 20 + 5);
  }

  for (let i = 0; i < dataPointsMock.length; i += 1) {
    drawXMark(
      ctx,
      GRAPH_START_X + dataPointsMock[i].timeStamp * 30,
      FETAL_HEART_RATE_GRAPH_START_Y + (200 - dataPointsMock[i].value) * 2
    );

    if (i < dataPointsMock.length - 1) {
      ctx.beginPath();
      ctx.moveTo(
        GRAPH_START_X + dataPointsMock[i].timeStamp * 30,
        FETAL_HEART_RATE_GRAPH_START_Y + (200 - dataPointsMock[i].value) * 2
      );
      ctx.lineTo(
        GRAPH_START_X + dataPointsMock[i + 1].timeStamp * 30,
        FETAL_HEART_RATE_GRAPH_START_Y + (200 - dataPointsMock[i + 1].value) * 2
      );
      ctx.stroke();
    }
  }
};

export const drawLiquorMoulding = (ctx, dataPointsMock) => {
  ctx.font = '15px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'start';
  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, LIQOUR_MOULDING_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, LIQOUR_MOULDING_GRAPH_START_Y + 40);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, LIQOUR_MOULDING_GRAPH_START_Y + i * 20);
    ctx.lineTo(GRAPH_START_X + 720, LIQOUR_MOULDING_GRAPH_START_Y + i * 20);
    ctx.stroke();
    if (i === 0) {
      ctx.fillText('Liquor', GRAPH_START_X - 5, LIQOUR_MOULDING_GRAPH_START_Y + i * 20);
    } else if (i === 1) {
      ctx.fillText('Molding', GRAPH_START_X - 5, LIQOUR_MOULDING_GRAPH_START_Y + i * 20);
    }
  }

  for (let i = 0; i < dataPointsMock.liquor.length; i += 1) {
    ctx.textAlign = 'center';
    ctx.fillText(
      dataPointsMock.liquor[i].value,
      GRAPH_START_X + Math.round(dataPointsMock.liquor[i].timeStamp) * 30 - 15,
      LIQOUR_MOULDING_GRAPH_START_Y + 5
    );
    ctx.fillText(
      dataPointsMock.moulding[i].value,
      GRAPH_START_X + Math.round(dataPointsMock.moulding[i].timeStamp) * 30 - 15,
      LIQOUR_MOULDING_GRAPH_START_Y + 25
    );
  }
};

export const drawCervix = (ctx, dataPointsMock) => {
  ctx.font = '15px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'start';
  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, CERVIX_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, CERVIX_GRAPH_START_Y + 40 * 10);
    ctx.stroke();
  }

  ctx.lineWidth = 5;
  const ALERT_START_X = GRAPH_START_X + 8 * 30;
  const ALERT_START_Y = CERVIX_GRAPH_START_Y + 40 * 7;

  const ALERT_END_X = GRAPH_START_X + 15 * 30;
  const ALERT_END_Y = CERVIX_GRAPH_START_Y;

  ctx.beginPath();
  ctx.moveTo(ALERT_START_X, ALERT_START_Y);
  ctx.lineTo(ALERT_END_X, ALERT_END_Y);
  ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(GRAPH_START_X, ALERT_START_Y);
  // ctx.lineTo(ALERT_START_X, ALERT_START_Y);
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(ALERT_START_X, ALERT_START_Y);
  // ctx.lineTo(ALERT_START_X, ALERT_START_Y + 40 * 3);
  // ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(ALERT_START_X + 4 * 30, ALERT_START_Y);
  ctx.lineTo(ALERT_END_X + 4 * 30, ALERT_END_Y);
  ctx.stroke();

  ctx.lineWidth = 1;
  for (let i = 0; i < 25 / 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 60, CERVIX_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 60, CERVIX_GRAPH_START_Y + 40 * 10);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 10; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, CERVIX_GRAPH_START_Y + i * 40);
    ctx.lineTo(GRAPH_START_X + 720, CERVIX_GRAPH_START_Y + i * 40);
    ctx.stroke();
    ctx.fillText(10 - i, GRAPH_START_X - 5, CERVIX_GRAPH_START_Y + i * 40);
  }

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 150, CERVIX_GRAPH_START_Y);
  ctx.lineTo(GRAPH_START_X - 150, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 175, CERVIX_GRAPH_START_Y);
  ctx.lineTo(GRAPH_START_X - 125, CERVIX_GRAPH_START_Y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 175, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.lineTo(GRAPH_START_X - 125, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Cervix (cm)', GRAPH_START_X - 150, CERVIX_GRAPH_START_Y + 40 * 5 - 10);
  ctx.fillText('Plot X', GRAPH_START_X - 150, CERVIX_GRAPH_START_Y + 40 * 5 + 10);

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 5);
  ctx.lineTo(GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 75, CERVIX_GRAPH_START_Y + 40 * 5);
  ctx.lineTo(GRAPH_START_X - 25, CERVIX_GRAPH_START_Y + 40 * 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 75, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.lineTo(GRAPH_START_X - 25, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Descent (cm)', GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 7.5 - 10);
  ctx.fillText('Plot O', GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 7.5 + 10);

  for (let i = 0; i < dataPointsMock.cervix.length; i += 1) {
    if (dataPointsMock.cervix[i].value > 0 && dataPointsMock.cervix[i].value <= 10) {
      drawXMark(
        ctx,
        GRAPH_START_X + Math.round(dataPointsMock.cervix[i].timeStamp) * 30,
        CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.cervix[i].value)
      );

      if (i > 0
        && dataPointsMock.cervix[i - 1].value > 0 && dataPointsMock.cervix[i - 1].value <= 10) {
        ctx.beginPath();
        ctx.moveTo(
          GRAPH_START_X + Math.round(dataPointsMock.cervix[i - 1].timeStamp) * 30,
          CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.cervix[i - 1].value)
        );
        ctx.lineTo(
          GRAPH_START_X + Math.round(dataPointsMock.cervix[i].timeStamp) * 30,
          CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.cervix[i].value)
        );
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < dataPointsMock.descent.length; i += 1) {
    if (dataPointsMock.descent[i].value > 0
      && dataPointsMock.descent[i].value <= 10) {
      drawOMark(
        ctx,
        GRAPH_START_X + Math.round(dataPointsMock.descent[i].timeStamp) * 30,
        CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.descent[i].value)
      );

      if (i > 0
        && dataPointsMock.descent[i - 1].value > 0
        && dataPointsMock.descent[i - 1].value <= 10) {
        ctx.beginPath();
        ctx.moveTo(
          GRAPH_START_X + Math.round(dataPointsMock.descent[i - 1].timeStamp) * 30,
          CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.descent[i - 1].value)
        );
        ctx.lineTo(
          GRAPH_START_X + Math.round(dataPointsMock.descent[i].timeStamp) * 30,
          CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.descent[i].value)
        );
        ctx.stroke();
      }
    }
  }
};

export const drawContractions = (ctx, dataPointsMock) => {
  ctx.font = '25px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'end';
  ctx.fillText('Contractions', GRAPH_START_X - 50, CONTRACTIONS_GRAPH_START_Y + 20 * 6);
  ctx.fillText('per 10', GRAPH_START_X - 50, CONTRACTIONS_GRAPH_START_Y + 20 * 8);
  ctx.fillText('minutes', GRAPH_START_X - 50, CONTRACTIONS_GRAPH_START_Y + 20 * 10);
  ctx.textAlign = 'start';
  ctx.font = '15px Arial';
  for (let i = 0; i < 25 / 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 60, CONTRACTIONS_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 60, CONTRACTIONS_GRAPH_START_Y + 80);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i < 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, CONTRACTIONS_GRAPH_START_Y + i * 80);
    ctx.lineTo(GRAPH_START_X + 720, CONTRACTIONS_GRAPH_START_Y + i * 80);
    ctx.stroke();
  }
  ctx.fillText('Time', GRAPH_START_X - 5, CONTRACTIONS_GRAPH_START_Y + 40);

  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, CONTRACTIONS_GRAPH_START_Y + 80);
    ctx.lineTo(GRAPH_START_X + i * 30, CONTRACTIONS_GRAPH_START_Y + 80 + 40 * 5);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, CONTRACTIONS_GRAPH_START_Y + i * 40 + 80);
    ctx.lineTo(GRAPH_START_X + 720, CONTRACTIONS_GRAPH_START_Y + i * 40 + 80);
    ctx.stroke();
    if (5 - i > 0) {
      ctx.fillText(5 - i, GRAPH_START_X - 5, CONTRACTIONS_GRAPH_START_Y + i * 40 + 100);
    }
  }
  for (let i = 0; i < dataPointsMock.length; i += 1) {
    if (dataPointsMock[0].value.contraction_duration > 40) {
      drawFillRect(
        ctx,
        GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30,
        CONTRACTIONS_GRAPH_START_Y + 80 + 40 * (5 - dataPointsMock[0].value.contraction_rate),
        30,
        40
      );
    } else if (dataPointsMock[0].value.contraction_duration > 20) {
      drawTwoParallelLines(
        ctx,
        GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30,
        CONTRACTIONS_GRAPH_START_Y + 80 + 40 * (5 - dataPointsMock[0].value.contraction_rate),
        30,
        40
      );
    } else {
      drawDotsInSquare(
        ctx,
        GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30,
        CONTRACTIONS_GRAPH_START_Y + 80 + 40 * (5 - dataPointsMock[0].value.contraction_rate),
        30,
        40
      );
    }
  }
};

export const drawOxytocinDrops = (ctx, dataPointsMock) => {
  ctx.font = '15px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'start';
  for (let i = 0; i <= 24; i += 0.5) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, OXYTOCIN_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, OXYTOCIN_GRAPH_START_Y + 40);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, OXYTOCIN_GRAPH_START_Y + i * 20);
    ctx.lineTo(GRAPH_START_X + 720, OXYTOCIN_GRAPH_START_Y + i * 20);
    ctx.stroke();
    if (i === 0) {
      ctx.fillText('Oxytocin U/L', GRAPH_START_X - 5, OXYTOCIN_GRAPH_START_Y + i * 20);
    } else if (i === 1) {
      ctx.fillText('Drops/Min', GRAPH_START_X - 5, OXYTOCIN_GRAPH_START_Y + i * 20);
    }
  }
  for (let i = 0; i < dataPointsMock.length; i += 1) {
    ctx.fillText(
      dataPointsMock[i].value.dose,
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30,
      OXYTOCIN_GRAPH_START_Y
    );
    ctx.fillText(
      dataPointsMock[i].value.drops,
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30,
      OXYTOCIN_GRAPH_START_Y + 20
    );
  }
};

export const drawDrugDrops = (ctx, dataPointsMock) => {
  ctx.font = '25px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'end';
  ctx.fillText('Pulse', GRAPH_START_X - 100, DRUG_GRAPH_START_Y + 20 * 12);
  ctx.fillText('and', GRAPH_START_X - 100, DRUG_GRAPH_START_Y + 20 * 14);
  ctx.fillText('BP', GRAPH_START_X - 100, DRUG_GRAPH_START_Y + 20 * 16);
  ctx.textAlign = 'start';
  ctx.font = '15px Arial';
  for (let i = 0; i < 25 / 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 60, DRUG_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 60, DRUG_GRAPH_START_Y + 160);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i < 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, DRUG_GRAPH_START_Y + i * 160);
    ctx.lineTo(GRAPH_START_X + 720, DRUG_GRAPH_START_Y + i * 160);
    ctx.stroke();
  }
  ctx.fillText('Drugs', GRAPH_START_X - 5, DRUG_GRAPH_START_Y + 40);
  ctx.fillText('Given', GRAPH_START_X - 5, DRUG_GRAPH_START_Y + 60);
  ctx.fillText('and IV', GRAPH_START_X - 5, DRUG_GRAPH_START_Y + 80);
  ctx.fillText('Fluids', GRAPH_START_X - 5, DRUG_GRAPH_START_Y + 100);

  for (let i = 0; i <= 24; i += 0.5) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, DRUG_GRAPH_START_Y + 160);
    ctx.lineTo(GRAPH_START_X + i * 30, DRUG_GRAPH_START_Y + 160 + 20 * 12);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 12; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, DRUG_GRAPH_START_Y + i * 20 + 160);
    ctx.lineTo(GRAPH_START_X + 720, DRUG_GRAPH_START_Y + i * 20 + 160);
    ctx.stroke();
    if (180 - i * 10 >= 60) {
      ctx.fillText(180 - i * 10, GRAPH_START_X - 5, DRUG_GRAPH_START_Y + i * 20 + 150);
      ctx.fillText(40 - i / 2, GRAPH_START_X - 5 + 13 * 60, DRUG_GRAPH_START_Y + i * 20 + 150);
    }
  }

  if (dataPointsMock.drugs) {
    for (let i = 0; i < dataPointsMock.drugs.length; i += 1) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(
        dataPointsMock.drugs[i].value,
        -DRUG_GRAPH_START_Y - 100,
        GRAPH_START_X + dataPointsMock.drugs[i].timeStamp * 30
      );
      ctx.rotate(Math.PI / 2);
    }
  }

  for (let i = 0; i < dataPointsMock.pulse.length; i += 1) {
    drawXMark(
      ctx,
      GRAPH_START_X + dataPointsMock.pulse[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (180 - dataPointsMock.pulse[i].value) * 2
    );
  }

  for (let i = 0; i < dataPointsMock.systolic.length; i += 1) {
    drawV(
      ctx,
      GRAPH_START_X + dataPointsMock.systolic[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (180 - dataPointsMock.systolic[i].value) * 2
    );
  }

  for (let i = 0; i < dataPointsMock.diastolic.length; i += 1) {
    drawCap(
      ctx,
      GRAPH_START_X + dataPointsMock.diastolic[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (180 - dataPointsMock.diastolic[i].value) * 2
    );
  }

  for (let i = 0; i < dataPointsMock.temperature.length; i += 1) {
    drawOMark(
      ctx,
      GRAPH_START_X + dataPointsMock.diastolic[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (40 - dataPointsMock.temperature[i].value) * 40
    );
  }
};

export const drawUrine = (ctx, dataPointsMock) => {
  const URINE_VALUES_ARRAY = [
    'Volume',
    'ALB',
    'ACET',
    'GLUC',
    'VOIMITUS'
  ];

  ctx.font = '25px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'end';
  ctx.fillText('Urine', GRAPH_START_X - 100, URINE_GRAPH_START_Y + 20 * 5);
  ctx.textAlign = 'start';
  ctx.font = '15px Arial';
  for (let i = 0; i < 25 / 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 60, URINE_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 60, URINE_GRAPH_START_Y + 40 * 5);
    ctx.stroke();
  }

  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, URINE_GRAPH_START_Y + i * 40);
    ctx.lineTo(GRAPH_START_X + 720, URINE_GRAPH_START_Y + i * 40);
    ctx.stroke();
    if (5 - i > 0) {
      ctx.fillText(URINE_VALUES_ARRAY[i], GRAPH_START_X - 5, URINE_GRAPH_START_Y + i * 40 + 20);
    }
  }

  for (let i = 0; i < dataPointsMock.length; i += 1) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(
      dataPointsMock[i].volume,
      -URINE_GRAPH_START_Y - 20,
      GRAPH_START_X + dataPointsMock[i].timeStamp * 30 - 15
    );
    ctx.rotate(Math.PI / 2);

    ctx.fillText(
      dataPointsMock[i].albumin ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 60
    );

    ctx.fillText(
      dataPointsMock[i].acetone ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 100
    );
    ctx.fillText(
      dataPointsMock[i].glucose ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 140
    );
    ctx.fillText(
      dataPointsMock[i].voimitus ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 180
    );
  }
};
