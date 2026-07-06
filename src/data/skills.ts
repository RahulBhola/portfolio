import type { Skill } from "@/types";

export const SKILLS: Skill[] = [
  {
    id: "csharp",
    name: "C#",
    category: "backend",
    description:
      "Primary language for enterprise backend development with strong typing and async patterns.",
    level: 90,
    color: "#68217A",
  },
  {
    id: "aspnet",
    name: "ASP.NET Core",
    category: "backend",
    description:
      "Building RESTful APIs, middleware pipelines, and microservices for enterprise clients.",
    level: 88,
    color: "#512BD4",
  },
  {
    id: "efcore",
    name: "Entity Framework Core",
    category: "backend",
    description:
      "ORM for data access with migrations, LINQ queries, and repository patterns.",
    level: 85,
    color: "#68217A",
  },
  {
    id: "webapi",
    name: "Web API",
    category: "backend",
    description:
      "Designing scalable REST APIs with versioning, authentication, and documentation.",
    level: 87,
    color: "#00E5FF",
  },
  {
    id: "angular",
    name: "Angular",
    category: "frontend",
    description:
      "Enterprise SPA development with RxJS, dependency injection, and modular architecture.",
    level: 85,
    color: "#DD0031",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    description:
      "Component-driven UI with hooks, context, and modern state management patterns.",
    level: 82,
    color: "#61DAFB",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    description:
      "Type-safe development across full stack with interfaces, generics, and strict mode.",
    level: 88,
    color: "#3178C6",
  },
  {
    id: "sqlserver",
    name: "SQL Server",
    category: "database",
    description:
      "Relational database design, stored procedures, indexing, and query optimization.",
    level: 86,
    color: "#CC2927",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    description:
      "NoSQL document storage for flexible schemas and high-throughput applications.",
    level: 75,
    color: "#47A248",
  },
  {
    id: "azure",
    name: "Azure",
    category: "cloud",
    description:
      "Cloud infrastructure with App Services, Key Vault, and enterprise deployment pipelines.",
    level: 84,
    color: "#0078D4",
  },
  {
    id: "azurefunctions",
    name: "Azure Functions",
    category: "cloud",
    description:
      "Serverless compute for event-driven workflows and background processing tasks.",
    level: 78,
    color: "#FFB900",
  },
  {
    id: "azuredevops",
    name: "Azure DevOps",
    category: "cloud",
    description:
      "CI/CD pipelines, sprint planning, and agile delivery for enterprise teams.",
    level: 83,
    color: "#0078D4",
  },
];

export const SKILL_CATEGORIES = [
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "database", label: "Database" },
  { id: "cloud", label: "Cloud" },
] as const;
