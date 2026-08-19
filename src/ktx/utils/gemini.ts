// Client helper to communicate with backend Gemini AI endpoints

export async function requestDynamicEvent(payload: {
  stage: string;
  day: number;
  location: string;
  playerName: string;
  companionName: string;
  playerSkill: string;
  survivorsCount: number;
  context?: string;
}) {
  try {
    const res = await fetch('/api/gemini/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch {
    return {
      title: `Biến cố tại ${payload.location}`,
      description: `Một bầy zombie đang tụ tập quanh lối đi. ${payload.companionName} khẽ ra hiệu chuẩn bị ứng biến.`,
      choiceA: { text: "Phục kích tiêu diệt", reward: "Nhận 40 EXP & Phế liệu", risk: "Mất 10 HP nếu trượt" },
      choiceB: { text: "Men theo đường vòng", reward: "An toàn tuyệt đối", risk: "Tốn thêm thời gian" },
      source: 'offline_fallback'
    };
  }
}

export async function requestCompanionChat(payload: {
  companionName: string;
  companionSkill: string;
  message: string;
  day: number;
  stage: string;
  sanity: number;
}) {
  try {
    const res = await fetch('/api/gemini/companion-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch {
    return {
      reply: `"${payload.companionName}: Đừng lo, chúng ta đã cùng nhau vượt qua bao nhiêu chuyện rồi. Ký túc xá này không ngăn cản được chúng ta đâu!"`,
      source: 'offline_fallback'
    };
  }
}
