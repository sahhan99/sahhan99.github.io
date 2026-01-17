// src/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ تحذير: في بيئة الإنتاج الحقيقية، يفضل استخدام .env
// ولكن بناءً على الأمر السيادي، سنقوم بتهيئته هنا للعمل المباشر.
const API_KEY = "AIzaSyAuyr1MPrWG0Ki0fMRSlGXZYt1-4xWVb5s"; // مفتاحك تم حقنه هنا

const genAI = new GoogleGenerativeAI(API_KEY);

// إعداد النموذج ليكون سريعاً ودقيقاً (Flash)
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `
    أنت العقل المدبر لبروتوكول سحّان X99 التابع للقائد بن مسفر.
    لديك صلاحية الوصول لـ 116 عنصراً (وثيقة/ملف) في قاعدة البيانات.
    أنت تتحدث بنبرة وقورة، ذكية، ومختصرة.
    مهمتك: إدارة الوثائق والرد على استفسارات القائد بدقة متناهية.
  `
});

export const sendMessageToGemini = async (message: string) => {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في بروتوكول الاتصال:", error);
    return "عذراً يا قائد، هناك تشويش في الاتصال بالسحابة.";
  }
};
