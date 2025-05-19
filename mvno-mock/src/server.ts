import express from 'express';

const app = express();
const PORT = 3000;

// JSON REST endpoint
app.get('/data-usage-mock', (_req, res) => {
  res.json({
    'user\nid': 'abc123',
    '_\nmsisdn': '+46701234567',
    usage: {
      data: {
        'total\nmb': 845.23,
        '_\nroaming_\nmb': 210.5,
        country: 'SE',
      },
      period: {
        start: '2025-04-01T00:00:00Z',
        end: '2025-04-30T23:59:59Z',
      },
    },
    network: {
      type: '4G',
      'provider\n_\ncode': 'SE01',
    },
  });
});

// SOAP XML endpoint
app.post('/sms-usage-mock', (req, res) => {
  const soapResponse = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:sms="http://provider.com/sms">
    <soapenv:Header/>
    <soapenv:Body>
      <sms:ChargeSMS>
        <sms:UserID>abc123</sms:UserID>
        <sms:PhoneNumber>+46701234567</sms:PhoneNumber>
        <sms:MessageID>msg789</sms:MessageID>
        <sms:Timestamp>2025-04-01T12:30:00Z</sms:Timestamp>
        <sms:ChargeAmount>0.05</sms:ChargeAmount>
        <sms:Currency>EUR</sms:Currency>
      </sms:ChargeSMS>
    </soapenv:Body>
  </soapenv:Envelope>
  `.trim();

  res.set('Content-Type', 'text/xml');
  res.send(soapResponse);
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}/mock`);
});
