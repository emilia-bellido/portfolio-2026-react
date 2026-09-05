export default async function handler(req, res) {
    try {
        const baseId = process.env.AIRTABLE_BASE_ID;
        const pat = process.env.AIRTABLE_PAT;
        
        // Log to Vercel to confirm variables exist (true/false)
        console.log("Environment Variables Check:", { hasBaseId: !!baseId, hasPat: !!pat });

        const url = `https://api.airtable.com/v0/${baseId}/Projects`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${pat}`
            }
        });

        const data = await response.json();

        // If Airtable rejects the request, send the exact error to the screen
        if (!response.ok) {
            console.error("Airtable API Error:", data);
            return res.status(response.status).json({ error: "Airtable rejected the request", details: data });
        }

        // If successful, send data
        return res.status(200).json(data);
        
    } catch (error) {
        console.error("Serverless Function Crash:", error);
        return res.status(500).json({ error: 'Server crashed', message: error.message });
    }
}