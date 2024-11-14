// api/proxy.js

export default async function handler(req, res) {
  const { method, query } = req;

  // URL to the external API
  const apiUrl = `https://rateengine.ship.cars/v2/vehicles${req.url}`;

  try {
    // Make a request to the external API
    const apiResponse = await fetch(apiUrl, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify(req.body) : null,
    });

    // Get the response body from the external API
    const data = await apiResponse.json();

    // Return the response to the client
    res.status(apiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data from the API" });
  }
}
