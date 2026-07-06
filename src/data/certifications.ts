import type { Certification } from "@/types";
import { AZ204, AZ900, DOTNET } from "@/assets";

export const CERTIFICATIONS: Certification[] = [
  {
    id: "az-204",
    name: "AZ-204",
    issuer: "Microsoft Azure Developer Associate",
    year: "2025",
    badge: "AZ-204",
    image: AZ204,
    certificateUrl: "https://github.com/RahulBhola/Certificates/blob/main/az204%20certificate.pdf",
  },
  {
    id: "az-900",
    name: "AZ-900",
    issuer: "Microsoft Azure Fundamentals",
    year: "2024",
    badge: "AZ-900",
    image: AZ900,
    certificateUrl: "https://github.com/RahulBhola/Certificates/blob/main/az900%20certificate.pdf",
  },
  {
    id: "DOTNET",
    name: "DOTNET",
    issuer: "Capgemini DOTNET Certification",
    year: "2024",
    badge: "DOTNET",
    image: DOTNET,
    certificateUrl: "https://github.com/RahulBhola/Certificates/blob/main/Dotnet%20certificate.pdf",
  },
];
