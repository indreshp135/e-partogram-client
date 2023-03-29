const GRAPH_START_X = 260;
const FETAL_HEART_RATE_GRAPH_START_Y = 100 + 40;
const LIQOUR_MOULDING_GRAPH_START_Y = FETAL_HEART_RATE_GRAPH_START_Y + 20 * 12 + 40;
const CERVIX_GRAPH_START_Y = LIQOUR_MOULDING_GRAPH_START_Y + 20 * 3 + 20;
const CONTRACTIONS_GRAPH_START_Y = CERVIX_GRAPH_START_Y + 40 * 10 + 20;
const OXYTOCIN_GRAPH_START_Y = CONTRACTIONS_GRAPH_START_Y + 40 * 7 + 20;
const DRUG_GRAPH_START_Y = OXYTOCIN_GRAPH_START_Y + 20 * 2 + 20;
const URINE_GRAPH_START_Y = DRUG_GRAPH_START_Y + 160 + 12 * 20 + 20;

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
  // Set the font
    ctx.font = '15px Arial';

    const row1XStart = 50;
    const row1YStart = 50;

    const row2XStart = 50;
    const row2YStart = 70;

    const row3XStart = 50;
    const row3YStart = 90;

    const gapForColumns3 = width / 3;
    const gapForColumns5 = width / 5;

    // First row - 3 columns
    ctx.fillText(`Name: ${name}`, row1XStart, row1YStart);
    ctx.fillText(`Age: ${age}`, row1XStart + gapForColumns3, row1YStart);
    ctx.fillText(`Height: ${height}`, row1XStart + gapForColumns3 * 2, row1YStart);

    // Second row - 4 columns
    ctx.fillText(`Parity: ${parity}`, row2XStart, row2YStart);
    ctx.fillText(`Alive: ${alive}`, row2XStart + gapForColumns5, row2YStart);
    ctx.fillText(`SB: ${sb}`, row2XStart + gapForColumns5 * 2, row2YStart);
    ctx.fillText(`NND: ${nnd}`, row2XStart + gapForColumns5 * 3, row2YStart);
    ctx.fillText(`Abortion: ${abortion}`, row2XStart + gapForColumns5 * 4, row2YStart);

    // Third row - 2 columns
    ctx.fillText(`EDD: ${edd}`, row3XStart, row3YStart);
    ctx.fillText(`Contraction Start: ${contractionStartTime}`, row3XStart + gapForColumns3, row3YStart);

    ctx.fillText(`Membrane Rupture Start: ${membraneRuptureTime}`, row3XStart + 2 * gapForColumns3, row3YStart);

    // Draw a line
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(width - 50, 100);
    ctx.stroke();
  }
};

export const drawFetalHeartRate = (ctx) => {
  // Write text
  ctx.font = '25px Arial';
  ctx.textAlign = 'end';
  ctx.fillText('Fetal', GRAPH_START_X - 50, FETAL_HEART_RATE_GRAPH_START_Y + 20 * 4);
  ctx.fillText('Heart', GRAPH_START_X - 50, FETAL_HEART_RATE_GRAPH_START_Y + 20 * 6);
  ctx.fillText('Rate', GRAPH_START_X - 50, FETAL_HEART_RATE_GRAPH_START_Y + 20 * 8);
  ctx.font = '15px Arial';
  ctx.textAlign = 'start';

  ctx.textBaseline = 'middle';
  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, FETAL_HEART_RATE_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, FETAL_HEART_RATE_GRAPH_START_Y + 240);
    ctx.stroke();
    ctx.fillText(i, GRAPH_START_X + i * 30 - 5, FETAL_HEART_RATE_GRAPH_START_Y - 10);
  }

  ctx.textBaseline = 'bottom';
  // horizontal lines
  for (let i = 0; i < 13; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, FETAL_HEART_RATE_GRAPH_START_Y + i * 20);
    ctx.lineTo(GRAPH_START_X + 720, FETAL_HEART_RATE_GRAPH_START_Y + i * 20);
    ctx.stroke();
    ctx.fillText(200 - (i * 10), GRAPH_START_X - 30, FETAL_HEART_RATE_GRAPH_START_Y + i * 20 + 5);
  }
};

export const drawLiquorMoulding = (ctx) => {
  // Write text
  ctx.font = '15px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'start';
  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, LIQOUR_MOULDING_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, LIQOUR_MOULDING_GRAPH_START_Y + 40);
    ctx.stroke();
  }

  // horizontal lines
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
};

export const drawCervix = (ctx) => {
  // Write text
  ctx.font = '15px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'start';
  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, CERVIX_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, CERVIX_GRAPH_START_Y + 40 * 10);
    ctx.stroke();
  }

  for (let i = 0; i < 25 / 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 60, CERVIX_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 60, CERVIX_GRAPH_START_Y + 40 * 10);
    ctx.stroke();
  }

  // horizontal lines
  ctx.textAlign = 'end';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= 10; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, CERVIX_GRAPH_START_Y + i * 40);
    ctx.lineTo(GRAPH_START_X + 720, CERVIX_GRAPH_START_Y + i * 40);
    ctx.stroke();
    ctx.fillText(10 - i, GRAPH_START_X - 5, CERVIX_GRAPH_START_Y + i * 40);
  }

  // vertical line from 0 to 10
  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 150, CERVIX_GRAPH_START_Y);
  ctx.lineTo(GRAPH_START_X - 150, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  // horizontal line at top and bottom
  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 175, CERVIX_GRAPH_START_Y);
  ctx.lineTo(GRAPH_START_X - 125, CERVIX_GRAPH_START_Y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 175, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.lineTo(GRAPH_START_X - 125, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  // write text in the middle
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Cervix (cm)', GRAPH_START_X - 150, CERVIX_GRAPH_START_Y + 40 * 5 - 10);
  ctx.fillText('Plot X', GRAPH_START_X - 150, CERVIX_GRAPH_START_Y + 40 * 5 + 10);

  // vertical line from 5 to 10
  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 5);
  ctx.lineTo(GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  // horizontal line at top and bottom
  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 75, CERVIX_GRAPH_START_Y + 40 * 5);
  ctx.lineTo(GRAPH_START_X - 25, CERVIX_GRAPH_START_Y + 40 * 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(GRAPH_START_X - 75, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.lineTo(GRAPH_START_X - 25, CERVIX_GRAPH_START_Y + 40 * 10);
  ctx.stroke();

  // write text in the middle
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Descent (cm)', GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 7.5 - 10);
  ctx.fillText('Plot O', GRAPH_START_X - 50, CERVIX_GRAPH_START_Y + 40 * 7.5 + 10);
};

export const drawContractions = (ctx) => {
  // Write text
  ctx.font = '25px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'end';
  ctx.fillText('Contradictions', GRAPH_START_X - 50, CONTRACTIONS_GRAPH_START_Y + 20 * 6);
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

  // horizontal lines
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

  // horizontal lines
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
};

export const drawOxytocinDrops = (ctx) => {
  // Write text
  ctx.font = '15px Arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'start';
  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, OXYTOCIN_GRAPH_START_Y);
    ctx.lineTo(GRAPH_START_X + i * 30, OXYTOCIN_GRAPH_START_Y + 40);
    ctx.stroke();
  }
  // horizontal lines
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
};

export const drawDrugDrops = (ctx) => {
  // Write text
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

  // horizontal lines
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

  for (let i = 0; i < 25; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X + i * 30, DRUG_GRAPH_START_Y + 160);
    ctx.lineTo(GRAPH_START_X + i * 30, DRUG_GRAPH_START_Y + 160 + 20 * 12);
    ctx.stroke();
  }

  // horizontal lines
  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 12; i += 1) {
    ctx.beginPath();
    ctx.moveTo(GRAPH_START_X, DRUG_GRAPH_START_Y + i * 20 + 160);
    ctx.lineTo(GRAPH_START_X + 720, DRUG_GRAPH_START_Y + i * 20 + 160);
    ctx.stroke();
    if (180 - i * 10 >= 60) {
      ctx.fillText(180 - i * 10, GRAPH_START_X - 5, DRUG_GRAPH_START_Y + i * 20 + 150);
    }
  }
};

export const drawUrine = (ctx) => {
  const URINE_VALUES_ARRAY = [
    'Volume',
    'ALB',
    'ACET',
    'GLUC',
    'VOMITUS'
  ];
  // Write text
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
  // horizontal lines
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
};
