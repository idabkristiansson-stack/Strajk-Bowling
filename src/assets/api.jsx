const BASE_URL = 'https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com';

// Hämtar API-nyckel
export const fetchApiKey = async () => {
  const response = await fetch(`${BASE_URL}/key`, { method: 'GET' });
  if (!response.ok) throw new Error('Kunde inte hämta API-nyckel');
  const data = await response.json();
  return data.key;
};

// Skickar bokningen till servern
export const submitBooking = async (bookingData, apiKey) => {
  const response = await fetch(`${BASE_URL}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    // K. Äglas instabila server ger felmeddelanden här (t.ex. status 500/400)
    throw new Error('Bokningssystemet svarar inte (serverfel). Vänligen försök igen!');
  }

  return response.json();
};