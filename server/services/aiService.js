const axios = require("axios");

const askAI = async (message) => {
    try {
        console.log("Calling OpenRouter...");
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an AI customer support assistant. Help users politely. If the issue requires human support, suggest creating a support ticket.",
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
            },
            {
                headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5001",
                "X-Title": "Support Ticket System",
            },
            }
        );
        console.log("OpenRouter Response:", response.data);

        return response.data.choices[0].message.content;

    } catch (err) {
    console.error("OpenRouter Error:");

    if (err.response) {
        console.error(err.response.status);
        console.error(err.response.data);
    } else {
        console.error(err.message);
    }

    throw new Error("AI request failed");
}
};

module.exports = {
    askAI,
};