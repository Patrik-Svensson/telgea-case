export async function fetchSubscriberSmsUsage(): Promise<string> {
  const url = 'http://localhost:3000/sms-usage-mock';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
    },
    body: `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                          xmlns:sms="http://provider.com/sms">
          <soapenv:Header/>
          <soapenv:Body>
            <sms:ChargeSMSRequest/>
          </soapenv:Body>
        </soapenv:Envelope>
      `.trim(),
  });

  if (!response.ok) {
    throw new Error(`SOAP request failed with status ${response.status}`);
  }

  const responseText = await response.text();
  return responseText;
}
