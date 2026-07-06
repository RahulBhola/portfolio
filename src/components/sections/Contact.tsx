"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MagneticButton } from "@/components/ui/magnetic-button";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const emailValidation = (value: string) => {
    return String(value)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg("");
    setSuccessMsg("");

    if (formData.name.trim() === "") {
      setErrMsg("Username is required!");
      setStatus("error");
      return;
    }

    if (formData.phoneNumber.trim() === "") {
      setErrMsg("Phone number is required!");
      setStatus("error");
      return;
    }

    if (formData.email.trim() === "") {
      setErrMsg("Please give your Email!");
      setStatus("error");
      return;
    }

    if (!emailValidation(formData.email)) {
      setErrMsg("Give a valid Email!");
      setStatus("error");
      return;
    }

    if (formData.subject.trim() === "") {
      setErrMsg("Please give your Subject!");
      setStatus("error");
      return;
    }

    if (formData.message.trim() === "") {
      setErrMsg("Message is required!");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const serviceId = "service_arh8zol";
      const templateId = "template_t0vaaod";
      const publicKey = "VjyZ53rmx4QfQHBAC";

      if (!serviceId || !templateId || !publicKey) {
        window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phoneNumber}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        setStatus("success");
        setSuccessMsg(
          `Thank you dear ${formData.name}, your message has been sent successfully!`
        );
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          subject: "",
          message: "",
        });
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          from_contact: formData.phoneNumber,
          is_subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      setStatus("success");
      setSuccessMsg(
        `Thank you dear ${formData.name}, your message has been sent successfully!`
      );
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: unknown) {
      console.error("EmailJS send failed", error);

      const reason =
        typeof error === "object" && error !== null && "text" in error
          ? (error as { text: string }).text
          : typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "EmailJS failed to send.";

      setStatus("error");
      setErrMsg(
        `EmailJS failed: ${reason}. Reconnect your Gmail account in EmailJS or send the message manually.`
      );

      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phoneNumber}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    }

    window.setTimeout(() => {
      setErrMsg("");
      setSuccessMsg("");
      setStatus("idle");
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's discuss your next enterprise project"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-subtext text-base leading-relaxed">
              I&apos;m always open to discussing new opportunities, enterprise
              projects, or collaborations. Whether you have a question or just
              want to say hi, feel free to reach out.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-subtext uppercase tracking-wider mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {PROFILE.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-subtext uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-foreground">India · Open to Remote</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <AnimatePresence>
              {errMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  <AlertCircle size={16} />
                  {errMsg}
                </motion.div>
              )}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
                >
                  <CheckCircle size={16} />
                  {successMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm text-subtext mb-2 block">
                  Your name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="text-sm text-subtext mb-2 block"
                >
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-subtext mb-2 block">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="text-sm text-subtext mb-2 block"
              >
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Project inquiry"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-sm text-subtext mb-2 block"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
              />
            </div>

            <MagneticButton
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Sending..."
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
