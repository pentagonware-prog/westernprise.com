"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AudienceSpotlight, MidPageCta, StatsSection, TrustedCompanies } from "@/components/ui/feature-sections";
import { FaqSection } from "@/components/ui/faq-section";
import { Chatbot } from "@/components/ui/chatbot";
import { Footer } from "@/components/ui/footer";
import { Boxes } from "@/components/ui/background-boxes";
import { LanguageSelector } from "@/components/ui/language-selector";

const audiences = [
  ["Business owners", "See performance, outstanding money and what needs attention"],
  ["Operations teams", "Keep customers, stock, expenses and daily work organised"],
  ["Sales & finance teams", "Track enquiries, documents, payments and balances"],
];

const capabilities = [
  ["Customer Management", "Keep customer profiles, contact details, ownership and linked business history together and easy to search.", "lime"],
  ["Inventory Management", "Manage products, stock, equipment and business assets with clear categories, availability, costs and status.", "lilac"],
  ["Invoices", "Create itemised, inventory-linked invoices with tax, account details, signatures, seals and preserved issued versions.", "cyan"],
  ["Receipts", "Issue professional proof of payment for full or partial payments, complete with signatures, seals and printing.", "lime"],
  ["Payments & Balances", "Record money received, apply it to invoices and calculate paid amounts and outstanding balances accurately.", "lilac"],
  ["Expenses", "Keep one expense register and link costs to inventory so the same records feed dashboards and reports.", "cyan"],
  ["Enquiries", "Track website, telephone and walk-in enquiries with priority, ownership, follow-up and conversion status.", "lime"],
  ["Operational Dashboard", "See payments, balances, inventory, urgent enquiries, expenses, work queues, trends and recent activity.", "lilac"],
  ["Reports & Exports", "Review filtered tables for invoices, receipts, payments, expenses, inventory and enquiries before export.", "cyan"],
  ["Staff Access", "Create staff accounts and control what each person can see or change with roles and permissions.", "lime"],
  ["Audit History", "Record important actions, responsible users, affected records, dates, details and source addresses.", "lilac"],
  ["Business Settings", "Manage organisation information, branding, bank accounts, individual signatures and the company seal.", "cyan"],
  ["Document Delivery", "Prepare printable PDFs and send invoices and receipts directly to customers by email.", "lime"],
];

const companyLogos = [
  ["/logos/ultra-intero.png", "Ultra Intero"],
  ["/logos/alphaid.png", "Alphaid"],
  ["/logos/bain-company.png", "Bain & Company"],
  ["/logos/blue-mark.png", "Partner"],
  ["/logos/ubs.png", "UBS"],
  ["/logos/people-loop.png", "People Loop"],
  ["/logos/nerdclip.png", "NerdClip"],
] as const;

function Brand() {
  return <a className="brand westernprise-logo-link" href="#top" aria-label="Westernprise home">
    <img className="westernprise-logo" src="/westernprise-official-logo.png" alt="Westernprise" />
  </a>;
}

function MiniWindow({ kind = "invoice" }: { kind?: string }) {
  if (kind === "inventory") return <div className="mini-window inventory-ui"><div className="window-bar"><i/><i/><i/></div><div className="inventory-columns"><aside>{[1,2,3,4,5].map(x=><span key={x}/>)}</aside><section><div className="stats"><b>248</b><b>32</b><b>£18k</b></div>{[1,2,3,4].map((x)=><div className="product-row" key={x}><i/><span/><em/></div>)}</section></div></div>;
  if (kind === "receipt") return <div className="mini-window receipt-ui"><div className="window-bar"><i/><i/><i/></div><div className="receipt-paper"><strong>RECEIPT</strong>{[1,2,3,4].map(x=><span key={x}/>) }<b>£1,240.00</b></div><div className="receipt-list">{[1,2,3].map(x=><i key={x}/>)}</div></div>;
  return <div className="mini-window invoice-ui"><div className="window-bar"><i/><i/><i/></div><div className="invoice-layout"><aside>{[1,2,3,4,5].map(x=><span key={x}/>)}</aside><section><div className="invoice-top"><b>Invoices</b><button>+ New invoice</button></div>{["Paid","Paid","Pending","Overdue","Paid"].map((x,i)=><div className="invoice-row" key={i}><i/><span/><em className={x.toLowerCase()}>{x}</em></div>)}</section></div></div>;
}

function EnquiryRelationshipVisual() {
  const stages = ["New", "Open", "Follow-up"];
  return <div className="product-story enquiry-story" aria-label="Enquiry relationship workflow illustration">
    <div className="story-browser"><div className="story-dots"><i/><i/><i/></div><span>Enquiries</span></div>
    <div className="enquiry-layout">
      <aside><b>Enquiry register</b>{stages.map((stage,i)=><div className={i===1?"selected":""} key={stage}><i/><span><strong>Customer request</strong><small>{stage} · Follow-up</small></span></div>)}</aside>
      <section><div className="story-kicker">RELATIONSHIP</div><h4>Customer request</h4><div className="enquiry-meta"><span>Open</span><span>Assigned</span><span>High priority</span></div><div className="timeline"><div><i/><span><b>Enquiry received</b><small>Added to the customer record</small></span></div><div><i/><span><b>Owner assigned</b><small>Responsibility is clear</small></span></div><div><i/><span><b>Follow-up ready</b><small>Next action stays visible</small></span></div></div></section>
    </div>
  </div>;
}

function ConnectedMoneyVisual() {
  return <div className="product-story money-story" aria-label="Connected documents, payments and balances illustration">
    <div className="story-browser"><div className="story-dots"><i/><i/><i/></div><span>Connected records</span></div>
    <div className="money-summary"><small>ACCOUNT STATUS</small><b>Partially settled</b><div><i/><span/></div></div>
    <div className="record-chain">
      <article><span className="record-icon">▤</span><div><small>DOCUMENT</small><b>Invoice issued</b></div><em>Approved</em></article>
      <i className="chain-line"/>
      <article><span className="record-icon">↙</span><div><small>TRANSACTION</small><b>Payment recorded</b></div><em>Applied</em></article>
      <i className="chain-line"/>
      <article><span className="record-icon">▧</span><div><small>PROOF</small><b>Receipt prepared</b></div><em>Ready</em></article>
    </div>
    <div className="balance-strip"><span><small>Paid</small><i/></span><span><small>Outstanding</small><i/></span><b>Records reconciled</b></div>
  </div>;
}

function OperationsActionVisual() {
  const stock = [["Available","Ready"],["Reserved","Allocated"],["Review","Action needed"]];
  return <div className="product-story operations-story" aria-label="Inventory availability and action queue illustration">
    <div className="story-browser"><div className="story-dots"><i/><i/><i/></div><span>Operations</span></div>
    <div className="operations-layout"><section><div className="story-section-title"><div><small>INVENTORY</small><b>Availability</b></div><span>Live status</span></div>{stock.map(([label,status],i)=><div className="stock-row" key={label}><i className={`stock-shape stock-${i}`}/><span><b>Inventory item</b><small>{label}</small></span><em>{status}</em></div>)}</section><aside><div className="story-section-title"><div><small>WORK QUEUE</small><b>Needs action</b></div></div>{["Follow up enquiry","Review inventory","Approve document"].map((label,i)=><div className="action-row" key={label}><i className={`action-priority priority-${i}`}/><span><b>{label}</b><small>{i===0?"High priority":i===1?"Operations":"Approval"}</small></span><em>›</em></div>)}</aside></div>
  </div>;
}

const capabilityViews: Record<string,{eyebrow:string;title:string;columns:string[];rows:string[][];accent:string}> = {
  "Customer Management":{eyebrow:"CUSTOMER REGISTER",title:"Customer relationships",columns:["Customer","Status","Owner"],rows:[["Customer profile","Active","Assigned"],["New relationship","Prospect","Unassigned"],["Returning customer","Active","Assigned"]],accent:"customer"},
  "Inventory Management":{eyebrow:"INVENTORY REGISTER",title:"Stock availability",columns:["Item","Type","Status"],rows:[["Inventory item","Asset","Available"],["Inventory item","Vehicle","Reserved"],["Inventory item","Stock","Review"]],accent:"inventory"},
  "Invoices":{eyebrow:"INVOICE REGISTER",title:"Issued documents",columns:["Number","Customer","Status"],rows:[["Invoice record","Customer","Issued"],["Invoice record","Customer","Paid"],["Invoice record","Customer","Pending"]],accent:"invoice"},
  "Receipts":{eyebrow:"RECEIPT REGISTER",title:"Proof of payment",columns:["Number","Customer","Status"],rows:[["Receipt record","Customer","Issued"],["Receipt record","Customer","Ready"],["Receipt record","Customer","Sent"]],accent:"receipt"},
  "Payments & Balances":{eyebrow:"PAYMENT REGISTER",title:"Money received",columns:["Payment","Method","Balance"],rows:[["Payment record","Transfer","Applied"],["Payment record","Card","Part paid"],["Payment record","Cash","Settled"]],accent:"payment"},
  "Expenses":{eyebrow:"EXPENSE REGISTER",title:"Business costs",columns:["Description","Category","Status"],rows:[["Operating cost","General","Approved"],["Inventory cost","Stock","Linked"],["Service cost","Operations","Review"]],accent:"expense"},
  "Enquiries":{eyebrow:"ENQUIRY REGISTER",title:"Incoming requests",columns:["Priority","Subject","Next action"],rows:[["High","Customer request","Follow up"],["Normal","Product enquiry","Assigned"],["Normal","Service enquiry","Open"]],accent:"enquiry"},
  "Operational Dashboard":{eyebrow:"DASHBOARD",title:"Operations overview",columns:["Work item","Area","Priority"],rows:[["Customer follow-up","Enquiries","High"],["Inventory review","Stock","Normal"],["Document approval","Invoices","Review"]],accent:"dashboard"},
  "Reports & Exports":{eyebrow:"OPERATIONAL REPORTS",title:"Filtered business records",columns:["Register","Period","Status"],rows:[["Invoices","Selected period","Ready"],["Payments","Selected period","Ready"],["Inventory","Current view","Ready"]],accent:"reports"},
  "Staff Access":{eyebrow:"STAFF DIRECTORY",title:"Roles and access",columns:["Team member","Role","Status"],rows:[["Staff account","Manager","Active"],["Staff account","Operations","Active"],["Staff account","Finance","Invited"]],accent:"staff"},
  "Audit History":{eyebrow:"AUDIT HISTORY",title:"Recent changes",columns:["Action","Record","Source"],rows:[["Document created","Invoice","Workspace"],["Payment recorded","Payment","Workspace"],["Settings updated","Profile","Workspace"]],accent:"audit"},
  "Business Settings":{eyebrow:"BUSINESS PROFILE",title:"Workspace settings",columns:["Setting","Area","Status"],rows:[["Organisation profile","Identity","Complete"],["Bank accounts","Documents","Configured"],["Signatures & seal","Approvals","Available"]],accent:"settings"},
  "Document Delivery":{eyebrow:"DOCUMENT DELIVERY",title:"Send and track",columns:["Document","Channel","Status"],rows:[["Invoice","Email","Delivered"],["Receipt","Email","Prepared"],["Statement","PDF","Ready"]],accent:"delivery"},
};

function InventoryProVisual(){
  const rows=[
    ["Packaging materials","Supplies","Central store","Available"],
    ["Office equipment","Equipment","Head office","In use"],
    ["Service materials","Materials","Operations","Low stock"],
    ["Business assets","Assets","Head office","Available"],
  ];
  const icon=(index:number)=><svg viewBox="0 0 24 24" aria-hidden="true">{index===0?<><path d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Z"/><path d="M4 7.5V17l8 4 8-4V7.5M12 12v9"/></>:index===1?<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>:index===2?<><path d="m14.7 6.3 3-3a4 4 0 0 1-5 5l-7.4 7.4a2.1 2.1 0 0 0 3 3l7.4-7.4a4 4 0 0 1 5-5l-3 3"/></>:<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>}</svg>;
  return <div className="invpro-shell">
    <div className="invpro-topbar"><div><small>INVENTORY</small></div><nav><span className="active">Overview</span><span>Stock</span><span>Locations</span></nav></div>
    <div className="invpro-tools"><div className="invpro-search"><i/><span>Search inventory</span></div><button>Category <i aria-hidden="true"/></button><button>Location <i aria-hidden="true"/></button></div>
    <div className="invpro-summary">
      <article><i className="green"/><span><small>AVAILABLE</small><b>Ready for use</b></span><em>Stable</em></article>
      <article><i className="gold"/><span><small>ALLOCATED</small><b>In operation</b></span><em>Active</em></article>
      <article><i className="amber"/><span><small>LOW STOCK</small><b>Restock soon</b></span><em>Review</em></article>
    </div>
    <div className="invpro-workspace">
      <section className="invpro-table"><header><span>Item</span><span>Category</span><span>Location</span><span>Status</span></header>{rows.map((row,i)=><div className="invpro-row" key={row[0]}><i className={`tone-${i}`}>{icon(i)}</i><span><b>{row[0]}</b><small>Inventory record</small></span><em>{row[1]}</em><strong>{row[2]}</strong><u className={i===2?"warning":""}>{row[3]}</u></div>)}</section>
      <aside className="invpro-insight"><header><span><small>STOCK HEALTH</small><b>Inventory mix</b></span><em>Updated</em></header><div className="invpro-chart"><i/><span><b>Healthy</b><small>Across 4 categories</small></span></div><div className="invpro-bars">{[["Products","76%"],["Supplies","54%"],["Equipment","68%"]].map((x,i)=><span key={x[0]}><small>{x[0]}</small><i><b className={`bar-${i}`}/></i><em>{x[1]}</em></span>)}</div><div className="invpro-alert"><i/><span><small>ACTION REQUIRED</small><b>Review low-stock items</b></span><em>2</em></div></aside>
    </div>
  </div>
}

function InventoryInvoiceVisual(){
  const items=[["Packaging materials","Available"],["Office equipment","In use"],["Service materials","Low stock"],["Business assets","Available"]];
  const itemIcon=(i:number)=><svg viewBox="0 0 24 24" aria-hidden="true">{i===0?<><path d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Z"/><path d="M4 7.5V17l8 4 8-4V7.5M12 12v9"/></>:i===1?<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>:i===2?<><path d="m14.5 6.5 3-3a4 4 0 0 1-5 5l-7 7a2.1 2.1 0 0 0 3 3l7-7a4 4 0 0 1 5-5l-3 3"/></>:<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></>}</svg>;
  return <><div className="inventory-invoice-board"><section className="inventory-register-v2"><header><span><small>INVENTORY</small><h4>Inventory register</h4></span><em>All items</em></header><div className="inventory-list-head"><span>Item</span><span>Status</span></div>{items.map((item,i)=><div className="inventory-list-row" key={item[0]}><i className={`item-icon-${i}`}>{itemIcon(i)}</i><span><b>{item[0]}</b><small>{i%2===0?"Central store":"Head office"}</small></span><em className={i===2?"low":i===1?"used":""}>{item[1]}</em></div>)}</section><aside className="inventory-detail-v2"><header><small>ITEM DETAILS</small><i>{itemIcon(1)}</i></header><h4>Office equipment</h4><p>Equipment · Head office</p><div className="inventory-detail-status"><i/><span><small>STATUS</small><b>In use</b></span></div><div className="inventory-detail-lines"><span><small>Category</small><b>Equipment</b></span><span><small>Location</small><b>Head office</b></span><span><small>Condition</small><b>Good</b></span></div><footer><i/><span><small>LAST UPDATED</small><b>Recently reviewed</b></span></footer></aside></div><div className="inventory-note-v2"><small>STOCK HEALTH</small><b>Items needing attention</b><span><i/> 2 records to review</span></div></>;
}

function PaymentsBalanceVisual(){
  const payments=[["Customer payment","Applied"],["Account payment","Recorded"],["Advance payment","Credit"],["Partial payment","Part paid"]];
  const icon=(i:number)=><svg viewBox="0 0 24 24" aria-hidden="true">{i===0?<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></>:i===1?<><path d="M4 7h16v12H4zM7 7V5h10v2M8 12h8M8 15h5"/></>:i===2?<><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c.6-1 1.5-1.5 2.7-1.5 1.5 0 2.8.8 2.8 2s-1.1 1.8-3 2c-1.9.2-3 1-3 2s1.3 2 2.8 2c1.2 0 2.1-.5 2.7-1.5"/></>:<><path d="M5 12h14M14 7l5 5-5 5"/><path d="M10 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"/></>}</svg>;
  return <><div className="payments-v2-board"><section className="payments-v2-register"><header><span><small>PAYMENTS</small><h4>Payment register</h4></span><em>Recent activity</em></header><div className="payments-v2-head"><span>Payment</span><span>Status</span></div>{payments.map((row,i)=><div className="payments-v2-row" key={row[0]}><i className={`payicon-${i}`}>{icon(i)}</i><span><b>{row[0]}</b><small>{i===0?"Bank transfer":i===1?"Card payment":i===2?"Transfer":"Cash payment"}</small></span><em className={`paystate-${i}`}>{row[1]}</em></div>)}</section><aside className="balance-v2-card"><header><small>ACCOUNT BALANCE</small><i>{icon(2)}</i></header><h4>Customer account</h4><p>Payments and documents connected</p><div className="balance-v2-ring"><i/><span><small>PAYMENT STATUS</small><b>Part paid</b><em>Balance visible</em></span></div><div className="balance-v2-progress"><span><small>Applied</small><i><b/></i><em>68%</em></span><span><small>Outstanding</small><i><b/></i><em>32%</em></span></div><footer><i/><span><small>RECONCILIATION</small><b>Records match</b></span><em>Complete</em></footer></aside></div><div className="allocation-v2-note"><small>ALLOCATION UPDATED</small><b>Payment linked to document</b><span><i/> Balance recalculated</span></div></>;
}

function ExpensesRegisterVisual(){
  const expenses=[
    ["Workplace supplies","Operations","Approved"],
    ["Equipment service","Maintenance","Submitted"],
    ["Software subscription","Administration","Paid"],
    ["Delivery charge","Logistics","Approved"],
  ];
  const expenseIcon=(i:number)=><svg viewBox="0 0 24 24" aria-hidden="true">{i===0?<><path d="M6 3h12l2 5-2 3H6L4 8l2-5Z"/><path d="M7 11v10m10-10v10M5 21h14"/></>:i===1?<><path d="m14.8 6.2 3-3a4 4 0 0 1-5 5l-7.2 7.2a2.1 2.1 0 0 0 3 3l7.2-7.2a4 4 0 0 1 5-5l-3 3"/></>:i===2?<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></>:<><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>}</svg>;
  return <div className="expense-v3-workspace"><div className="expense-v3-panels"><section className="expense-v3-register"><header><div><small>EXPENSES</small><h4>Expense register</h4></div></header><div className="expense-v3-table-head"><span/><span>Expense</span><span>Category</span><span>Status</span></div>{expenses.map((row,i)=><div className="expense-v3-row" key={row[0]}><i className={`expense-v3-icon expenseicon-${i}`}>{expenseIcon(i)}</i><span><b>{row[0]}</b><small>Business cost · Recently added</small></span><strong>{row[1]}</strong><em className={`expensestate-${i}`}>{row[2]}</em></div>)}<footer><span>1–4 of 18</span><nav aria-label="Expense register pages"><i>‹</i><b>1</b><i>2</i><i>›</i></nav></footer></section><aside className="expense-v3-detail"><header><div><h4>Equipment service</h4><p>Maintenance · General operations</p></div><i>{expenseIcon(1)}</i><em>All records</em></header><div className="expense-v3-status"><i/><span><small>APPROVAL STATUS</small><b>Submitted for review</b></span><em>Pending</em></div><div className="expense-v3-lines"><span><small>Expense number</small><b>EXP-0148</b></span><span><small>Date recorded</small><b>Recently</b></span><span><small>Linked record</small><b>Operations workspace</b></span></div><div className="expense-v3-route"><small>APPROVAL ROUTE</small><div><span className="done"><i/><b>Recorded</b></span><em/><span className="current"><i/><b>Review</b></span><em/><span><i/><b>Approved</b></span></div></div></aside></div><div className="expense-v3-note"><i/><span><small>REGISTER STATUS</small><b>Costs organised and ready for review</b></span><em>History retained</em></div></div>;
}

function EnquiriesPipelineVisual(){
  const columns=[
    ["NEW",["Customer request","Owner assigned"],["Product enquiry","Owner assigned"]],
    ["OPEN",["Follow-up due","Owner assigned"],["Assigned request","Owner assigned"]],
    ["FOLLOW-UP",["Call scheduled","Owner assigned"],["Proposal ready","Owner assigned"]],
  ] as const;
  const actions=[["Follow up request","Due now"],["Assign owner","Workflow step"],["Prepare response","Workflow step"],["Convert relationship","Workflow step"]];
  return <div className="enquiry-v3-workspace"><header><div><small>ENQUIRY WORKSPACE</small><h4>Relationship pipeline</h4></div></header><div className="enquiry-v3-toolbar"><div className="enquiry-v3-search"><i/><span>Search enquiries</span></div><div className="enquiry-v3-filter active"><i/>Follow-up view</div><div className="enquiry-v3-filter">All owners</div><div className="enquiry-v3-filter">All priorities</div></div><div className="enquiry-v3-summary">{[["New","Incoming"],["Open","Assigned"],["Follow-up","Due next"],["Converted","Relationship linked"]].map((item,i)=><article className={i===0?"primary":""} key={item[0]}><i/><span><b>{item[0]}</b><small>{item[1]}</small></span></article>)}</div><div className="enquiry-v3-grid"><div className="enquiry-v3-pipeline">{columns.map((column,columnIndex)=><section key={column[0]}><header><b>{column[0]}</b><span>{columnIndex===0?"Incoming":columnIndex===1?"In progress":"Action due"}</span></header>{column.slice(1).map((card,cardIndex)=><article key={card[0]}><i className={`enquiry-v3-marker marker-${columnIndex}-${cardIndex}`}/><b>{card[0]}</b><small>{card[1]}</small><span><i/>Activity recorded</span></article>)}</section>)}</div><aside className="enquiry-v3-actions"><header>NEXT ACTIONS</header>{actions.map((action,i)=><div key={action[0]}><i className={`action-${i}`}/><span><b>{action[0]}</b><small>{action[1]}</small></span></div>)}</aside></div></div>;
}

function OperationalDashboardVisual(){
  const workItems=[["Follow up enquiry","High"],["Review inventory","Open"],["Approve document","Open"],["Check expense","Open"]];
  const actions=["Customer record","Create invoice","Record payment","Add inventory"];
  const activity=["Document updated","Payment recorded","Enquiry assigned","Inventory reviewed"];
  const bars=[[54,31],[70,44],[48,62],[82,49],[66,38],[90,58],[74,46]];
  return <div className="operations-v3-workspace"><header><div><small>OPERATIONAL DASHBOARD</small><h4>Business at a glance</h4></div><span><i/>Live workspace</span></header><div className="operations-v3-grid"><section className="operations-v3-chart"><header><div><small>BUSINESS MOVEMENT</small><h5>Payments and costs</h5></div><em>Recent period</em></header><div className="operations-v3-bars">{bars.map((pair,i)=><div key={i}><i style={{height:`${pair[0]}%`}}/><b style={{height:`${pair[1]}%`}}/></div>)}</div><footer><span><i/>Payments</span><span><i/>Costs</span></footer></section><section className="operations-v3-queue"><header><b>WORK QUEUE</b><span>Priority view</span></header>{workItems.map((item,i)=><div key={item[0]}><i/><span><b>{item[0]}</b><small>Assigned workflow</small></span><em className={i===0?"high":""}>{item[1]}</em></div>)}</section><aside className="operations-v3-actions"><header>QUICK ACTIONS</header>{actions.map((action,i)=><div key={action}><i>{i+1}</i><b>{action}</b><em>›</em></div>)}</aside></div><div className="operations-v3-activity"><header>RECENT CHANGES</header><div>{activity.map(item=><span key={item}><i/><b>{item}</b></span>)}</div><em>All activity</em></div></div>;
}

function ReportsExportsVisual(){
  const periods=["P1","P2","P3","P4","P5"];
  const series=[[62,45,31],[78,58,42],[54,70,49],[86,64,55],[71,82,46]];
  return <div className="reports-v3-workspace"><div className="reports-v3-filters"><div><span>Period</span><i/></div><div><span>Business area</span><i/></div><button>Apply</button></div><header><small>OPERATIONAL REPORT</small><h4>Filtered results</h4></header><section className="reports-v3-chart"><header><div><small>RESULTS OVERVIEW</small><b>Operational activity</b></div><button>CSV</button></header><div className="reports-v3-plot">{series.map((values,i)=><div key={periods[i]}><span>{values.map((height,j)=><i className={`series-${j}`} key={j} style={{height:`${height}%`}}/>)}</span><small>{periods[i]}</small></div>)}</div><footer><span><i/>Invoices</span><span><i/>Payments</span><span><i/>Expenses</span></footer></section><div className="reports-v3-export"><i/><span><small>EXPORT READY</small><b>Download filtered records</b></span></div></div>;
}

function StaffAccessVisual(){
  const staff=[["Manager","Active"],["Operations","Active"],["Finance","Active"],["Viewer","Invited"]];
  const permissions=[["Customers",3],["Inventory",3],["Documents",2],["Payments",2],["Reports",1]] as const;
  const person=<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.5-4.2 2.7-6.4 6.5-6.4s6 2.2 6.5 6.4"/></svg>;
  return <div className="staff-v3-workspace"><header><small>STAFF &amp; ACCESS</small><h4>Roles and permissions</h4></header><div className="staff-v3-grid"><section className="staff-v3-table"><header><span/><span>Team member</span><span>Role</span><span>Status</span></header>{staff.map((member,i)=><div className="staff-v3-row" key={member[0]}><i className={`avatar-${i}`}>{person}</i><span><b>Staff account</b><small>Workspace member</small></span><strong>{member[0]}</strong><em className={member[1]==="Invited"?"invited":""}>{member[1]}</em></div>)}</section><aside className="staff-v3-access"><section className="staff-v3-role"><small>SELECTED ROLE</small><div><h5>Operations</h5><em>Controlled workspace</em></div><p>Operational workspace access</p></section><section className="staff-v3-permissions"><header>AREA PERMISSIONS</header><div className="staff-v3-key"><span>View</span><span>Edit</span><span>Admin</span></div>{permissions.map(([area,count])=><div className="staff-v3-permission-row" key={area}><b>{area}</b><span>{[0,1,2].map(i=><i className={i<count?"on":""} key={i}/>)}</span></div>)}</section><section className="staff-v3-status"><i/><span><small>ACCESS STATUS</small><b>Appropriate and active</b></span></section></aside></div></div>;
}

function AuditHistoryVisual(){
  const events=[
    ["Document created","Invoice · Workspace","green"],
    ["Payment recorded","Payment · Workspace","gold"],
    ["Status changed","Enquiry · General area","muted"],
    ["Settings updated","Profile · Workspace","green"],
  ] as const;
  return <div className="audit-v3-workspace">
    <header><small>AUDIT HISTORY</small><h4>Recent changes</h4></header>
    <div className="audit-v3-filters">
      {['All users','All actions','General area'].map(label=><div key={label}><span>{label}</span><i/></div>)}
      <button>Apply</button>
    </div>
    <section className="audit-v3-timeline">
      <span className="audit-v3-spine" aria-hidden="true"/>
      {events.map(([title,meta,tone],i)=><article key={title}>
        <div className="audit-v3-axis"><i className={tone}/></div>
        <div className="audit-v3-event"><b>{title}</b><small>{meta}</small></div>
        <em>Recorded</em>
      </article>)}
    </section>
    <div className="audit-v3-summary">
      <article><small>ACTION</small><b>Traceable</b></article>
      <article><small>RECORD</small><b>Linked</b></article>
      <article><small>SOURCE</small><b>Visible</b></article>
    </div>
    <section className="audit-v3-trace"><i/><span><small>TRACEABLE</small><b>Every change has context</b><em>User, record and source retained</em></span></section>
  </div>;
}

function CustomerProfileVisual(){
  const stages=['Active relationship','New prospect','Follow-up due'];
  return <div className="customer-v3-workspace">
    <section className="customer-v3-stages">
      <header>CUSTOMERS</header>
      <div>{stages.map((stage,i)=><article className={i===0?'active':''} key={stage}><i/><b>{stage}</b><em/></article>)}</div>
    </section>
    <section className="customer-v3-profile">
      <div className="customer-v3-avatar"><i/></div>
      <h4>Customer profile</h4>
      <small>ACTIVE RELATIONSHIP</small>
      <div className="customer-v3-actions"><button>History</button><button>Documents</button></div>
      <div className="customer-v3-lines"><i/><i/><i/></div>
      <aside><small>NEXT ACTION</small><b>Follow-up scheduled</b><span>Owner assigned</span></aside>
    </section>
  </div>;
}

function CapabilityProductVisual({name}:{name:string}) {
  const chrome=(kind:string,children:ReactNode)=><div className={`dynamic-cap dynamic-${kind}`} aria-label={`${name} interface illustration`}><div className="dynamic-browser"><div><i/><i/><i/></div><span/></div>{children}</div>;
  if(name==="Inventory Management")return chrome("inventory-invoice",<InventoryInvoiceVisual/>);
  if(name==="Payments & Balances")return chrome("payments-v2",<PaymentsBalanceVisual/>);
  if(name==="Expenses")return chrome("expenses-v3",<ExpensesRegisterVisual/>);
  if(name==="Enquiries")return chrome("enquiries-v3",<EnquiriesPipelineVisual/>);
  if(name==="Operational Dashboard")return chrome("dashboard-v3",<OperationalDashboardVisual/>);
  if(name==="Reports & Exports")return chrome("reports-v3",<ReportsExportsVisual/>);
  if(name==="Staff Access")return chrome("staff-v3",<StaffAccessVisual/>);
  if(name==="Audit History")return chrome("audit-v3",<AuditHistoryVisual/>);
  if(name==="Customer Management")return chrome("customers-v3",<CustomerProfileVisual/>);
  if(name==="Customer Management")return chrome("customers",<><div className="customer-board"><div className="customer-list"><small>CUSTOMERS</small>{["Active relationship","New prospect","Follow-up due"].map((x,i)=><span className={i===0?"active":""} key={x}><i/><b>{x}</b><em/></span>)}</div><div className="customer-profile"><div className="profile-orbit"><i/><span/></div><h4>Customer profile</h4><small>ACTIVE RELATIONSHIP</small><div className="profile-tags"><b>History</b><b>Documents</b></div><div className="profile-lines"><i/><i/><i/></div></div></div><div className="dynamic-float customer-note"><small>NEXT ACTION</small><b>Follow-up scheduled</b><span>Owner assigned</span></div></>);
  if(name==="Inventory Management")return chrome("inventory",<><div className="inventory-full inventory-redesign"><header><div><small>INVENTORY CONTROL</small></div><nav><b>All inventory</b><span>Categories</span><span>Locations</span></nav></header><div className="inventory-toolbar"><div className="inventory-search"><i/><span>Search inventory records</span></div><div className="inventory-filter"><span>All categories</span><span>All locations</span><b>Filter</b></div></div><div className="inventory-kpis">{[["Available","Ready for use"],["Allocated","In operation"],["Low stock","Restock soon"],["Review","Needs attention"]].map((x,i)=><article key={x[0]}><i className={`inv-kpi-${i}`}/><span><small>{x[0]}</small><b>{x[1]}</b></span><em/></article>)}</div><div className="inventory-content"><section><div className="inv-table-head"><span>Inventory item</span><span>Category</span><span>Location</span><span>Status</span></div>{[["Core product","Products","Main store","Available"],["Packing supplies","Supplies","Store room","Low stock"],["Office equipment","Equipment","Head office","In use"],["Service materials","Materials","Operations","Allocated"],["Business asset","Assets","Head office","Review"]].map((x,i)=><div className="inv-table-row" key={x[0]}><i className={`inv-object inv-${i}`}/><span><b>{x[0]}</b><small>Inventory record</small></span><em>{x[1]}</em><strong>{x[2]}</strong><u>{x[3]}</u></div>)}</section><aside><div className="inv-health-head"><span><small>STOCK HEALTH</small><b>Balanced coverage</b></span></div><div className="inv-donut"><i/><span><b>Healthy</b><small>Across categories</small></span></div><div className="inv-categories"><span>Products <i><b/></i></span><span>Supplies <i><b/></i></span><span>Equipment <i><b/></i></span><span>Assets <i><b/></i></span></div><div className="inv-action"><i/><span><small>NEXT ACTION</small><b>Review flagged items</b></span><em>3 items</em></div></aside></div><div className="inventory-footer"><span><i/>Availability updated</span><span><i/>Locations connected</span><span><i/>Movement tracked</span></div></div></>);
  if(name==="Invoices")return chrome("invoices",<><div className="invoice-board"><div className="invoice-register"><h4>Invoices</h4>{["Issued","Paid","Pending","Overdue"].map((x,i)=><div key={x}><i/><span/><em className={`invoice-state state-${i}`}>{x}</em></div>)}</div><div className="invoice-paper"><small>INVOICE</small><b>Customer billing</b><span/><span/><span/><div><i/><i/></div></div></div><div className="dynamic-float invoice-todo"><small>NEEDS ATTENTION</small><b>Review pending document</b><span>Approval workflow</span></div></>);
  if(name==="Receipts")return chrome("receipts",<><div className="receipt-scene"><div className="receipt-sheet"><small>RECEIPT</small><h4>Payment confirmed</h4>{[1,2,3].map(i=><span key={i}/>) }<div className="receipt-total"><i/><b>Paid in full</b></div><footer><i/><i/></footer></div><div className="receipt-register"><small>RECENT RECEIPTS</small>{["Issued","Ready","Delivered"].map(x=><span key={x}><i/><b>{x}</b></span>)}</div></div><div className="dynamic-float receipt-stamp">CONFIRMED</div></>);
  if(name==="Payments & Balances")return chrome("payments",<><div className="payment-board payment-redesign"><header><div><small>PAYMENTS & BALANCES</small><h4>Connected financial records</h4></div><span><i/> Reconciled view</span></header><div className="payment-summary">{[["Received","Recorded"],["Applied","Connected"],["Outstanding","Visible"],["Credits","Available"]].map((x,i)=><article key={x[0]}><i className={`pay-summary-${i}`}/><span><small>{x[0]}</small><b>{x[1]}</b></span><em/></article>)}</div><div className="payment-workspace"><section><div className="payment-ledger-head"><span>Payment record</span><span>Method</span><span>Applied to</span><span>Status</span></div>{[["Customer payment","Bank transfer","Invoice record","Applied"],["Account payment","Card","Open balance","Recorded"],["Advance payment","Transfer","Customer account","Credit"],["Partial payment","Cash","Invoice record","Part paid"]].map((x,i)=><div className="payment-ledger-row" key={x[0]}><i className={`pay-method pay-method-${i}`}/><span><b>{x[0]}</b><small>Traceable transaction</small></span><em>{x[1]}</em><strong>{x[2]}</strong><u>{x[3]}</u></div>)}<footer><span><i/>Payment history retained</span><span><i/>Documents stay linked</span></footer></section><aside><div className="payment-balance-card"><div className="payment-ring"><i/><span><small>ACCOUNT POSITION</small><b>Part paid</b><em>Balance visible</em></span></div><div className="payment-balance-bars"><span><small>Applied</small><i><b/></i></span><span><small>Outstanding</small><i><b/></i></span><span><small>Credit</small><i><b/></i></span></div></div><div className="payment-allocation"><small>ALLOCATION FLOW</small><div><article><i/><span><b>Payment received</b><small>Transaction recorded</small></span></article><em/><article><i/><span><b>Document updated</b><small>Balance recalculated</small></span></article></div></div><div className="payment-reconciled"><i/><span><small>RECONCILIATION</small><b>Records match</b></span><em>Complete</em></div></aside></div></div></>);
  if(name==="Expenses")return chrome("expenses",<><div className="expenses-full expense-redesign"><header><div><small>EXPENSE CONTROL</small><h4>Business costs and approvals</h4></div><span><i/> Current view</span></header><div className="expense-toolbar"><span>All categories</span><span>All statuses</span><b>Filtered register</b></div><div className="expense-kpis">{[["Approved","Ready"],["Pending","Needs review"],["Linked","Records matched"],["Recurring","Scheduled"]].map((x,i)=><article key={x[0]}><i className={`expense-kpi-${i}`}/><span><small>{x[0]}</small><b>{x[1]}</b></span><em/></article>)}</div><div className="expense-full-grid"><section><div className="expense-list-head"><span>Expense</span><span>Category</span><span>Source</span><span>Status</span></div>{[["Operating cost","General","Workspace","Approved"],["Inventory cost","Stock","Inventory","Linked"],["Service cost","Operations","Document","Review"],["Recurring cost","Admin","Schedule","Approved"]].map((x,i)=><div className="expense-full-row" key={x[0]}><i className={`exp-dot exp-dot-${i}`}/><span><b>{x[0]}</b><small>Traceable business expense</small></span><em>{x[1]}</em><strong>{x[2]}</strong><u>{x[3]}</u></div>)}<footer><span><i/>Documents connected</span><span><i/>Approval history retained</span></footer></section><aside><div className="expense-chart-head"><span><small>COST MOVEMENT</small><b>Recent activity</b></span><em>Updated</em></div><div className="expense-area-chart">{[38,65,49,80,58,72,91,67].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="expense-breakdown"><span>General <i><b/></i></span><span>Stock <i><b/></i></span><span>Operations <i><b/></i></span><span>Admin <i><b/></i></span></div><div className="expense-review"><i/><span><small>APPROVAL QUEUE</small><b>Review required</b></span><em>Open</em></div></aside></div></div></>);
  if(name==="Enquiries")return chrome("enquiries",<><div className="enquiries-full enquiries-redesign"><header><div><small>ENQUIRY WORKSPACE</small><h4>Relationship pipeline</h4></div><span><i/> Follow-up view</span></header><div className="enquiry-toolbar"><div><i/><span>Search enquiries</span></div><span>All owners</span><span>All priorities</span></div><div className="enquiry-summary">{[["New","Incoming"],["Open","Assigned"],["Follow-up","Due next"],["Converted","Relationship linked"]].map((x,i)=><article key={x[0]}><i className={`enq-sum-${i}`}/><span><small>{x[0]}</small><b>{x[1]}</b></span><em/></article>)}</div><div className="enquiry-workspace"><div className="enquiry-kanban">{[["NEW","Customer request","Product enquiry"],["OPEN","Follow-up due","Assigned request"],["FOLLOW-UP","Call scheduled","Proposal ready"]].map((col,i)=><section key={col[0]}><header><small>{col[0]}</small><em>{i===0?"Incoming":i===1?"In progress":"Action due"}</em></header>{col.slice(1).map((x,j)=><article key={x}><i className={`enq-priority enq-${i}${j}`}/><b>{x}</b><span>Owner assigned</span><em>{j===0?"High":"Normal"}</em><footer><i/><small>Activity recorded</small></footer></article>)}</section>)}</div><aside><small>NEXT ACTIONS</small>{["Follow up request","Assign owner","Prepare response","Convert relationship"].map((x,i)=><div key={x}><i className={`next-${i}`}/><span><b>{x}</b><small>{i===0?"Due now":"Workflow step"}</small></span></div>)}<footer><small>PIPELINE PROGRESS</small><i><span/></i><b>Relationships stay organised</b></footer></aside></div></div></>);
  if(name==="Operational Dashboard")return chrome("dashboard",<><div className="operations-full operations-redesign"><header><div><small>OPERATIONAL DASHBOARD</small><h4>Business at a glance</h4></div><span><i/> Live workspace</span></header><div className="operations-kpis">{[["Money received","On track"],["Invoices","Current"],["Inventory","Available"],["Enquiries","Open"],["Expenses","Controlled"]].map((x,i)=><article key={x[0]}><small>{x[0]}</small><i className={`ops-kpi-${i}`}/><b>{x[1]}</b><span/></article>)}</div><div className="operations-grid"><section className="operations-chart"><div><span><small>BUSINESS MOVEMENT</small><b>Payments and costs</b></span><em>Recent period</em></div><div className="ops-chart-bars">{[32,57,44,73,61,88,69,94,76].map((h,i)=><i key={i} style={{height:`${h}%`}}><span/></i>)}</div><footer><span><i/>Payments</span><span><i/>Expenses</span><b>Operational trend visible</b></footer></section><section className="operations-queue"><header><small>WORK QUEUE</small><em>Priority view</em></header>{["Follow up enquiry","Review inventory","Approve document","Check expense"].map((x,i)=><div key={x}><i className={`opq-${i}`}/><span><b>{x}</b><small>Assigned workflow</small></span><em>{i===0?"High":"Open"}</em></div>)}</section><aside><small>QUICK ACTIONS</small>{["Customer record","Create invoice","Record payment","Add inventory"].map((x,i)=><div key={x}><i>{i+1}</i><b>{x}</b><em>›</em></div>)}</aside></div><div className="operations-activity"><small>RECENT CHANGES</small>{["Document updated","Payment recorded","Enquiry assigned","Inventory reviewed"].map(x=><span key={x}><i/><b>{x}</b></span>)}<em>All activity</em></div></div></>);
  if(name==="Reports & Exports")return chrome("reports",<><div className="report-board"><div className="report-filters"><span>Period</span><span>Business area</span><b>Apply</b></div><div className="report-title"><div><small>OPERATIONAL REPORT</small><h4>Filtered results</h4></div><span>CSV</span></div><div className="report-chart">{[38,64,49,78,56,88,71].map((h,i)=><i key={i} style={{height:`${h}%`}}><span/></i>)}</div><div className="report-legend"><span>Invoices</span><span>Payments</span><span>Expenses</span></div></div><div className="dynamic-float export-note"><i/><div><small>EXPORT READY</small><b>Download filtered records</b></div></div></>);
  if(name==="Staff Access")return chrome("staff",<><div className="staff-full"><header><div><small>STAFF & ACCESS</small><h4>Roles and permissions</h4></div><span>Controlled workspace</span></header><div className="staff-full-grid"><section><div className="staff-directory-head"><span>Team member</span><span>Role</span><span>Status</span></div>{["Manager","Operations","Finance","Viewer"].map((x,i)=><div className="staff-directory-row" key={x}><div className={`staff-avatar avatar-${i}`}><i/></div><span><b>Staff account</b><small>Workspace member</small></span><em>{x}</em><u>{i===3?"Invited":"Active"}</u></div>)}</section><aside><div className="role-card"><small>SELECTED ROLE</small><h5>Operations</h5><span>Operational workspace access</span></div><div className="access-list"><small>AREA PERMISSIONS</small>{["Customers","Inventory","Documents","Payments","Reports"].map((x,i)=><div key={x}><b>{x}</b><span><i className="on"/><i className={i<4?"on":""}/><i className={i<2?"on":""}/></span></div>)}</div><div className="role-status"><i/><span><small>ACCESS STATUS</small><b>Appropriate and active</b></span></div></aside></div></div></>);
  if(name==="Audit History")return chrome("audit",<><div className="audit-board"><div className="audit-head"><div><small>AUDIT HISTORY</small><h4>Recent changes</h4></div><span>General area</span></div><div className="audit-filters"><span>All users</span><span>All actions</span><b>Apply</b></div><div className="audit-line">{[["Document created","Invoice","Workspace"],["Payment recorded","Payment","Workspace"],["Status changed","Enquiry","General area"],["Settings updated","Profile","Workspace"]].map((x,i)=><div key={x[0]}><i className={`audit-dot audit-${i}`}/><span><b>{x[0]}</b><small>{x[1]} · {x[2]}</small></span><em>Recorded</em></div>)}</div><div className="audit-context"><span><small>ACTION</small><b>Traceable</b></span><span><small>RECORD</small><b>Linked</b></span><span><small>SOURCE</small><b>Visible</b></span></div></div><div className="dynamic-float audit-note"><i/><div><small>TRACEABLE</small><b>Every change has context</b><span>User, record and source retained</span></div></div></>);
  if(name==="Business Settings")return chrome("settings",<><div className="settings-board"><nav><span className="active">Profile</span><span>Accounts</span><span>Approvals</span></nav><div className="settings-panel"><div className="settings-brand"><i>W</i><span><small>BUSINESS IDENTITY</small><b>Organisation profile</b></span><em>Complete</em></div><div className="settings-fields"><span/><span/><span className="wide"/><span/></div><div className="settings-switches"><span>Document branding <i/></span><span>Workspace access <i/></span></div></div></div><div className="dynamic-float settings-note"><small>CONFIGURED</small><b>Brand, accounts and approvals</b></div></>);
  return chrome("delivery",<><div className="delivery-board"><div className="delivery-document"><small>DOCUMENT</small><h4>Invoice ready</h4><span/><span/><span/><footer><i/><b>Approved</b></footer></div><div className="delivery-track"><small>DELIVERY</small>{[["Prepared",true],["Sent",true],["Delivered",true]].map(([x,on],i)=><div key={String(x)}><i className={on?"done":""}/><span><b>{x}</b><small>{i===2?"Customer received":"Workflow complete"}</small></span></div>)}</div></div><div className="dynamic-float delivery-note"><i/><div><small>EMAIL DELIVERY</small><b>Document delivered</b></div></div></>);
}

function OpsNavIcon({type}:{type:string}) {
  const paths:Record<string,ReactNode> = {
    overview:<><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></>,
    customers:<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 19c.5-4 2.5-6 5.5-6s5 2 5.5 6M14 14c3.5 0 5.5 1.7 6 5"/></>,
    invoices:<><path d="M6 3h9l4 4v14H6zM15 3v5h4M9 12h7M9 16h7"/></>,
    receipts:<><path d="M7 3h10v18l-2-1.5-2 1.5-2-1.5L9 21l-2-1.5zM10 8h4M10 12h4M10 16h3"/></>,
    payments:<><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8l4 4-4 4"/></>,
    inventory:<><path d="m4 8 8-4 8 4-8 4zM4 8v9l8 4 8-4V8M12 12v9"/></>,
    enquiries:<><path d="M4 5h16v11H9l-5 4zM8 9h8M8 12h5"/></>,
    reports:<><path d="M5 20V10M12 20V4M19 20v-7M3 20h18"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

function HeroProduct() {
  const metrics = ["Money received", "Invoices issued", "Available inventory", "Enquiries", "Expenses"];
  const queue = ["Customer follow-up", "Document approval", "Inventory review", "Expense review"];
  const actions = ["New customer", "New invoice", "Issue receipt", "Record payment", "Add inventory"];
  const navigation = [["overview","Overview"],["customers","Customers"],["invoices","Invoices"],["receipts","Receipts"],["payments","Payments"],["inventory","Inventory"],["enquiries","Enquiries"],["reports","Reports"]];
  return <div className="hero-glass-frame hero-dashboard-frame"><div className="hero-product hero-operations" aria-label="Animated Westernprise operations dashboard illustration">
    <div className="ops-window">
      <div className="ops-browser-bar" aria-hidden="true"><span/><span/><span/><div className="ops-address"><i/></div></div>
      <aside className="ops-sidebar">
        <div className="ops-mark"><img src="/westernprise-dashboard-icon.png" alt="Westernprise" /></div>
        {navigation.map(([icon,label],i)=><span className={i===0?"active":""} key={label}><OpsNavIcon type={icon}/><b>{label}</b></span>)}
      </aside>
      <section className="ops-main">
        <div className="ops-heading"><div><small>WORKSPACE / DASHBOARD</small><h3>Operations overview</h3></div><button>Open reports</button></div>
        <div className="ops-filters">{[1,2,3].map(i=><span key={i}/>)}<button>Apply</button></div>
        <div className="ops-metrics">{metrics.map((label,i)=><article key={label}><small>{label}</small><strong className={`metric-shape shape-${i}`}/><i/></article>)}</div>
        <div className="ops-content">
          <div className="ops-queue"><div className="ops-section-title"><b>Work queue</b><small>Items requiring attention</small></div>{queue.map((label,i)=><div className="ops-row" key={label}><i className={`priority p-${i}`}/><span><b>{label}</b><small>Assigned workflow</small></span><em/><u/></div>)}</div>
          <div className="ops-actions"><div className="ops-section-title"><b>Quick actions</b><small>Start a workflow</small></div>{actions.map(label=><div key={label}><i>◇</i><span><b>{label}</b><small>Open workflow</small></span></div>)}</div>
          <div className="ops-chart"><div className="ops-section-title"><b>Business movement</b><small>Recent operational activity</small></div><div className="ops-bars">{[34,48,40,57,66,52,78,61,88,70].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></div>
        </div>
      </section>
    </div>
    <div className="ops-float ops-enquiry"><small>ENQUIRY FOLLOW-UP</small><b>Customer request</b><span><i/> Follow-up required</span><button>View enquiry</button></div>
    <div className="ops-float ops-summary"><small>DOCUMENT SUMMARY</small><b>Invoices and payments</b>{["Issued", "Received", "Outstanding"].map(x=><span key={x}>{x}<i/></span>)}<button>View documents</button></div>
    <div className="ops-float ops-stock"><small>INVENTORY STATUS</small><b>Items available</b><div>{[1,2,3].map(i=><span key={i}><i/><em/></span>)}</div><button>View inventory</button></div>
  </div></div>;
}

function StepIcon({type}:{type:"video"|"settings"|"loading"|"ready"}) {
  if(type==="video") return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="12" width="24" height="24" rx="6"/><path d="m31 20 10-6v20l-10-6z"/></svg>;
  if(type==="settings") return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="7"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11.3 11.3l4.2 4.2M32.5 32.5l4.2 4.2M36.7 11.3l-4.2 4.2M15.5 32.5l-4.2 4.2"/></svg>;
  if(type==="loading") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M40 24A16 16 0 1 1 24 8"/><path d="m24 3 6 5-6 5"/></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17"/><path d="m15 24 6 6 13-14"/></svg>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>{const track=carouselRef.current;const card=track?.children[slide] as HTMLElement|undefined;if(track&&card){track.scrollTo({left:card.offsetLeft-(track.clientWidth-card.clientWidth)/2,behavior:"smooth"})}},[slide]);
  const syncCarousel=()=>{if(carouselTimer.current)clearTimeout(carouselTimer.current);carouselTimer.current=setTimeout(()=>{const track=carouselRef.current;if(!track)return;const centre=track.scrollLeft+track.clientWidth/2;let nearest=0;let distance=Infinity;Array.from(track.children).forEach((item,i)=>{const card=item as HTMLElement;const d=Math.abs(card.offsetLeft+card.clientWidth/2-centre);if(d<distance){distance=d;nearest=i}});if(nearest!==slide)setSlide(nearest)},90)};
  return <main id="top">
    <header className="site-header"><Brand/><nav className={menu ? "open" : ""}><a href="#how" onClick={()=>setMenu(false)}>How It Works</a><a href="#features" onClick={()=>setMenu(false)}>Features</a><a href="#audience" onClick={()=>setMenu(false)}>Who It’s For</a><a href="#faq" onClick={()=>setMenu(false)}>FAQ</a><a className="mobile-nav-cta" href="/book-a-demo" onClick={()=>setMenu(false)}>Book a Demo</a></nav><div className="header-actions"><LanguageSelector/><a className="small-button" href="/book-a-demo">Book a Demo</a></div><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>{menu ? "×" : "☰"}</button></header>

    <section className="hero">
      <div className="hero-box-mask"/><Boxes />
      <div className="hero-inner"><div className="hero-eyebrow hero-eyebrow-empty" aria-hidden="true">&nbsp;</div><h1>Run Your Entire Business<br/>From <span>One Simple Workspace</span></h1><p>Manage customers, inventory, invoices, receipts, payments, expenses and enquiries while keeping your team accountable and your business performance visible.</p><div className="hero-actions"><a className="button light" href="/book-a-demo">Get Started</a><a className="button outline" href="#how">See How It Works</a></div><div className="rating-strip"><strong>4.9/5</strong><span>★★★★★</span><small>VERIFIED BUSINESS REVIEWS</small></div><HeroProduct/></div>
    </section>

    <TrustedCompanies logos={companyLogos} />

    <section id="connected" className="core section reveal-section"><h2><span>Every Part of</span><br/><em>Your Business, Connected.</em></h2><p className="intro">Bring customer records, stock, sales documents, money and staff activity into one organised workspace.</p><div className="core-grid">
      <article className="core-card"><span className="feature-pill blue-pill">CUSTOMERS</span><h3>Turn every enquiry into an organised relationship</h3><p>Keep customer history, opportunities, follow-ups and ownership visible to the right people.</p><div className="card-visual"><EnquiryRelationshipVisual/></div></article>
      <article className="core-card"><span className="feature-pill gold-pill">MONEY</span><h3>Connect documents, payments and balances</h3><p>Move from invoice to receipt while keeping paid amounts, expenses and outstanding money accurate.</p><div className="card-visual"><ConnectedMoneyVisual/></div></article>
      <article className="core-card"><span className="feature-pill green-pill">OPERATIONS</span><h3>Know what is available and what needs action</h3><p>See inventory, work queues, costs and recent activity in a single operational view.</p><div className="card-visual"><OperationsActionVisual/></div></article>
    </div><h3 className="record-title">Run Every Part of Your Business in One Place.</h3><a className="button primary" href="/book-a-demo">Book a Demo</a></section>

    <section id="how" className="onboarding-wrap reveal-section"><div className="onboarding"><h2><span>Start simply.</span><br/>Build a connected operation with Westernprise.</h2><div className="step-grid connected-steps">{[["01","video","Book a Demo","Show us how work moves through your business."],["02","settings","Open Your Workspace","Review a workspace configured around your operation."],["03","loading","Onboard Your Team","Set access, workflows and essential business details."],["04","ready","Go Live","Launch confidently with dedicated support."]].map((s,i)=><article key={s[0]}><div className={`step-shot shot-${i}`}><div className="process-icon"><StepIcon type={s[1] as "video"|"settings"|"loading"|"ready"}/></div><small>{i===0?"Discover":i===1?"Configure":i===2?"Prepare":"Launch"}</small></div><small>Step {s[0]}</small><h3>{s[2]}</h3><p>{s[3]}</p></article>)}</div><div className="time-note">Average setup time is just <b>5 DAYS</b></div></div></section>

    <StatsSection />

    <MidPageCta />

    <section id="features" className="capabilities section reveal-section"><h2>What You Can Do</h2><p className="intro">Everything your team needs to manage relationships, stock, money, staff and day-to-day operations.</p><div className="carousel-hint"><span>Drag or swipe to explore all capabilities</span><b>{String(slide+1).padStart(2,"0")} / {String(capabilities.length).padStart(2,"0")}</b></div><div ref={carouselRef} onScroll={syncCarousel} className="carousel">{capabilities.map((c,i)=><article className={`${c[2]} ${slide===i?"active":""}`} key={c[0]}><h3>{c[0]}</h3><p>{c[1]}</p><div className="cap-visual"><CapabilityProductVisual name={c[0]}/></div></article>)}</div><div className="carousel-progress"><span>{String(slide+1).padStart(2,"0")} / {String(capabilities.length).padStart(2,"0")}</span><div><i style={{width:`${((slide+1)/capabilities.length)*100}%`}}/></div></div><div className="carousel-controls"><button onClick={()=>setSlide((slide+capabilities.length-1)%capabilities.length)} aria-label="Previous">Previous</button><button onClick={()=>setSlide((slide+1)%capabilities.length)} aria-label="Next">Next</button></div></section>

    <AudienceSpotlight audiences={audiences} />

    <FaqSection />

    <section id="cta" className="cta section reveal-section"><div className="cta-noise"/><div className="cta-copy"><span>ONE BUSINESS. ONE CLEAR VIEW.</span><h2><span>Bring Your Entire Business</span><span>Into One Simple Workspace.</span></h2><p>See what happened, what requires attention, what your team should do next and how your business is performing.</p><a className="button light" href="/book-a-demo">Book a Demo</a></div></section>

    <Footer logo={<img className="westernprise-footer-logo" src="/westernprise-official-logo-white.png" alt="Westernprise" />} brandName="Westernprise" socialLinks={[{icon:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5H3.2V19h3.3V8.5ZM4.9 3.4A1.9 1.9 0 1 0 5 7.2a1.9 1.9 0 0 0-.1-3.8ZM20.8 13c0-3.2-1.7-4.7-4-4.7-1.8 0-2.7 1-3.1 1.7V8.5h-3.3V19h3.3v-5.2c0-1.4.3-2.7 2-2.7 1.7 0 1.7 1.6 1.7 2.8V19h3.4v-6Z"/></svg>,href:"https://linkedin.com",label:"LinkedIn"},{icon:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 3H22l-6.8 7.8L23.2 21H17l-4.8-6.3L6.7 21H3.5l7.2-8.3L1 3h6.3l4.4 5.8L18.9 3Zm-1.1 16h1.7L6.4 4.9H4.6L17.8 19Z"/></svg>,href:"https://x.com",label:"X"}]} mainLinks={[{href:"#how",label:"How It Works"},{href:"#features",label:"Features"},{href:"#audience",label:"Who It’s For"},{href:"#faq",label:"FAQ"},{href:"/book-a-demo",label:"Book a Demo"}]} legalLinks={[{href:"#",label:"Privacy Policy"},{href:"#",label:"Terms"},{href:"#",label:"Cookies"}]} copyright={{text:"© 2026 Westernprise",license:"All rights reserved"}} />
    <Chatbot />
  </main>;
}
