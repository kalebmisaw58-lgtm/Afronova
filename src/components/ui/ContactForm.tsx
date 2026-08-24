"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
export interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface ContactFormProps {
  fields?: Field[];
  submitLabel?: string;
  successMessage?: string;
  className?: string;
  /** Which API endpoint to POST to. Defaults to /api/contact */
  endpoint?: "/api/contact" | string;
}

const defaultFields: Field[] = [
  { name: "name",    label: "Full Name",       placeholder: "Your full name",           required: true },
  { name: "email",   label: "Email Address",   type: "email", placeholder: "you@example.com", required: true },
  { name: "phone",   label: "Phone Number",    placeholder: "+251 9XX XXX XXX" },
  { name: "inquiry", label: "Inquiry Type",    options: [
    "General Inquiry", "Event Management", "Multimedia Production",
    "Advertising / Campaigns", "Africa Celebrates 2026",
    "Sponsorship", "Media / Press", "Other",
  ]},
  { name: "message", label: "Message",         type: "textarea",
    placeholder: "Tell us about your project or inquiry…", required: true },
];

export default function ContactForm({
  fields       = defaultFields,
  submitLabel  = "Send Message",
  successMessage = "Thank you! We'll be in touch shortly.",
  className    = "",
  endpoint     = "/api/contact",
}: ContactFormProps) {
  const [values,  setValues]  = useState<Record<string, string>>({});
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name]) setErrors((prev) => { const e = { ...prev }; delete e[name]; return e; });
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setApiError("");

    try {
      const res = await fetch(endpoint, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(values),
      });

      const json = await res.json();

      if (res.status === 422 && json.errors) {
        // Zod field-level validation errors
        setErrors(json.errors);
        return;
      }

      if (!res.ok || !json.success) {
        setApiError(
          json.error ?? "Something went wrong. Please try again or email us directly."
        );
        return;
      }

      setSubmitted(true);
      setValues({});
    } catch {
      setApiError(
        "Unable to reach the server. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ────────────────────────────────────────────
  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 py-12 text-center ${className}`}>
        <CheckCircle className="w-16 h-16" style={{ color: "#D6A34A" }} />
        <h3 className="text-xl font-display font-bold text-white">{successMessage}</h3>
        <p className="text-white/45 text-sm max-w-xs">
          Check your inbox — we&apos;ve sent you a confirmation email.
        </p>
        <button
          onClick={() => { setSubmitted(false); setValues({}); setErrors({}); setApiError(""); }}
          className="text-sm hover:underline mt-1 transition-colors"
          style={{ color: "#D6A34A" }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`} noValidate>

      {/* API-level error banner */}
      {apiError && (
        <div className="flex items-start gap-3 p-4 rounded-xl border"
             style={{ background: "rgba(154,106,49,0.12)", borderColor: "rgba(154,106,49,0.35)" }}>
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#C18A45" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#F0D49A" }}>{apiError}</p>
        </div>
      )}

      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
            {field.required && (
              <span className="ml-1" style={{ color: "#D6A34A" }}>*</span>
            )}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              rows={5}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="form-input resize-none"
              aria-describedby={errors[field.name] ? `${field.name}-err` : undefined}
              aria-invalid={!!errors[field.name]}
            />
          ) : field.options ? (
            <select
              id={field.name}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="form-input"
              aria-invalid={!!errors[field.name]}
            >
              <option value="">Select an option</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="form-input"
              aria-describedby={errors[field.name] ? `${field.name}-err` : undefined}
              aria-invalid={!!errors[field.name]}
            />
          )}

          {/* Field-level validation error */}
          {errors[field.name] && (
            <p id={`${field.name}-err`} role="alert"
               className="mt-1.5 text-xs flex items-center gap-1.5"
               style={{ color: "#C18A45" }}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center"
        style={loading ? { opacity: 0.65, cursor: "not-allowed" } : {}}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {submitLabel}
          </>
        )}
      </button>
    </form>
  );
}
