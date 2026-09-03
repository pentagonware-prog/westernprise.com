"use client";
import { useState } from "react";

const faqs=[
  ["What kind of business can use Westernprise?","Westernprise is built for structured day-to-day operations. Its first automotive use case supports detailed vehicle inventory, while the wider platform can be configured for other growing businesses."],
  ["How are payments and balances calculated?","Payments can be applied directly to invoices. Westernprise uses those records to calculate paid amounts and outstanding balances accurately."],
  ["Can confidential work stay separate?","Yes. The Confidential Workspace keeps sensitive customers, documents, payments, inventory and activity away from the General Area until an authorised user publishes them."],
  ["Can staff access be controlled?","Yes. Roles and permissions determine what each staff member can see or change, while the audit history records important actions and responsible users."],
  ["Can invoices and receipts be sent to customers?","Yes. Westernprise prepares printable PDFs and supports sending invoices and receipts to customers by email."],
] as const;

export function FaqSection(){const[active,setActive]=useState(0);return <section className="faq-section reveal-section" id="faq"><div className="faq-heading"><span>QUESTIONS, ANSWERED</span><h2>Everything you need to know.</h2><p>Clear answers without the long support page.</p></div><div className="faq-console"><div className="faq-tabs">{faqs.map((item,i)=><button className={active===i?"active":""} onClick={()=>setActive(i)} key={item[0]}><span>{String(i+1).padStart(2,"0")}</span>{item[0]}</button>)}</div><div className="faq-answer" aria-live="polite"><small>ANSWER {String(active+1).padStart(2,"0")}</small><h3>{faqs[active][0]}</h3><p>{faqs[active][1]}</p><a href="#cta">Need more help? Talk to our team.</a></div></div></section>}
