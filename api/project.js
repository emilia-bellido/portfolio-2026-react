export default async function handler(req, res) {
    try {
        const baseId = process.env.AIRTABLE_BASE_ID;
        const pat = process.env.AIRTABLE_PAT;
        const url = `https://api.airtable.com/v0/${baseId}/Projects`;

        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${pat}` }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Airtable API Error:", data);
            return res.status(response.status).json({ error: "Airtable rejected the request", details: data });
        }

        // Cache this response at Vercel's edge for 1 hour.
        // stale-while-revalidate lets it serve the old (fast) cached copy
        // for up to a day while quietly refreshing in the background.
        res.setHeader('Cache-Control', 's-maxage=1209600, stale-while-revalidate=86400');

        return res.status(200).json(data);
    } catch (error) {
        console.error("Serverless Function Crash:", error);
        return res.status(500).json({ error: 'Server crashed', message: error.message });
    }
}
