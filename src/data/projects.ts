import type { Project } from "@/types";
import { cropDeal, DoctorAtDoorStep, HairSalon } from "@/assets";

export const PROJECTS: Project[] = [
  {
    id: "crop-deal",
    title: "Crop Deal",
    description:
      "Enterprise agricultural marketplace platform with multi-role access, secure transactions, and automated invoicing for crop trading operations.",
    tech: ["ASP.NET Core", "Angular", "Azure", "SQL Server"],
    features: [
      "JWT Authentication",
      "Multi-role System",
      "Invoice Generation",
    ],
    image: cropDeal,
    liveUrl: "https://youtu.be/9gZMp6sAFLI",
    githubUrl: "https://github.com/RahulBhola/CropDeal",
    gradient: "from-cyan-500/20 via-blue-500/10 to-purple-500/20",
  },
  {
    id: "doctor-at-doorstep",
    title: "Doctor At Doorstep",
    description:
      "Healthcare booking platform connecting patients with doctors for at-home consultations with real-time scheduling and patient management.",
    tech: ["React", "Node.js", "MongoDB"],
    image: DoctorAtDoorStep,
    liveUrl: "https://remote-patient-monitor.netlify.app/",
    githubUrl: "https://github.com/RahulBhola/DoctorAtDoorStep",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  },
  {
    id: "hair-salon",
    title: "Hair Salon Website",
    description:
      "Modern salon booking website with service catalog, appointment scheduling, and responsive design for seamless customer experience.",
    tech: ["React", "Node.js", "Tailwind", "MongoDB"],
    image: HairSalon,
    liveUrl: "https://rahulbhola.github.io/HairSalonWebsite/",
    githubUrl: "https://github.com/RahulBhola/HairSalonWebsite",
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
  },
];
