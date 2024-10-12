import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";
import { mealPlanSchema } from "./mealPlanSchema.js";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

// Inicialización del cliente de Google Generative AI.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ruta para generar un plan de comidas basado en los parámetros del usuario.
app.get("/meal-plan", async (request, response) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // Respuesta estructurada
    // const model = genAI.getGenerativeModel({
    //   model: "gemini-1.5-pro",
    //   generationConfig: {
    //     responseMimeType: "application/json",
    //     responseSchema: mealPlanSchema,
    //   },
    // });

    const prompt = `Genera un plan de comidas para una persona de ${request.query.age} 
    años de género ${request.query.gender} que pesa ${request.query.weight} kg y tiene como 
    objetivo alcanzar ${request.query.goalWeight} kg. Por favor, proporciona opciones para el 
    desayuno, almuerzo, cena y snacks durante 7 días.`;

    // Generar contenido usando el modelo.
    const result = await model.generateContent(prompt);
    const geminiResponse = await result.response;
    const text = geminiResponse.text();

    response.send(text);
  } catch (error) {
    console.error("Error generando plan de comidas:", error);
    response.status(500).send("Error generando plan de comidas");
  }
});

// Middleware para manejar la subida de archivos con multer.
const upload = multer({ storage: multer.memoryStorage() });
const modelVision = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Ruta para analizar una imagen de comida y obtener su valor nutricional.
app.post("/meal-calories", upload.single("meal"), async (request, response) => {
  try {
    const prompt = `Identifica la comida en la imagen y proporciona su valor nutricional 
    (calorías, proteínas, carbohidratos y grasas).`;

    const result = await modelVision.generateContent([
      prompt,
      {
        inlineData: {
          data: request.file.buffer.toString("base64"),
          mimeType: request.file.mimetype,
        },
      },
    ]);

    const geminiResponse = await result.response;
    const text = geminiResponse.text();

    response.send(text);
  } catch (error) {
    console.error("Error analizando la imagen de comida:", error);
    response.status(500).send("Error analizando la imagen de comida");
  }
});

// Historial de chat para cada sesión. En producción, usa una base de datos o almacenamiento de sesión.
let chatHistory = [];

// Ruta para manejar un chat interactivo basado en la entrada del usuario.
app.post("/chat", async (request, response) => {
  const message = request.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log(chatHistory);
    // Crear una instancia de chat con historial.
    const chat = model.startChat({
      history: chatHistory,
      systemInstructions:
        "Eres un asistente de nutrición enfocado en recomendar únicamente comidas nutritivas y fáciles de preparar. Limita tus sugerencias a opciones saludables y sencillas, sin desviar la conversación hacia otros temas.",
    });

    // Enviar mensaje al modelo y obtener la respuesta.
    const result = await chat.sendMessage(message);
    const geminiResponse = await result.response;
    const text = geminiResponse.text();

    response.send(text);
  } catch (error) {
    console.error("Error en el chat:", error);
    response.status(500).send("Error en el chat");
  }
});

// Iniciar el servidor en el puerto especificado.
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto:", PORT);
});
