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
            res.setHeader('Cache-Control', 'no-store');
            return res.status(response.status).json({ error: "Airtable rejected the request", details: data });
        }

        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
        return res.status(200).json(data);

    } catch (error) {
        console.error("Serverless Function Crash:", error);
        res.setHeader('Cache-Control', 'no-store');
        return res.status(500).json({ error: 'Server crashed', message: error.message });
    }
}
