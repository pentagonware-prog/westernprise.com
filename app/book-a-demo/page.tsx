"use client";

import { FormEvent, useRef, useState } from "react";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Footer } from "@/components/ui/footer";

type Status = "idle" | "sending" | "success" | "error";
const steps = ["Email", "About you", "Business", "Details"];

function TickIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7" /></svg>;
}

export default function BookDemoPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const moveForward = () => {
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
    const fields = Array.from(panel?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea") ?? []);
    if (fields.some((field) => !field.reportValidity())) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/demo-requests/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  };

  const heading = step === 0 ? "Start with your work email" : step === 1 ? "Tell us about you" : step === 2 ? "Tell us about your business" : "One last thing";
  const helper = step === 0 ? "So the right person on our team can get back to you." : step === 1 ? "We’ll use these details to arrange your session." : step === 2 ? "This helps us tailor the walkthrough to your needs." : "Tell us how you found Westernprise and what you would like to explore.";

  return <main className="demo-page">
    <section className="demo-split">
      <aside className="demo-story">
        <div className="demo-story-top">
          <a className="demo-logo" href="/" aria-label="Westernprise home"><img src="/westernprise-official-logo-white.png" alt="Westernprise" /></a>
          <div className="demo-rating"><div className="demo-rating-people"><i>FC</i><i>UI</i></div><span>★★★★★</span><b>Built for clearer operations</b></div>
          <h1>See Westernprise in action.</h1>
          <p className="demo-story-copy">A personalised walkthrough of the customers, inventory, documents and money workflows that matter to your business.</p>
          <ul className="demo-benefits">
            <li><i><TickIcon /></i><span><b>Tailored to your operation</b><small>We focus the session on your team, processes and priorities.</small></span></li>
            <li><i><TickIcon /></i><span><b>Practical product walkthrough</b><small>See connected workflows using realistic business scenarios.</small></span></li>
            <li><i><TickIcon /></i><span><b>Clear next steps</b><small>Leave knowing what setup and rollout could look like.</small></span></li>
          </ul>
        </div>
        <div className="demo-story-bottom">
          <p>One workspace for your business operations</p>
          <div><span>30 minutes</span><span>No obligation</span><span>Built around you</span></div>
        </div>
      </aside>

      <div className="demo-booking">
        <div className="demo-booking-bar">
          <a className="demo-mobile-logo" href="/" aria-label="Westernprise home"><img src="/westernprise-official-logo.png" alt="Westernprise" /></a>
          <a href="/">Back to website</a>
          <LanguageSelector />
          <button className="demo-menu" type="button" onClick={() => setMenu((open) => !open)} aria-label="Toggle navigation" aria-expanded={menu}><i/><i/><i/></button>
          <nav className={`demo-mobile-nav ${menu ? "open" : ""}`}>
            <a href="/#how" onClick={() => setMenu(false)}>How It Works</a>
            <a href="/#features" onClick={() => setMenu(false)}>Features</a>
            <a href="/#audience" onClick={() => setMenu(false)}>Who It’s For</a>
            <a href="/#faq" onClick={() => setMenu(false)}>FAQ</a>
            <a href="/book-a-demo" onClick={() => setMenu(false)}>Book a Demo</a>
          </nav>
        </div>

        <div className="demo-form-shell">
          {status === "success" ? <div className="demo-success">
            <i><TickIcon /></i><span>REQUEST RECEIVED</span><h2>We’ll be in touch shortly.</h2><p>Our team will review your request and contact you to arrange your personalised Westernprise demo.</p><a href="/">Return to the website</a>
          </div> : <>
            <div className="demo-form-heading"><span>BOOK A PERSONALISED DEMO</span><h2>{heading}</h2><p>{helper}</p></div>
            <form ref={formRef} onSubmit={submit}>
              <div className="demo-step" data-step="0" hidden={step !== 0}>
                <label><span>Work email</span><input name="workEmail" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
              </div>
              <div className="demo-step demo-step-grid" data-step="1" hidden={step !== 1}>
                <label><span>First name</span><input name="firstName" autoComplete="given-name" placeholder="First name" required /></label>
                <label><span>Last name</span><input name="lastName" autoComplete="family-name" placeholder="Last name" required /></label>
                <label className="wide"><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required /></label>
              </div>
              <div className="demo-step demo-step-grid" data-step="2" hidden={step !== 2}>
                <label className="wide"><span>Company name</span><input name="company" autoComplete="organization" placeholder="Company name" required /></label>
                <label><span>Your role</span><select name="role" required defaultValue=""><option value="" disabled>Select role</option><option>Business owner</option><option>Director</option><option>Operations</option><option>Sales or finance</option><option>Other</option></select></label>
                <label><span>Company size</span><select name="companySize" required defaultValue=""><option value="" disabled>Select size</option><option>1–10 people</option><option>11–50 people</option><option>51–200 people</option><option>201+ people</option></select></label>
              </div>
              <div className="demo-step demo-step-grid" data-step="3" hidden={step !== 3}>
                <label className="wide"><span>How did you hear about us?</span><select name="referralSource" defaultValue=""><option value="">Select an option</option><option>Search engine</option><option>Social media</option><option>Recommendation</option><option>Event or publication</option><option>Existing Westernprise customer</option><option>Other</option></select></label>
                <label className="wide"><span>What would you like us to focus on?</span><textarea name="notes" rows={4} placeholder="Tell us which processes or areas you want to improve." /></label>
              </div>
              <label className="demo-honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
              {status === "error" && <p className="demo-error" role="alert">{message}</p>}
              <div className="demo-form-actions">
                {step > 0 && <button className="demo-back" type="button" onClick={() => setStep((current) => current - 1)}>Back</button>}
                {step < steps.length - 1 ? <button className="demo-next" type="button" onClick={moveForward}>Continue <span>→</span></button> : <button className="demo-next" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Book my demo"}<span>→</span></button>}
              </div>
              <div className="demo-progress" aria-label={`Step ${step + 1} of ${steps.length}`}>{steps.map((label, index) => <span key={label} className={index <= step ? "active" : ""} />)}</div>
              <p className="demo-consent">By continuing, you agree that Westernprise may use your details to arrange and manage your demo request.</p>
            </form>
          </>}
        </div>
      </div>
    </section>
    <Footer logo={<img className="westernprise-footer-logo" src="/westernprise-official-logo-white.png" alt="Westernprise" />} brandName="Westernprise" socialLinks={[]} mainLinks={[{href:"/#how",label:"How It Works"},{href:"/#features",label:"Features"},{href:"/#audience",label:"Who It’s For"},{href:"/#faq",label:"FAQ"},{href:"/book-a-demo",label:"Book a Demo"}]} legalLinks={[{href:"/#",label:"Privacy Policy"},{href:"/#",label:"Terms"},{href:"/#",label:"Cookies"}]} copyright={{text:"© 2026 Westernprise",license:"All rights reserved"}} />
  </main>;
}
