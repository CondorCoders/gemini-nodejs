import { SchemaType } from "@google/generative-ai";

export const mealPlanSchema = {
  description: "Plan de comidas de 7 días",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      dia: {
        type: SchemaType.INTEGER,
        description: "Día del plan de comidas (1 a 7)",
        nullable: false,
      },
      comidas: {
        type: SchemaType.OBJECT,
        properties: {
          desayuno: {
            type: SchemaType.OBJECT,
            properties: {
              nombreReceta: {
                type: SchemaType.STRING,
                description: "Nombre de la receta del desayuno",
                nullable: false,
              },
              ingredientes: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING,
                },
                description: "Lista de ingredientes para el desayuno",
              },
              instrucciones: {
                type: SchemaType.STRING,
                description: "Instrucciones de preparación para el desayuno",
              },
            },
            required: ["nombreReceta"],
          },
          almuerzo: {
            type: SchemaType.OBJECT,
            properties: {
              nombreReceta: {
                type: SchemaType.STRING,
                description: "Nombre de la receta del almuerzo",
                nullable: false,
              },
              ingredientes: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING,
                },
                description: "Lista de ingredientes para el almuerzo",
              },
              instrucciones: {
                type: SchemaType.STRING,
                description: "Instrucciones de preparación para el almuerzo",
              },
            },
            required: ["nombreReceta"],
          },
          cena: {
            type: SchemaType.OBJECT,
            properties: {
              nombreReceta: {
                type: SchemaType.STRING,
                description: "Nombre de la receta de la cena",
                nullable: false,
              },
              ingredientes: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING,
                },
                description: "Lista de ingredientes para la cena",
              },
              instrucciones: {
                type: SchemaType.STRING,
                description: "Instrucciones de preparación para la cena",
              },
            },
            required: ["nombreReceta"],
          },
          snacks: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                nombreReceta: {
                  type: SchemaType.STRING,
                  description: "Nombre de la receta del snack",
                  nullable: false,
                },
                ingredientes: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.STRING,
                  },
                  description: "Lista de ingredientes para el snack",
                },
                instrucciones: {
                  type: SchemaType.STRING,
                  description: "Instrucciones de preparación para el snack",
                },
              },
              required: ["nombreReceta"],
            },
            description: "Lista de snacks para el día",
          },
        },
        required: ["desayuno", "almuerzo", "cena", "snacks"],
      },
    },
    required: ["dia", "comidas"],
  },
};
