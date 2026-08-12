"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

interface ContactFormProps {
  formId: string;
}

export default function ContactForm({
  formId,
}: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom/v1/gravity-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId,
            fields: formData,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Something went wrong."
        );
      }

      setSuccess(true);
      setFormData({});
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="text"
        name="input_1.3"
        placeholder="Name"
        value={formData["input_1.3"] || ""}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        type="email"
        name="input_2"
        placeholder="Email"
        value={formData["input_2"] || ""}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="input_3"
        placeholder="Message"
        value={formData["input_3"] || ""}
        onChange={handleChange}
        required
        rows={6}
        className="w-full rounded-lg border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-md px-6 py-3 bg-[#0b97ab] text-white"
      >
        {loading
          ? "Sending..."
          : "Send Message"}
      </button>

      {success && (
        <p>
          Your message has been sent successfully.
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}
    </form>
  );
}