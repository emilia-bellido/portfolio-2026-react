export default async function handler(req, res) {
    try {
        // In a backend Node environment, we use process.env instead of import.meta.env
        const baseId = process.env.AIRTABLE_BASE_ID;
        const pat = process.env.AIRTABLE_PAT;
        
        const url = `https://api.airtable.com/v0/${baseId}/Projects`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${pat}`
            }
        });

        if (!response.ok) {
            throw new Error(`Airtable error: ${response.status}`);
        }

        const data = await response.json();
        
        // Send the secure data back to your React frontend
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
}