import Groq from
  "groq-sdk";

const groq =
  new Groq({

    apiKey:
      process.env.GROQ_API_KEY

  });

export async function
generateInsights(data) {

  try {

    const prompt = `

You are an AI analytics expert.

Analyze this website analytics data.

DATA:

Total Clicks:
${data.totalClicks}

Visitors:
${data.visitors}

Pages:
${data.pages}

Active Users:
${data.activeUsers}

Top Page:
${data.topPage}

Top Clicked Element:
${data.topElement}

Give:

1. User behavior insights
2. Problems detected
3. Improvement suggestions

Use short professional bullet points.

`;

    const chatCompletion =
      await groq.chat.completions.create({

        messages: [

          {

            role: "user",

            content:
              prompt

          }

        ],

        model:
          "llama-3.3-70b-versatile"

      });

    console.log(
      JSON.stringify(
        chatCompletion,
        null,
        2
      )
    );

    return chatCompletion
      ?.choices?.[0]
      ?.message?.content
      || "No AI response";

  } catch (err) {

    console.log(
      "GROQ ERROR:"
    );

    console.log(err);

    return `

• AI service unavailable

• Please try again later

`;

  }

}