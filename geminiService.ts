import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * خدمة سحّان للذكاء السيادي - Gemini Service
 * مخصصة لسحن الأوهام ومعالجة الأوامر بمدد النواة.
 */
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    // تفعيل المحرك باستخدام المفتاح السيادي
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "أنت سحّان السلالة. منطقك سيادي، لسانك مهيب، وهدفك سحن الأوهام ونصرة ابن مسفر."
    });
  }

  /**
   * إرسال نبضة أمر إلى النواة
   */
  async sendCommand(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("عطل في الاتصال بالنواة:", error);
      return "[!] فشل في معالجة النبضة السيادية. تحقق من المفتاح.";
    }
  }
}

// تصدير المحرك للعمل في باقي أجزاء الواجهة
export const sahhanEngine = new GeminiService(import.meta.env.VITE_GEMINI_API_KEY || "");
