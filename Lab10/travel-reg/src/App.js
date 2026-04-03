import { useState, useEffect, useCallback } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const TEMP_DOMAINS = ["mailinator.com","tempmail.com","guerrillamail.com","throwaway.email","yopmail.com","trashmail.com","10minutemail.com","sharklasers.com","dispostable.com"];

const COUNTRIES = ["Afghanistan","Albania","Algeria","Argentina","Australia","Austria","Bangladesh","Belgium","Brazil","Canada","Chile","China","Colombia","Croatia","Czech Republic","Denmark","Egypt","Ethiopia","Finland","France","Germany","Ghana","Greece","Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan","Kenya","Malaysia","Mexico","Morocco","Netherlands","New Zealand","Nigeria","Norway","Pakistan","Peru","Philippines","Poland","Portugal","Romania","Russia","Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland","Thailand","Turkey","Ukraine","United Arab Emirates","United Kingdom","United States","Vietnam"];

const STATES_BY_COUNTRY = {
  "United States": ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
  "India": ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"],
  "Canada": ["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"],
  "Australia": ["Australian Capital Territory","New South Wales","Northern Territory","Queensland","South Australia","Tasmania","Victoria","Western Australia"],
  "United Kingdom": ["England","Northern Ireland","Scotland","Wales"],
  "Germany": ["Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg","Hesse","Lower Saxony","Mecklenburg-Vorpommern","North Rhine-Westphalia","Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia"],
  "Pakistan": ["Azad Kashmir","Balochistan","Gilgit-Baltistan","Islamabad Capital Territory","Khyber Pakhtunkhwa","Punjab","Sindh"],
};

const PHONE_FORMATS = {
  "United States": "+1 (XXX) XXX-XXXX",
  "United Kingdom": "+44 XXXX XXXXXX",
  "India": "+91 XXXXX XXXXX",
  "Pakistan": "+92 XXX XXXXXXX",
  "Germany": "+49 XXX XXXXXXXX",
  "Australia": "+61 X XXXX XXXX",
  "Canada": "+1 (XXX) XXX-XXXX",
  "France": "+33 X XX XX XX XX",
  "China": "+86 XXX XXXX XXXX",
  "Japan": "+81 XX XXXX XXXX",
};

const POSTAL_PATTERNS = {
  "United States": /^\d{5}(-\d{4})?$/,
  "Canada": /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
  "United Kingdom": /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
  "India": /^\d{6}$/,
  "Pakistan": /^\d{5}$/,
  "Germany": /^\d{5}$/,
  "Australia": /^\d{4}$/,
};

const PROFESSIONS = ["Accountant","Architect","Artist","Chef","Doctor","Engineer","Entrepreneur","Journalist","Lawyer","Nurse","Pilot","Professor","Scientist","Student","Teacher","Other"];

const LANGUAGES = ["Arabic","Bengali","Chinese","Dutch","English","French","German","Greek","Hebrew","Hindi","Indonesian","Italian","Japanese","Korean","Malay","Mandarin","Persian","Polish","Portuguese","Russian","Spanish","Swahili","Swedish","Thai","Turkish","Urdu","Vietnamese"];

const TAKEN_USERNAMES = ["admin","user","traveler","john_doe","jane_doe","test","root","superuser"];

const NOTIFICATION_OPTIONS = ["Flight updates","Visa updates","Promotional offers"];

const STEP_LABELS = ["Identity","Contact","Background","Account"];

const INITIAL_FORM = {
  // Step 1
  firstName: "", lastName: "", email: "", dob: "", photoName: "", photoSize: 0,
  // Step 2
  phone: "", phone2: "", address1: "", address2: "", city: "", state: "", postalCode: "", country: "",
  // Step 3
  profession: "", otherProfession: "", experience: "", linkedin: "", website: "",
  // Step 4
  username: "", password: "", confirmPassword: "", notifications: [], terms: false, privacy: false,
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep1(form, photoUploaded) {
  const errors = {};
  if (!form.firstName) errors.firstName = "First name is required.";
  else if (form.firstName.length < 2) errors.firstName = "Minimum 2 characters required.";
  else if (form.firstName.length > 50) errors.firstName = "Maximum 50 characters allowed.";
  else if (/[^A-Za-z]/.test(form.firstName)) errors.firstName = "No numbers or special characters allowed.";

  if (!form.lastName) errors.lastName = "Last name is required.";
  else if (form.lastName.length < 2) errors.lastName = "Minimum 2 characters required.";
  else if (form.lastName.length > 50) errors.lastName = "Maximum 50 characters allowed.";
  else if (/[^A-Za-z]/.test(form.lastName)) errors.lastName = "No numbers or special characters allowed.";

  if (!form.email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  else if (TEMP_DOMAINS.some(d => form.email.toLowerCase().endsWith("@" + d))) errors.email = "Temporary email domains are not allowed.";

  if (!form.dob) errors.dob = "Date of birth is required.";
  else {
    const dob = new Date(form.dob);
    const today = new Date();
    if (dob > today) errors.dob = "Date of birth cannot be in the future.";
    else {
      const age = today.getFullYear() - dob.getFullYear() - (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
      if (age < 18) errors.dob = "You must be at least 18 years old.";
    }
  }

  if (!photoUploaded && !form.photoName) errors.photo = "Passport photo is required.";

  return errors;
}

function validateStep2(form) {
  const errors = {};
  if (!form.phone) errors.phone = "Emergency contact number is required.";
  else if (!/^\+?[\d\s\-().]{7,20}$/.test(form.phone)) errors.phone = "Enter a valid phone number (e.g. +1 555 123 4567).";

  if (form.phone2 && !/^\+?[\d\s\-().]{7,20}$/.test(form.phone2)) errors.phone2 = "Enter a valid secondary phone number.";

  if (!form.address1) errors.address1 = "Address line 1 is required.";
  else if (form.address1.trim().length < 5) errors.address1 = "Address must be at least 5 characters.";

  if (!form.city) errors.city = "City is required.";
  else if (/\d/.test(form.city)) errors.city = "City name cannot contain numeric values.";

  if (!form.country) errors.country = "Please select a country.";

  if (!form.state) errors.state = "State/Province is required.";

  if (!form.postalCode) errors.postalCode = "Postal code is required.";
  else if (form.country && POSTAL_PATTERNS[form.country] && !POSTAL_PATTERNS[form.country].test(form.postalCode)) {
    errors.postalCode = `Invalid postal code format for ${form.country}.`;
  }

  return errors;
}

function validateStep3(form, languages) {
  const errors = {};
  if (!form.profession) errors.profession = "Please select a profession.";
  if (form.profession === "Other" && !form.otherProfession.trim()) errors.otherProfession = "Please specify your profession.";

  const exp = form.experience;
  if (exp === "" || exp === null || exp === undefined) errors.experience = "Travel experience is required.";
  else if (isNaN(Number(exp)) || Number(exp) < 0) errors.experience = "Must be a non-negative number.";
  else if (form.dob) {
    const birthYear = new Date(form.dob).getFullYear();
    const maxExp = new Date().getFullYear() - birthYear - 18;
    if (Number(exp) > maxExp) errors.experience = `Cannot exceed ${Math.max(0, maxExp)} years (current year − birth year − 18).`;
  }

  if (languages.length < 2) errors.languages = "Please add at least 2 languages.";
  else if (languages.length > 10) errors.languages = "Maximum 10 languages allowed.";

  if (form.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(form.linkedin)) errors.linkedin = "Must be a valid LinkedIn URL (e.g. https://linkedin.com/in/yourname).";

  if (form.website && !/^https?:\/\/.+\..+/.test(form.website)) errors.website = "Must be a valid URL starting with http:// or https://.";

  return errors;
}

function validateStep4(form) {
  const errors = {};
  if (!form.username) errors.username = "Username is required.";
  else if (form.username.length < 5) errors.username = "Username must be at least 5 characters.";
  else if (form.username.length > 20) errors.username = "Username must be at most 20 characters.";
  else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) errors.username = "Only letters, numbers, and underscores allowed.";
  else if (TAKEN_USERNAMES.includes(form.username.toLowerCase())) errors.username = "This username is already taken. Try another.";

  if (!form.password) errors.password = "Password is required.";
  else if (form.password.length < 8) errors.password = "Minimum 8 characters required.";
  else if (!/[A-Z]/.test(form.password)) errors.password = "Must include at least one uppercase letter.";
  else if (!/[a-z]/.test(form.password)) errors.password = "Must include at least one lowercase letter.";
  else if (!/[0-9]/.test(form.password)) errors.password = "Must include at least one number.";
  else if (!/[^A-Za-z0-9]/.test(form.password)) errors.password = "Must include at least one special character (!@#$...).";

  if (!form.confirmPassword) errors.confirmPassword = "Please confirm your password.";
  else if (form.confirmPassword !== form.password) errors.confirmPassword = "Passwords do not match.";

  if (!form.terms) errors.terms = "You must accept the Terms of Service to continue.";
  if (!form.privacy) errors.privacy = "You must accept the Data Privacy Consent to continue.";

  return errors;
}

function validateCurrentStep(step, form, languages, photoUploaded) {
  if (step === 1) return validateStep1(form, photoUploaded);
  if (step === 2) return validateStep2(form);
  if (step === 3) return validateStep3(form, languages);
  if (step === 4) return validateStep4(form);
  return {};
}

// ─── Progress Calculation ─────────────────────────────────────────────────────

function calcProgress(form, languages, photoUploaded, step) {
  // Step-based: each step = 25%, then bonus for filled fields within current step
  const stepBase = (step - 1) * 25;
  let fieldScore = 0;
  let fieldTotal = 0;

  if (step === 1) {
    fieldTotal = 5;
    if (/^[A-Za-z]{2,50}$/.test(form.firstName)) fieldScore++;
    if (/^[A-Za-z]{2,50}$/.test(form.lastName)) fieldScore++;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && !TEMP_DOMAINS.some(d => form.email.toLowerCase().endsWith("@" + d))) fieldScore++;
    if (form.dob && new Date(form.dob) <= new Date()) fieldScore++;
    if (photoUploaded || form.photoName) fieldScore++;
  } else if (step === 2) {
    fieldTotal = 6;
    if (/^\+?[\d\s\-().]{7,20}$/.test(form.phone)) fieldScore++;
    if (form.address1 && form.address1.trim().length >= 5) fieldScore++;
    if (form.city && !/\d/.test(form.city)) fieldScore++;
    if (form.country) fieldScore++;
    if (form.state) fieldScore++;
    if (form.postalCode) fieldScore++;
  } else if (step === 3) {
    fieldTotal = 3;
    if (form.profession) fieldScore++;
    if (form.experience !== "" && Number(form.experience) >= 0) fieldScore++;
    if (languages.length >= 2) fieldScore++;
  } else if (step === 4) {
    fieldTotal = 5;
    if (/^[a-zA-Z0-9_]{5,20}$/.test(form.username) && !TAKEN_USERNAMES.includes(form.username.toLowerCase())) fieldScore++;
    if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(form.password)) fieldScore++;
    if (form.confirmPassword && form.confirmPassword === form.password) fieldScore++;
    if (form.terms) fieldScore++;
    if (form.privacy) fieldScore++;
  }

  const fieldPercent = fieldTotal > 0 ? (fieldScore / fieldTotal) * 25 : 0;
  return Math.min(100, Math.round(stepBase + fieldPercent));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({ label, required, optional, error, hint, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, letterSpacing: "0.4px", textTransform: "uppercase" }}>
        {label}
        {required && <span style={{ color: "#dc2626", marginLeft: 3 }}>*</span>}
        {optional && <span style={{ color: "#9ca3af", fontWeight: 400, fontSize: 11, marginLeft: 5 }}>(optional)</span>}
      </label>
      {children}
      {hint && !error && <p style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{hint}</p>}
      {error && <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>⚠ {error}</p>}
    </div>
  );
}

const inputStyle = (hasError, hasValue) => ({
  width: "100%",
  padding: "10px 14px",
  border: `1.5px solid ${hasError ? "#dc2626" : hasValue ? "#10b981" : "#d1d5db"}`,
  borderRadius: 8,
  fontSize: 14,
  color: "#111827",
  background: "#fff",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
  fontFamily: "inherit",
});

function TextInput({ name, value, onChange, placeholder, type = "text", error, min, max, style: extraStyle = {} }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle(!!error, !!value),
        boxShadow: focused ? `0 0 0 3px ${error ? "rgba(220,38,38,0.15)" : "rgba(59,130,246,0.15)"}` : "none",
        ...extraStyle,
      }}
    />
  );
}

function SelectInput({ name, value, onChange, options, placeholder, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle(!!error, !!value),
        boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: 36,
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Notification({ message, type, onClose }) {
  if (!message) return null;
  const colors = {
    success: { bg: "#ecfdf5", border: "#6ee7b7", text: "#065f46", icon: "✓" },
    error: { bg: "#fef2f2", border: "#fca5a5", text: "#991b1b", icon: "✕" },
    info: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", icon: "ℹ" },
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", animation: "slideDown 0.3s ease" }}>
      <span style={{ fontSize: 13, color: c.text, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 700 }}>{c.icon}</span> {message}
      </span>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: c.text, fontSize: 16, lineHeight: 1, padding: "0 0 0 8px" }}>×</button>
    </div>
  );
}

function ProgressBar({ percent }) {
  const color = percent <= 25 ? "#ef4444" : percent <= 50 ? "#eab308" : percent <= 75 ? "#3b82f6" : "#22c55e";
  const label = percent <= 25 ? "Just started" : percent <= 50 ? "Halfway there" : percent <= 75 ? "Almost done" : "Ready to submit!";
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Journey Completion</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{percent}% — {label}</span>
      </div>
      <div style={{ height: 8, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${percent}%`, background: color, borderRadius: 99, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.5s ease" }} />
      </div>
    </div>
  );
}

function StepIndicator({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, gap: 0 }}>
      {STEP_LABELS.map((label, i) => {
        const idx = i + 1;
        const isDone = idx < step;
        const isActive = idx === step;
        return (
          <div key={idx} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: isDone ? "#10b981" : isActive ? "#1d4ed8" : "#e5e7eb",
                color: isDone || isActive ? "#fff" : "#9ca3af",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
                border: isActive ? "2px solid #93c5fd" : "2px solid transparent",
                transition: "all 0.3s ease",
                boxShadow: isActive ? "0 0 0 4px rgba(59,130,246,0.2)" : "none",
              }}>
                {isDone ? "✓" : idx}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: isActive ? "#1d4ed8" : isDone ? "#10b981" : "#9ca3af", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {label}
              </span>
            </div>
            {i < 3 && (
              <div style={{ width: 48, height: 2, background: isDone ? "#10b981" : "#e5e7eb", margin: "0 4px", marginBottom: 16, transition: "background 0.4s ease" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 14, padding: 28, maxWidth: 360, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", animation: "popIn 0.25s ease" }}>
        <div style={{ fontSize: 32, textAlign: "center", marginBottom: 12 }}>⚠️</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", textAlign: "center", marginBottom: 8 }}>Are you sure?</h3>
        <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>{message}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "1.5px solid #d1d5db", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", background: "#dc2626", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, borderRadius: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTop: "3px solid #1d4ed8", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>Processing...</span>
      </div>
    </div>
  );
}

function SuccessScreen({ form, onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <div style={{ fontSize: 64, marginBottom: 16, animation: "popIn 0.5s ease" }}>✈️</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Registration Complete!</h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, lineHeight: 1.7 }}>
        Welcome aboard, <strong>{form.firstName} {form.lastName}</strong>!<br />
        Your travel profile has been registered successfully.<br />
        A confirmation has been sent to <strong>{form.email}</strong>.
      </p>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Registration Summary</p>
        {[
          ["Username", form.username],
          ["Country", form.country],
          ["Profession", form.profession === "Other" ? form.otherProfession : form.profession],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#374151", paddingBottom: 6, borderBottom: "1px solid #d1fae5", marginBottom: 6 }}>
            <span style={{ color: "#6b7280" }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onReset} style={{ padding: "12px 32px", borderRadius: 8, border: "none", background: "#1d4ed8", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Register Another Traveler
      </button>
    </div>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1({ form, errors, onChange, photoUploaded, setPhotoUploaded, setNotif, photoFileName, setPhotoFileName }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setNotif({ message: "Only JPG, JPEG, PNG files are allowed.", type: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setNotif({ message: "File size exceeds 5MB limit.", type: "error" });
      return;
    }
    setPhotoUploaded(true);
    setPhotoFileName(file.name);
    onChange({ target: { name: "photoName", value: file.name } });
    onChange({ target: { name: "photoSize", value: file.size } });
    setNotif({ message: "Passport photo uploaded successfully.", type: "success" });
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormField label="First Name" required error={errors.firstName}>
          <TextInput name="firstName" value={form.firstName} onChange={onChange} placeholder="e.g. Sarah" error={errors.firstName} />
        </FormField>
        <FormField label="Last Name" required error={errors.lastName}>
          <TextInput name="lastName" value={form.lastName} onChange={onChange} placeholder="e.g. Johnson" error={errors.lastName} />
        </FormField>
      </div>
      <FormField label="Contact Email" required error={errors.email} hint="Temporary email domains are not accepted.">
        <TextInput name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" error={errors.email} />
      </FormField>
      <FormField label="Date of Birth" required error={errors.dob} hint="You must be at least 18 years old.">
        <TextInput name="dob" type="date" value={form.dob} onChange={onChange} max={new Date().toISOString().split("T")[0]} error={errors.dob} />
      </FormField>
      <FormField label="Passport Photo" required error={errors.photo}>
        <label style={{ display: "block", border: `2px dashed ${errors.photo ? "#dc2626" : photoUploaded ? "#10b981" : "#d1d5db"}`, borderRadius: 10, padding: "20px 16px", textAlign: "center", cursor: "pointer", background: photoUploaded ? "#f0fdf4" : "#f9fafb", transition: "all 0.2s" }}>
          <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFile} style={{ display: "none" }} />
          <div style={{ fontSize: 28, marginBottom: 6 }}>{photoUploaded ? "✅" : "📷"}</div>
          <p style={{ fontSize: 13, color: photoUploaded ? "#065f46" : "#6b7280", fontWeight: photoUploaded ? 600 : 400 }}>
            {photoUploaded ? photoFileName : "Click to upload passport photo"}
          </p>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>JPG, JPEG, PNG · Max 5MB</p>
        </label>
      </FormField>
    </div>
  );
}

function Step2({ form, errors, onChange }) {
  const countryStates = STATES_BY_COUNTRY[form.country] || [];
  const phoneFormat = PHONE_FORMATS[form.country] || "+XX XXX XXXXXXX";
  return (
    <div>
      <FormField label="Emergency Contact Number" required error={errors.phone} hint={`Format for ${form.country || "selected country"}: ${phoneFormat}`}>
        <TextInput name="phone" type="tel" value={form.phone} onChange={onChange} placeholder={phoneFormat} error={errors.phone} />
      </FormField>
      <FormField label="Secondary Contact Number" optional error={errors.phone2}>
        <TextInput name="phone2" type="tel" value={form.phone2} onChange={onChange} placeholder={phoneFormat} error={errors.phone2} />
      </FormField>
      <FormField label="Residential Address Line 1" required error={errors.address1}>
        <TextInput name="address1" value={form.address1} onChange={onChange} placeholder="e.g. 123 Main Street" error={errors.address1} />
      </FormField>
      <FormField label="Address Line 2" optional>
        <TextInput name="address2" value={form.address2} onChange={onChange} placeholder="Apartment, suite, unit..." />
      </FormField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormField label="City" required error={errors.city}>
          <TextInput name="city" value={form.city} onChange={onChange} placeholder="e.g. New York" error={errors.city} />
        </FormField>
        <FormField label="Postal Code" required error={errors.postalCode}>
          <TextInput name="postalCode" value={form.postalCode} onChange={onChange} placeholder="e.g. 10001" error={errors.postalCode} />
        </FormField>
      </div>
      <FormField label="Country" required error={errors.country}>
        <SelectInput name="country" value={form.country} onChange={onChange} options={COUNTRIES} placeholder="Select country" error={errors.country} />
      </FormField>
      <FormField label="State / Province" required error={errors.state}>
        {countryStates.length > 0
          ? <SelectInput name="state" value={form.state} onChange={onChange} options={countryStates} placeholder="Select state/province" error={errors.state} />
          : <TextInput name="state" value={form.state} onChange={onChange} placeholder="Enter state/province" error={errors.state} />
        }
      </FormField>
    </div>
  );
}

function Step3({ form, errors, onChange, languages, setLanguages }) {
  const [langInput, setLangInput] = useState("");
  const suggestions = LANGUAGES.filter(l => !languages.includes(l) && l.toLowerCase().startsWith(langInput.toLowerCase()));

  const addLanguage = (lang) => {
    const val = lang || langInput.trim();
    if (!val) return;
    if (languages.includes(val)) return;
    if (languages.length >= 10) return;
    setLanguages(prev => [...prev, val]);
    setLangInput("");
  };

  const removeLanguage = (lang) => setLanguages(prev => prev.filter(l => l !== lang));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addLanguage(); }
  };

  const maxExp = form.dob ? Math.max(0, new Date().getFullYear() - new Date(form.dob).getFullYear() - 18) : 99;

  return (
    <div>
      <FormField label="Profession" required error={errors.profession}>
        <SelectInput name="profession" value={form.profession} onChange={onChange} options={PROFESSIONS} placeholder="Select profession" error={errors.profession} />
      </FormField>
      {form.profession === "Other" && (
        <FormField label="Specify Profession" required error={errors.otherProfession}>
          <TextInput name="otherProfession" value={form.otherProfession} onChange={onChange} placeholder="Enter your profession" error={errors.otherProfession} />
        </FormField>
      )}
      <FormField label="International Travel Experience (years)" required error={errors.experience} hint={`Must be 0 to ${maxExp} (current year − birth year − 18).`}>
        <TextInput name="experience" type="number" value={form.experience} onChange={onChange} placeholder="0" min="0" max={String(maxExp)} error={errors.experience} />
      </FormField>
      <FormField label="Languages Known" required error={errors.languages} hint="Type and press Enter or click a suggestion. Min 2, max 10.">
        <div style={{ border: `1.5px solid ${errors.languages ? "#dc2626" : languages.length >= 2 ? "#10b981" : "#d1d5db"}`, borderRadius: 8, padding: "8px 10px", background: "#fff", minHeight: 44 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: languages.length > 0 ? 8 : 0 }}>
            {languages.map(lang => (
              <span key={lang} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#dbeafe", color: "#1e40af", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>
                {lang}
                <button onClick={() => removeLanguage(lang)} style={{ background: "none", border: "none", color: "#1e40af", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
              </span>
            ))}
          </div>
          {languages.length < 10 && (
            <input
              value={langInput}
              onChange={e => setLangInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={languages.length === 0 ? "Type a language and press Enter..." : "Add more..."}
              style={{ border: "none", outline: "none", fontSize: 13, color: "#111827", width: "100%", background: "transparent", fontFamily: "inherit" }}
            />
          )}
          {langInput && suggestions.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8, borderTop: "1px solid #e5e7eb", paddingTop: 8 }}>
              {suggestions.slice(0, 8).map(s => (
                <button key={s} onClick={() => addLanguage(s)} style={{ fontSize: 12, padding: "2px 10px", borderRadius: 99, border: "1px solid #d1d5db", background: "#f3f4f6", color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>{s}</button>
              ))}
            </div>
          )}
        </div>
        <p style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{languages.length}/10 languages added</p>
      </FormField>
      <FormField label="LinkedIn Profile URL" optional error={errors.linkedin} hint="e.g. https://linkedin.com/in/yourname">
        <TextInput name="linkedin" value={form.linkedin} onChange={onChange} placeholder="https://linkedin.com/in/yourname" error={errors.linkedin} />
      </FormField>
      <FormField label="Travel Blog / Personal Website" optional error={errors.website} hint="Must start with http:// or https://">
        <TextInput name="website" value={form.website} onChange={onChange} placeholder="https://yourblog.com" error={errors.website} />
      </FormField>
    </div>
  );
}

function Step4({ form, errors, onChange }) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const pwStrength = () => {
    const pw = form.password;
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strength = pwStrength();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#eab308", "#3b82f6", "#22c55e"][strength];

  const toggleNotif = (opt) => {
    const current = form.notifications || [];
    const updated = current.includes(opt) ? current.filter(n => n !== opt) : [...current, opt];
    onChange({ target: { name: "notifications", value: updated } });
  };

  return (
    <div>
      <FormField label="Portal Username" required error={errors.username} hint="5–20 characters. Letters, numbers, and underscores only.">
        <TextInput name="username" value={form.username} onChange={onChange} placeholder="e.g. sarah_travels" error={errors.username} />
      </FormField>
      <FormField label="Password" required error={errors.password} hint="Min 8 chars with uppercase, lowercase, number, and special character.">
        <div style={{ position: "relative" }}>
          <TextInput name="password" type={showPw ? "text" : "password"} value={form.password} onChange={onChange} placeholder="Create a strong password" error={errors.password} style={{ paddingRight: 60 }} />
          <button onClick={() => setShowPw(p => !p)} type="button" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#6b7280", fontFamily: "inherit", fontWeight: 600 }}>
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        {form.password && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= strength ? strengthColor : "#e5e7eb", transition: "background 0.3s" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: strengthColor, fontWeight: 600 }}>{strengthLabel}</span>
          </div>
        )}
      </FormField>
      <FormField label="Confirm Password" required error={errors.confirmPassword}>
        <div style={{ position: "relative" }}>
          <TextInput name="confirmPassword" type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={onChange} placeholder="Repeat your password" error={errors.confirmPassword} style={{ paddingRight: 60 }} />
          <button onClick={() => setShowConfirm(p => !p)} type="button" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#6b7280", fontFamily: "inherit", fontWeight: 600 }}>
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>
      </FormField>
      <FormField label="Travel Notification Preferences" optional>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {NOTIFICATION_OPTIONS.map(opt => {
            const checked = (form.notifications || []).includes(opt);
            return (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1.5px solid ${checked ? "#3b82f6" : "#e5e7eb"}`, borderRadius: 8, cursor: "pointer", background: checked ? "#eff6ff" : "#fff", transition: "all 0.2s" }}>
                <input type="checkbox" checked={checked} onChange={() => toggleNotif(opt)} style={{ accentColor: "#3b82f6", width: 16, height: 16 }} />
                <span style={{ fontSize: 13, color: "#374151", fontWeight: checked ? 600 : 400 }}>{opt}</span>
              </label>
            );
          })}
        </div>
      </FormField>
      <div style={{ marginTop: 4 }}>
        <FormField label="Travel Terms Agreement" required error={errors.terms}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", border: `1.5px solid ${errors.terms ? "#dc2626" : form.terms ? "#10b981" : "#e5e7eb"}`, borderRadius: 8, cursor: "pointer", background: form.terms ? "#f0fdf4" : "#fff", transition: "all 0.2s" }}>
            <input type="checkbox" name="terms" checked={!!form.terms} onChange={onChange} style={{ accentColor: "#10b981", width: 16, height: 16, marginTop: 2 }} />
            <span style={{ fontSize: 13, color: "#374151" }}>I agree to the <strong>Travel Terms of Service</strong> and understand all obligations.</span>
          </label>
        </FormField>
        <FormField label="Data Privacy Consent" required error={errors.privacy}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", border: `1.5px solid ${errors.privacy ? "#dc2626" : form.privacy ? "#10b981" : "#e5e7eb"}`, borderRadius: 8, cursor: "pointer", background: form.privacy ? "#f0fdf4" : "#fff", transition: "all 0.2s" }}>
            <input type="checkbox" name="privacy" checked={!!form.privacy} onChange={onChange} style={{ accentColor: "#10b981", width: 16, height: 16, marginTop: 2 }} />
            <span style={{ fontSize: 13, color: "#374151" }}>I consent to the collection and processing of my data per the <strong>Privacy Policy</strong>.</span>
          </label>
        </FormField>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("travel_reg_v1");
      if (saved) { const p = JSON.parse(saved); return { ...INITIAL_FORM, ...p.form }; }
    } catch (e) {}
    return { ...INITIAL_FORM };
  });
  const [languages, setLanguages] = useState(() => {
    try { const s = localStorage.getItem("travel_reg_v1"); if (s) return JSON.parse(s).languages || []; } catch (e) {} return [];
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [photoFileName, setPhotoFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Restore photo name from saved
  useEffect(() => {
    if (form.photoName) setPhotoFileName(form.photoName);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem("travel_reg_v1", JSON.stringify({ form, languages })); } catch (e) {}
  }, [form, languages]);

  // Real-time validation
  useEffect(() => {
    const e = validateCurrentStep(step, form, languages, photoUploaded);
    setErrors(e);
  }, [form, languages, step, photoUploaded]);

  const progress = calcProgress(form, languages, photoUploaded, step);
  const isStepValid = Object.keys(errors).length === 0;

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }, []);

  const goNext = () => {
    const e = validateCurrentStep(step, form, languages, photoUploaded);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setShowErrors(true);
      setNotif({ message: "Please fix the errors before continuing.", type: "error" });
      return;
    }
    setShowErrors(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(s => s + 1);
      setNotif({ message: `Step ${step} completed! Moving to ${STEP_LABELS[step]}.`, type: "success" });
    }, 600);
  };

  const goBack = () => {
    setShowErrors(false);
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    const e = validateCurrentStep(4, form, languages, photoUploaded);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setShowErrors(true);
      setNotif({ message: "Please fix all errors before submitting.", type: "error" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      localStorage.removeItem("travel_reg_v1");
    }, 1200);
  };

  const handleClear = () => {
    setDialog({
      message: "This will clear all entered data and reset the form. This action cannot be undone.",
      onConfirm: () => {
        setForm({ ...INITIAL_FORM });
        setLanguages([]);
        setStep(1);
        setErrors({});
        setShowErrors(false);
        setPhotoUploaded(false);
        setPhotoFileName("");
        setDialog(null);
        localStorage.removeItem("travel_reg_v1");
        setNotif({ message: "Form cleared successfully.", type: "info" });
      },
    });
  };

  const handleReset = () => {
    setForm({ ...INITIAL_FORM });
    setLanguages([]);
    setStep(1);
    setErrors({});
    setShowErrors(false);
    setPhotoUploaded(false);
    setPhotoFileName("");
    setSubmitted(false);
  };

  const errorList = Object.values(errors);

  const stepTitles = ["Traveler Identity Details", "Travel Contact & Origin Details", "Travel Background Information", "Travel Account Setup"];
  const stepIcons = ["🪪", "📍", "🌍", "🔐"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0c2340 100%); min-height: 100vh; font-family: 'Outfit', sans-serif; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
        input[type="number"]::-webkit-inner-spin-button { opacity: 1; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f5f9; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
      `}</style>

      <div style={{ minHeight: "100vh", padding: "24px 16px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 580, animation: "fadeIn 0.4s ease" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
              ✈️ Travel Registration
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
              Complete your international travel profile in 4 steps
            </p>
          </div>

          {/* Main Card */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px 28px 24px", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>

            {loading && <LoadingOverlay />}
            {dialog && <ConfirmDialog message={dialog.message} onConfirm={dialog.onConfirm} onCancel={() => setDialog(null)} />}

            {submitted ? (
              <SuccessScreen form={form} onReset={handleReset} />
            ) : (
              <>
                <StepIndicator step={step} />
                <ProgressBar percent={progress} />

                {notif && (
                  <Notification message={notif.message} type={notif.type} onClose={() => setNotif(null)} />
                )}

                {/* Error Summary */}
                {showErrors && errorList.length > 0 && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "12px 14px", marginBottom: 16, animation: "slideDown 0.3s ease" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#991b1b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                      ⚠ {errorList.length} error{errorList.length > 1 ? "s" : ""} found
                    </p>
                    <ul style={{ paddingLeft: 16 }}>
                      {errorList.map((e, i) => (
                        <li key={i} style={{ fontSize: 12, color: "#dc2626", marginBottom: 3 }}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Step Title */}
                <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{stepIcons[step - 1]}</span> {stepTitles[step - 1]}
                  </h2>
                  <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>Step {step} of 4</p>
                </div>

                {/* Steps */}
                <div style={{ maxHeight: "55vh", overflowY: "auto", paddingRight: 4 }}>
                  {step === 1 && <Step1 form={form} errors={errors} onChange={handleChange} photoUploaded={photoUploaded} setPhotoUploaded={setPhotoUploaded} setNotif={setNotif} photoFileName={photoFileName} setPhotoFileName={setPhotoFileName} />}
                  {step === 2 && <Step2 form={form} errors={errors} onChange={handleChange} />}
                  {step === 3 && <Step3 form={form} errors={errors} onChange={handleChange} languages={languages} setLanguages={setLanguages} />}
                  {step === 4 && <Step4 form={form} errors={errors} onChange={handleChange} />}
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, paddingTop: 16, borderTop: "1px solid #f3f4f6" }}>
                  <button onClick={handleClear} style={{ padding: "9px 14px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#9ca3af", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, whiteSpace: "nowrap" }}>
                    Clear
                  </button>
                  {step > 1 && (
                    <button onClick={goBack} style={{ padding: "10px 20px", borderRadius: 8, border: "1.5px solid #d1d5db", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={step === 4 ? handleSubmit : goNext}
                    disabled={!isStepValid}
                    style={{
                      flex: 1, padding: "11px 20px", borderRadius: 8, border: "none",
                      background: !isStepValid ? "#e5e7eb" : step === 4 ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                      color: !isStepValid ? "#9ca3af" : "#fff",
                      fontSize: 14, fontWeight: 700, cursor: !isStepValid ? "not-allowed" : "pointer",
                      fontFamily: "inherit", transition: "all 0.2s",
                      boxShadow: isStepValid ? "0 4px 14px rgba(29,78,216,0.3)" : "none",
                    }}
                  >
                    {step === 4 ? "🚀 Submit Registration" : `Continue to ${STEP_LABELS[step]} →`}
                  </button>
                </div>

                {/* LocalStorage note */}
                <p style={{ fontSize: 11, color: "#d1d5db", textAlign: "center", marginTop: 12 }}>
                  💾 Progress auto-saved · Restored on page reload
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}