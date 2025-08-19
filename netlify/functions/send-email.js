// netlify/functions/send-email.js
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name = "", email = "", message = "", bot_field = "" } = body;

    // honeypot נגד בוטים
    if (bot_field) return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };

    const trim = (s) => String(s || "").trim();
    const nameClean = trim(name);
    const emailClean = trim(email).toLowerCase();
    const messageClean = trim(message);

    if (!nameClean || !emailClean || !messageClean) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "All fields are required." }) };
    }

    // אימות אימייל – רק אם תקין שולחים
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailClean)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid email address." }) };
    }

const sentAt = new Date().toLocaleString("he-IL", {
  timeZone: "Asia/Jerusalem",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
});

const serviceId   = process.env.EMAILJS_SERVICE_ID;
const templateId  = process.env.EMAILJS_TEMPLATE_ID;
const publicKey   = process.env.EMAILJS_PUBLIC_KEY;      // user_id
const accessToken = process.env.EMAILJS_ACCESS_TOKEN;    // Private Key

if (!serviceId || !templateId || !publicKey) {
  return { statusCode: 500, body: JSON.stringify({ error: "EmailJS env vars are missing." }) };
}

// התאמה לשמות השדות בטמפלט שלך: name / email / message / time
const payload = {
  service_id: serviceId,
  template_id: templateId,
  user_id: publicKey,
  template_params: {
    name: nameClean,
    email: emailClean,
    message: messageClean,
    time: sentAt
  }
};

const resp = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // אם הפעלת Private Key – שלח בהרשאת Bearer
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
  },
  // חלק מהתצורות של EmailJS גם מאפשרות להעביר accessToken בתוך הגוף:
  body: JSON.stringify(accessToken ? { ...payload, accessToken } : payload)
});

if (!resp.ok) {
  const text = await resp.text();
  console.error("EmailJS error:", resp.status, text);
  return { statusCode: 502, body: JSON.stringify({ error: "Failed to send email." }) };
}

return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error." }) };
  }
};