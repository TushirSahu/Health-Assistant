import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const API_KEY = "AIzaSyCThmnZHNxGR_FrJ1w0heWE2bWQVNaMuWI";

const safteyConfig = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

class GEMINIAPI {
  private genAI: GoogleGenerativeAI;
  private model;
  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: safteyConfig,
    });
  }

  public async getResponse(code: string, text: string) {
    let selectedTemplate;
    switch (code) {
      case "MED_NAME":
        selectedTemplate =
          "Hey you are supposed to read the text and extract only the medicinename and provide it as medicine:(the name you extracted) and no other information apart from that Here is the text and present the response as medicine:response here is the text: ";
        break;
      case "MED_INFO":
        selectedTemplate =
          "Hey so you will be provided a name of the medicine please provide the uses of the this medicine what it does and how it can heal stuff just make sure to limit it to 60 words and keep it in layman terms so that older age people can understand only here is the medicine: ";
        break;
      default:
        console.log("no code matched");
        break;
    }
    const result = await this.model.generateContent(selectedTemplate + text);
    const response = await result.response;
    const ans = response.text();
    return ans;
  }
}

export default GEMINIAPI;
