import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Gemini AI Dynamic Survival Event & Narrative Generator
app.post("/api/gemini/event", async (req: Request, res: Response) => {
  try {
    const { stage, day, location, playerName, companionName, playerSkill, survivorsCount, context } = req.body;
    const ai = getAIClient();

    if (!ai) {
      // Return procedural fallback event if no API key
      return res.json({
        title: `Biến cố bất ngờ tại ${location}`,
        description: `Một bầy zombie đột biến đang rình rập quanh ${location}. Tiếng động từ tầng trên thu hút sự chú ý của chúng!`,
        choiceA: { text: "Phối hợp với " + companionName + " mai phục tiêu diệt", reward: "Nhận 50 EXP và Tinh thể biến dị", risk: "Mất 15 HP nếu thất bại" },
        choiceB: { text: "Dùng kỹ năng [" + playerSkill + "] đánh lạc hướng và rút lui", reward: "Bảo toàn thể lực, nhặt được 1 Hộp Lương Khô", risk: "Không có" },
        source: "offline_engine"
      });
    }

    const prompt = `Bạn là Hệ Thống Quản Trị Thế Giới Sinh Tồn (System AI) trong trò chơi RPG Isekai Dịch Chuyển Ký Túc Xá Zombie.
Thông tin hiện tại:
- Người chơi: ${playerName} (Kỹ năng: ${playerSkill})
- Bạn đồng hành: ${companionName}
- Vị trí: ${location}
- Giai đoạn: ${stage} (Ngày ${day})
- Số người sống sót còn lại trong KTX: ${survivorsCount}/100 người
- Hoàn cảnh: ${context || "Đang thám hiểm tìm tài nguyên"}

Hãy tạo 01 sự kiện sinh tồn ngẫu nhiên kịch tính, hấp dẫn và ngắn gọn bằng tiếng Việt.
Trả về định dạng JSON thuần túy (không markdown) với cấu trúc:
{
  "title": "Tên sự kiện ngắn gọn",
  "description": "Mô tả hoàn cảnh và sự nguy hiểm (2-3 câu)",
  "choiceA": {
    "text": "Lựa chọn hành động 1",
    "reward": "Phần thưởng dự kiến (EXP, đồ ăn, vũ khí, cứu người...)",
    "risk": "Nguy cơ tiềm ẩn (mất máu, hao mana, thu hút bầy đàn...)"
  },
  "choiceB": {
    "text": "Lựa chọn hành động 2",
    "reward": "Phần thưởng dự kiến",
    "risk": "Nguy cơ tiềm ẩn"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    try {
      const parsed = JSON.parse(text);
      res.json({ ...parsed, source: "gemini_ai" });
    } catch {
      res.json({
        title: `Phát hiện dị biến tại ${location}`,
        description: text.slice(0, 200),
        choiceA: { text: "Tấn công dứt điểm", reward: "EXP & Vật phẩm", risk: "Mất HP" },
        choiceB: { text: "Rút lui phòng thủ", reward: "Bảo toàn an toàn", risk: "Bỏ lỡ cơ hội" },
        source: "gemini_ai"
      });
    }
  } catch (err: any) {
    console.error("Gemini Event API Error:", err?.message);
    res.json({
      title: "Cảnh báo dao động không gian",
      description: "Một làn sóng zombie vừa tràn qua khu vực lân cận, để lại dấu vết chiến lợi phẩm và nguy hiểm.",
      choiceA: { text: "Tiến lên lục soát", reward: "Vật phẩm ngẫu nhiên", risk: "Chạm trán quái" },
      choiceB: { text: "Quay về phòng an toàn", reward: "Hồi 10 Tinh thần", risk: "Không có" },
      source: "fallback"
    });
  }
});

// Gemini AI Companion Talk / Oracle Advice
app.post("/api/gemini/companion-chat", async (req: Request, res: Response) => {
  try {
    const { companionName, companionSkill, message, day, stage, sanity } = req.body;
    const ai = getAIClient();

    if (!ai) {
      const fallbackQuotes = [
        `"Tớ luôn tin tưởng cậu! Dù ở ký túc xá này đầy zombie, chúng ta nhất định sẽ sống sót vượt qua giai đoạn ${stage}!"`,
        `"Kỹ năng [${companionSkill}] của tớ đã sẵn sàng. Cứ ra lệnh khi cần nhé, người anh em!"`,
        `"Nhớ chú ý kiểm tra lượng nước uống và lương thực trong kho, ngày thứ ${day} rồi quái vật đang mạnh dần đấy."`,
        `"Nếu mệt quá thì về phòng 304 nghỉ một lát, đừng để chỉ số Tinh thần (Sanity: ${sanity}%) tụt quá thấp!"`
      ];
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      return res.json({ reply: randomQuote, source: "offline_engine" });
    }

    const prompt = `Bạn đang nhập vai là "${companionName}", người bạn thân nhất của nhân vật chính, cùng bị dịch chuyển từ thế giới hiện đại vào Ký túc xá Đại học đầy rẫy Zombie sinh tồn.
- Bạn sở hữu kỹ năng đặc biệt: [${companionSkill}]
- Ngày sinh tồn: Ngày ${day} (Giai đoạn: ${stage})
- Tinh thần hiện tại: ${sanity}%
- Lời người chơi vừa nói/hỏi: "${message}"

Hãy trả lời ngắn gọn (1-3 câu), thân thiện, thể hiện tình bạn chí cốt, sự kiên cường và phong cách sinh tồn thực tế. Trả lời bằng tiếng Việt tự nhiên.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt
    });

    res.json({ reply: response.text?.trim() || "Cùng cố gắng sinh tồn nào bạn tôi!", source: "gemini_ai" });
  } catch (err: any) {
    console.error("Gemini Companion API Error:", err?.message);
    res.json({ reply: "Tớ luôn sẵn sàng cùng cậu chiến đấu!", source: "fallback" });
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV === "development" || process.env.npm_lifecycle_event === "dev";

  // Vite middleware in dev mode
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Dịch Chuyển Sinh Tồn Server] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
