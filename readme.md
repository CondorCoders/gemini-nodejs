# Introducción a Gemini con NodeJS

Este proyecto muestra cómo crear una API de Planes de Nutrición utilizando Node.js, Express y la IA de Google (Gemini). A través de esta API, los usuarios pueden generar planes de comidas personalizados, analizar imágenes de alimentos para obtener información nutricional y tener interacciones con un chatbot especializado en dietas.

## Endpoints

### `GET /meal-plan`

Genera un plan de comidas basado en los parámetros del usuario, como edad, género, peso, objetivo de peso.

**Ejemplo de uso:**

```
localhost:8000/meal-plan?age=25&gender=female&weight=60&goalWeight=55
```

### `POST /meal-calories`

Analiza imágenes de alimentos y proporciona su valor nutricional (calorías, proteínas, carbohidratos y grasas).

**Ejemplo de uso con `curl`:**

```bash
curl -X POST -F "meal=@ruta/de/la/imagen.jpg" http://localhost:8000/meal-calories
```

### `POST /chat`

Permite interactuar con un chatbot especializado en nutrición. El chatbot solo responde con recomendaciones nutricionales y sugerencias de comidas saludables.

**Ejemplo de uso con `curl`:**

```bash
curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d '{"message": "¿Qué puedo comer en el desayuno?"}'
```

## Configuración Local

### 1. Clonar el repositorio

Clona el proyecto en tu máquina local.

```bash
git clone https://github.com/usuario/proyecto-gemini-node.git
cd proyecto-gemini-node
```

### 2. Instalar dependencias

Instala las dependencias necesarias con npm:

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

```env
GEMINI_API_KEY=tu_api_key_de_gemini
PORT=8000
```

#### Cómo obtener la API Key de Gemini

1. Crea una cuenta y obten tu API Key en [Google AI for developers](https://ai.google.dev/aistudio).
2. Guarda tu API Key en el archivo `.env` como se indica arriba.

### 4. Ejecutar el Servidor en Modo Desarrollo

```bash
npm start
```

### 5. Probar los Endpoints con Postman

1. Descarga e instala [Postman](https://www.postman.com/downloads/) o utiliza la extension de Postman en VSCode.
2. Prueba las solicitudes con parámetros de ejemplo para asegurarte de que todo funciona correctamente.

## Próximos Pasos

1. **Mejorar Seguridad y Escalabilidad:**

   - Implementar autenticación y autorización.
   - Almacenar imágenes en servicios como Google Cloud Storage o Amazon S3.

2. **Añadir Nuevas Funcionalidades:**

   - Incluir recomendaciones personalizadas basadas en alergias o preferencias alimenticias.

3. **Despliegue en Producción:**
   - Desplegar la aplicación en un servicio de cloud como Google Cloud o AWS.
   - Implementar monitoreo y registro para supervisar el rendimiento de la API.

## Recursos

- [Documentación de Google Generative AI](https://ai.google.dev/gemini-api/docs/text-generation?lang=node#set-up-project-and-api-key)
- [Multer para manejo de archivos en Node.js](https://www.npmjs.com/package/multer)

¡Gracias por utilizar esta guía para crear una API de Planes de Nutrición con la IA de Google! Recuerda darle una ⭐ a este repositorio.
