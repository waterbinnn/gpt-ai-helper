import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method should be POST" });
  } else {
    try {
      const { body } = req;
      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(url, body, { headers: headers });

      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error" });
    }
  }
}
