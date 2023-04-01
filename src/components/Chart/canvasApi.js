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
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fill();
};

// const keepPoint = (ctx, x, y) => {
//   ctx.beginPath();
//   ctx.arc(x, y, 5, 0, 2 * Math.PI);
//   ctx.fill();
// };

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
  const dataPointsMock = [
    {
      timeStamp: 8, value: 126
    },
    {
      timeStamp: 8.6, value: 138
    },
    {
      timeStamp: 9.2, value: 150
    },
    {
      timeStamp: 9.50, value: 160
    },
    {
      timeStamp: 10.00, value: 165
    },
    {
      timeStamp: 10.550, value: 149
    },
    {
      timeStamp: 11.001, value: 129
    },
    {
      timeStamp: 11.50, value: 130
    },
    {
      timeStamp: 12.01, value: 140
    },
    {
      timeStamp: 12.51, value: 145
    },
    {
      timeStamp: 13.01, value: 155
    },
    {
      timeStamp: 13.61, value: 140
    },
    {
      timeStamp: 14.01, value: 135
    },
    {
      timeStamp: 14.50, value: 130
    },
    {
      timeStamp: 15.00, value: 130
    }
  ];
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

  // Draw the graph with data points
  for (let i = 0; i < dataPointsMock.length; i += 1) {
    drawXMark(
      ctx,
      GRAPH_START_X + dataPointsMock[i].timeStamp * 30,
      FETAL_HEART_RATE_GRAPH_START_Y + (200 - dataPointsMock[i].value) * 2
    );
    // Draw a line
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

export const drawLiquorMoulding = (ctx) => {
  const dataPointsMock = {
    liquor: [
      {
        timeStamp: 8,
        value: 'I'
      },
      {
        timeStamp: 9.2,
        value: 'I'
      },
      {
        timeStamp: 10.00,
        value: 'I'
      },
      {
        timeStamp: 11.001,
        value: 'C'
      },
      {
        timeStamp: 12.01,
        value: 'C'
      },
      {
        timeStamp: 13.01,
        value: 'C'
      },
      {
        timeStamp: 14.01,
        value: 'C'
      },
      {
        timeStamp: 15.00,
        value: 'M1'
      }
    ],
    moulding: [
      {
        timeStamp: 8,
        value: '0'
      },
      {
        timeStamp: 9.2,
        value: '0'
      },
      {
        timeStamp: 10.00,
        value: '1'
      },
      {
        timeStamp: 11.001,
        value: '1'
      },
      {
        timeStamp: 12.01,
        value: '1'
      },
      {
        timeStamp: 13.01,
        value: '1'
      },
      {
        timeStamp: 14.01,
        value: '2'
      },
      {
        timeStamp: 15.00,
        value: '2'
      }
    ]
  };

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

  // Draw the graph with data points
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

export const drawCervix = (ctx) => {
  const dataPointsMock = {
    cervix: [
      {
        timeStamp: 8,
        value: '4'
      },
      {
        timeStamp: 12.01,
        value: '7'
      },
      {
        timeStamp: 15.00,
        value: '9'
      }
    ],
    descent: [
      {
        timeStamp: 8,
        value: 5
      },
      {
        timeStamp: 12.01,
        value: 3
      },
      {
        timeStamp: 15.00,
        value: 1
      }
    ]
  };
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

  // Plot data points
  for (let i = 0; i < dataPointsMock.cervix.length; i += 1) {
    drawXMark(
      ctx,
      GRAPH_START_X + Math.round(dataPointsMock.cervix[i].timeStamp) * 30,
      CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.cervix[i].value)
    );
    // Draw line to previous point
    if (i > 0) {
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

  for (let i = 0; i < dataPointsMock.descent.length; i += 1) {
    drawXMark(
      ctx,
      GRAPH_START_X + Math.round(dataPointsMock.descent[i].timeStamp) * 30,
      CERVIX_GRAPH_START_Y + 40 * (10 - dataPointsMock.descent[i].value)
    );
    // Draw line to previous point
    if (i > 0) {
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
  const dataPointsMock = {
    drugs: [
      {
        timeStamp: 8,
        value: 'None'
      },
      {
        timeStamp: 8.6,
        value: 'None'
      },
      {
        timeStamp: 9.2,
        value: 'None'
      },
      {
        timeStamp: 9.50,
        value: 'None'
      },
      {
        timeStamp: 10.00,
        value: 'None'
      },
      {
        timeStamp: 10.550,
        value: 'None'
      },
      {
        timeStamp: 11.001,
        value: 'None'
      },
      {
        timeStamp: 11.50,
        value: 'None'
      },
      {
        timeStamp: 12.01,
        value: 'None'
      },
      {
        timeStamp: 12.51,
        value: 'None'
      },
      {
        timeStamp: 13.01,
        value: 'None'
      },
      {
        timeStamp: 13.61,
        value: 'None'
      },
      {
        timeStamp: 14.01,
        value: 'None'
      },
      {
        timeStamp: 14.50,
        value: 'None'
      },
      {
        timeStamp: 15.00,
        value: 'None'
      }
    ],
    systolic: [
      {
        timeStamp: 8,
        value: 110
      },
      {
        timeStamp: 8.6,
        value: 112
      },
      {
        timeStamp: 9.2,
        value: 115
      },
      {
        timeStamp: 9.50,
        value: 117
      },
      {
        timeStamp: 10.00,
        value: 120
      },
      {
        timeStamp: 10.550,
        value: 122
      },
      {
        timeStamp: 11.001,
        value: 125
      },
      {
        timeStamp: 11.50,
        value: 127
      },
      {
        timeStamp: 12.01,
        value: 130
      },
      {
        timeStamp: 12.51,
        value: 128
      },
      {
        timeStamp: 13.01,
        value: 127
      },
      {
        timeStamp: 13.61,
        value: 126
      },
      {
        timeStamp: 14.01,
        value: 125
      },
      {
        timeStamp: 14.50,
        value: 127
      },
      {
        timeStamp: 15.00,
        value: 125
      }
    ],
    diastolic: [
      {
        timeStamp: 8,
        value: 70
      },
      {
        timeStamp: 8.6,
        value: 65
      },
      {
        timeStamp: 9.2,
        value: 68
      },
      {
        timeStamp: 9.50,
        value: 69
      },
      {
        timeStamp: 10.00,
        value: 60
      },
      {
        timeStamp: 10.550,
        value: 75
      },
      {
        timeStamp: 11.001,
        value: 80
      },
      {
        timeStamp: 11.50,
        value: 76
      },
      {
        timeStamp: 12.01,
        value: 78
      },
      {
        timeStamp: 12.51,
        value: 66
      },
      {
        timeStamp: 13.01,
        value: 72
      },
      {
        timeStamp: 13.61,
        value: 75
      },
      {
        timeStamp: 14.01,
        value: 74
      },
      {
        timeStamp: 14.50,
        value: 71
      },
      {
        timeStamp: 15.00,
        value: 79
      }
    ],
    temperature: [
      {
        timeStamp: 8,
        value: 36
      },
      {
        timeStamp: 8.6,
        value: 36.5
      },
      {
        timeStamp: 9.2,
        value: 36.9
      },
      {
        timeStamp: 9.50,
        value: 37
      },
      {
        timeStamp: 10.00,
        value: 37.5
      },
      {
        timeStamp: 10.550,
        value: 38
      },
      {
        timeStamp: 11.001,
        value: 37.8
      },
      {
        timeStamp: 11.50,
        value: 37.5
      },
      {
        timeStamp: 12.01,
        value: 37.2
      },
      {
        timeStamp: 12.51,
        value: 37.5
      },
      {
        timeStamp: 13.01,
        value: 37.6
      },
      {
        timeStamp: 13.61,
        value: 37.4
      },
      {
        timeStamp: 14.01,
        value: 37.6
      },
      {
        timeStamp: 14.50,
        value: 37.7
      },
      {
        timeStamp: 15.00,
        value: 36
      }
    ],
    pulse: [
      {
        timeStamp: 8,
        value: 70
      },
      {
        timeStamp: 8.6,
        value: 75
      },
      {
        timeStamp: 9.2,
        value: 80
      },
      {
        timeStamp: 9.50,
        value: 90
      },
      {
        timeStamp: 10.00,
        value: 100
      },
      {
        timeStamp: 10.550,
        value: 120
      },
      {
        timeStamp: 11.001,
        value: 125
      },
      {
        timeStamp: 11.50,
        value: 130
      },
      {
        timeStamp: 12.01,
        value: 115
      },
      {
        timeStamp: 12.51,
        value: 110
      },
      {
        timeStamp: 13.01,
        value: 100
      },
      {
        timeStamp: 13.61,
        value: 105
      },
      {
        timeStamp: 14.01,
        value: 116
      },
      {
        timeStamp: 14.50,
        value: 110
      },
      {
        timeStamp: 15.00,
        value: 111
      }
    ]
  };
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

  // Draw data points
  for (let i = 0; i < dataPointsMock.drugs.length; i += 1) {
    // write text in vertical lines
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

  for (let i = 0; i < dataPointsMock.pulse.length; i += 1) {
    // draw X axis
    drawXMark(
      ctx,
      GRAPH_START_X + dataPointsMock.pulse[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (180 - dataPointsMock.pulse[i].value) * 2
    );
  }

  for (let i = 0; i < dataPointsMock.systolic.length; i += 1) {
    // draw X axis
    drawV(
      ctx,
      GRAPH_START_X + dataPointsMock.systolic[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (180 - dataPointsMock.systolic[i].value) * 2
    );
  }

  for (let i = 0; i < dataPointsMock.diastolic.length; i += 1) {
    // draw X axis
    drawCap(
      ctx,
      GRAPH_START_X + dataPointsMock.diastolic[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (180 - dataPointsMock.diastolic[i].value) * 2
    );
  }

  for (let i = 0; i < dataPointsMock.temperature.length; i += 1) {
    // draw X axis
    drawOMark(
      ctx,
      GRAPH_START_X + dataPointsMock.diastolic[i].timeStamp * 30,
      DRUG_GRAPH_START_Y + 160 + (180 - dataPointsMock.temperature[i].value) * 2
    );
  }
};

export const drawUrine = (ctx) => {
  const URINE_VALUES_ARRAY = [
    'Volume',
    'ALB',
    'ACET',
    'GLUC',
    'VOIMITUS'
  ];

  const dataPointsMock = [
    {
      timeStamp: 8,
      volume: 100,
      albumin: false,
      acetone: false,
      glucose: false,
      voimitus: false
    },
    {
      timeStamp: 12.01,
      volume: 100,
      albumin: false,
      acetone: false,
      glucose: true,
      voimitus: true
    }
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

  // Write data points
  for (let i = 0; i < dataPointsMock.length; i += 1) {
    // write text in vertical lines
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(
      dataPointsMock[i].volume,
      -URINE_GRAPH_START_Y - 20,
      GRAPH_START_X + dataPointsMock[i].timeStamp * 30 - 15
    );
    ctx.rotate(Math.PI / 2);
    // fill +ve if true and -ve if false

    ctx.fillText(
      dataPointsMock[i].albumin ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 60
    );

    ctx.fillText(
      dataPointsMock[i].albumin ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 100
    );
    ctx.fillText(
      dataPointsMock[i].albumin ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 140
    );
    ctx.fillText(
      dataPointsMock[i].albumin ? '+ ve' : '- ve',
      GRAPH_START_X + Math.round(dataPointsMock[i].timeStamp) * 30 - 15,
      URINE_GRAPH_START_Y + 180
    );
  }
};
