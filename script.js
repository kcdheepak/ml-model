
async function fetchData() {
  const apiKey = document.getElementById('apiKey').value;
  const channelId = document.getElementById('channelId').value;
  const outputDiv = document.getElementById('dataDisplay');
  outputDiv.innerHTML = '';

  if (!apiKey || !channelId) {
    alert('Please enter both API key and Channel ID.');
    return;
  }

  const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Invalid API Key or Channel ID.");
    const data = await response.json();

    const feeds = data.feeds;
    if (feeds.length === 0) {
      outputDiv.innerHTML = "<p>No data available.</p>";
      return;
    }

    feeds.forEach(feed => {
      const card = document.createElement('div');
      card.className = 'data-card';

      let content = '';
      for (let i = 1; i <= 8; i++) {
        if (feed[`field${i}`]) {
          content += `<p><strong>Field ${i}:</strong> ${feed[`field${i}`]}</p>`;
        }
      }
      content += `<p class="timestamp">Timestamp: ${new Date(feed.created_at).toLocaleString()}</p>`;
      card.innerHTML = content;
      outputDiv.appendChild(card);
    });

  } catch (err) {
    outputDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
}
