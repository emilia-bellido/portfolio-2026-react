export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const formData = req.body;
        formData.access_key = process.env.WEB3FORMS_KEY;

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: "Web3Forms rejected the request", details: data });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Contact form submission crashed:", error);
        return res.status(500).json({ error: 'Server crashed', message: error.message });
    }
}
