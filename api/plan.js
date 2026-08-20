export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.DS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing DS_API_KEY"
      });
    }

    const body = req.body;

    const prompt = `
You are an academic application planning assistant.

Your job is ONLY to organize tasks.

You may:
- rank tasks by urgency and importance
- allocate available time
- identify deadline conflicts
- suggest what to postpone

You must NOT:
- write application essays
- change deadlines
- submit applications
- delete tasks

User planning data:

Available time:
${body.availableMinutes} minutes

Tasks:
${JSON.stringify(body.tasks, null, 2)}

Applications:
${JSON.stringify(body.applications, null, 2)}

Exams:
${JSON.stringify(body.exams, null, 2)}

Return a clear daily plan with:
1. Task order
2. Suggested time allocation
3. Short reasons
4. Any deadline warnings
`;

    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.3
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json({
      plan: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
