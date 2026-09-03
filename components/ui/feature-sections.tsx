"use client";
import { useState } from "react";

type Logo = readonly [string, string];

export function TrustedCompanies({ logos }: { logos: readonly Logo[] }) {
  return (
    <section className="trusted-showcase reveal-section" aria-labelledby="trusted-title">
      <h2 id="trusted-title">Trusted by teams at leading companies.</h2>
      <div className="trusted-layout">
        <div className="trusted-logo-panel">
          <div className="trusted-marquees">
            <div className="trusted-track track-left">{[...logos,...logos].map(([src,name],i)=><div className="trusted-logo-tile" key={`${name}-${i}`}><img src={src} alt={i<logos.length?`${name} logo`:""}/></div>)}</div>
            <div className="trusted-track track-right">{[...logos.slice().reverse(),...logos.slice().reverse()].map(([src,name],i)=><div className="trusted-logo-tile" key={`${name}-r-${i}`}><img src={src} alt=""/></div>)}</div>
          </div>
          <div className="trusted-copy">
            <h3>Built to connect every operation</h3>
            <p>Bring the tools, records and workflows your business already depends on into one organised system without changing what already works.</p>
          </div>
        </div>
        <div className="trusted-product-panel">
          <img src="/trusted-reference.png" alt="A business professional using Westernprise" />
          <div className="trusted-product-shade" />
          <div className="trusted-product-copy"><h3>Works effortlessly<br/>with your team</h3><div className="trusted-rating-mini"><span>IP</span><span>FC</span><span>UI</span><b>★★★★★</b></div><p>Trusted by forward-thinking organisations</p></div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="stats-section reveal-section" aria-label="Westernprise in numbers">
      <div className="stats-grid">
        <article className="stats-intro"><span>WESTERNPRISE IN NUMBERS</span><h2>Trusted business operations, measured at scale.</h2></article>
        <article className="stat-card"><span>Companies supported</span><strong>85+</strong><p>Organisations managing daily operations with Westernprise</p></article>
        <article className="stat-card"><span>Invoices sent</span><strong>$15M+</strong><p>Invoice value processed across the platform</p></article>
        <article className="stat-card"><span>User rating</span><strong>4.9/5</strong><div className="stat-stars" aria-label="Five star rating">★★★★★</div><p>Average rating from verified business users</p></article>
      </div>
    </section>
  );
}

export function MidPageCta() {
  return (
    <section className="mid-cta-wrap reveal-section">
      <div className="mid-cta">
        <div className="mid-cta-motion" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i}/>)}</div>
        <div><h2>See how Westernprise fits your business.</h2><p>Get a personalised walkthrough of the workflows your team can simplify, connect and control.</p></div>
        <a href="/book-a-demo">View Demo</a>
      </div>
    </section>
  );
}

export function AudienceSpotlight({ audiences }: { audiences: readonly (readonly string[])[] }) {
  const [active, setActive] = useState(0);
  const menuIcons=[
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.4-4 2.3-6 5.5-6s5.1 2 5.5 6M14 15c3.3-.8 5.5.8 6.5 4.5"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Z"/><path d="M4 7.5V17l8 4 8-4V7.5M12 12v9"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>,
  ];
  const operationsItemIcons=[
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="M4 8v8l8 4 8-4V8M12 12v8"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 5V3h8v2M8 10h8M8 14h5"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5-5L7 4l3 3 2.5-2.5a4 4 0 0 0 2 2Z"/><path d="m9.5 6.5-7 7a2.1 2.1 0 0 0 3 3l7-7M14 12l6 6M17 15l2-2 3 3-4 4-3-3 2-2Z"/></svg>,
  ];
  const operationsTaskIcons=[
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M12 4v16"/><circle cx="12" cy="12" r="9"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v12H4zM8 7V4h8v3M8 12h8"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v18H7zM10 7h4M10 11h4M10 15h2"/></svg>,
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM8 9h8M8 13h5M8 17h7"/></svg>,
  ];
  return (
    <section id="audience" className="audience-feature section reveal-section" aria-labelledby="audience-title">
      <div className="audience-feature-grid">
        <div className="audience-visual team-role-visual">
          <div className={`team-workspace team-state-${active}`} key={active}>
            <div className="team-browser"><div><i/><i/><i/></div><span/></div>
            <div className="team-shell"><aside><img className="team-sidebar-logo" src="/westernprise-dashboard-icon.png" alt="" />{menuIcons.map((icon,i)=><span className={i===active?"active":""} key={i}>{icon}</span>)}</aside><main>
              <div className="team-role-tabs">{["Owner","Operations","Sales & finance"].map((x,i)=><button className={active===i?"active":""} onClick={()=>setActive(i)} key={x}>{x}</button>)}</div>
              {active===0&&<div className="owner-surface role-surface"><div className="owner-kpis">{["Performance","Outstanding","Approvals","Activity"].map((x,i)=><article key={x}><small>{x}</small><i className={`owner-shape owner-${i}`}/><span/></article>)}</div><div className="owner-grid"><section><div><small>BUSINESS MOVEMENT</small><span>Current view</span></div><div className="owner-chart">{[34,57,48,72,61,86,70,94].map((h,i)=><i key={i} style={{height:`${h}%`}}><span/></i>)}</div></section><aside><small>APPROVALS</small>{["Document review","Expense approval","Access request"].map((x,i)=><div key={x}><i className={`approval-${i}`}/><span><b>{x}</b><small>Ready for decision</small></span></div>)}</aside></div><footer><span><i/> Complete business view</span><span><i/> Decisions stay visible</span></footer></div>}
              {active===1&&<div className="operations-surface role-surface"><div className="ops-role-summary">{[["Available","Ready"],["Reserved","Allocated"],["Review","Action"]].map((x,i)=><article key={x[0]}><i className={`role-stock-${i}`}/><span><small>{x[0]}</small><b>{x[1]}</b></span></article>)}</div><div className="ops-role-grid"><section><div className="role-table-head"><span>Item</span><span>Category</span><span>Status</span></div>{[["Product item","Stock","Available"],["Business asset","Asset","Review"],["Equipment","Operations","In use"]].map((x,i)=><div className="role-table-row" key={x[0]}><i className={`role-item-${i}`}>{operationsItemIcons[i]}</i><span><b>{x[0]}</b><small>Tracked record</small></span><em>{x[1]}</em><u>{x[2]}</u></div>)}</section><aside><small>WORK QUEUE</small>{["Review availability","Prepare order","Check expense","Update record"].map((x,i)=><div key={x}><i className={`work-${i}`}>{operationsTaskIcons[i]}</i><span><b>{x}</b><small>Assigned workflow</small></span></div>)}</aside></div></div>}
              {active===2&&<div className="finance-surface role-surface"><div className="finance-flow"><article><small>ENQUIRY</small><b>Customer request</b><span>Owner assigned</span></article><i/><article><small>INVOICE</small><b>Document issued</b><span>Balance created</span></article><i/><article><small>PAYMENT</small><b>Money received</b><span>Receipt ready</span></article></div><div className="finance-grid"><section><small>RELATIONSHIP PIPELINE</small>{["New enquiry","Follow-up due","Converted customer"].map((x,i)=><div key={x}><i className={`finance-priority-${i}`}/><span><b>{x}</b><small>Next action visible</small></span><em>{i===2?"Complete":"Open"}</em></div>)}</section><aside><small>ACCOUNT POSITION</small><div className="finance-ring"><i/><b>Connected</b></div><span>Paid <i/></span><span>Outstanding <i/></span></aside></div></div>}
              <div className="team-context-card"><i/><div><small>{["OWNER VIEW","OPERATIONS VIEW","SALES & FINANCE"][active]}</small><b>{["Decisions with complete context","Work queues stay organised","Records stay connected"][active]}</b></div></div>
            </main></div>
          </div>
        </div>
        <div className="audience-feature-copy">
          <div className="eyebrow">WHO IT'S FOR</div>
          <h2 id="audience-title">A clearer way for every team to work</h2>
          <p>Built around real business teams, from owners making decisions to staff handling daily operations.</p>
          <div className="audience-pills">{audiences.map(([title],i)=><button className={active===i?"active":""} onClick={()=>setActive(i)} key={title}>{title}</button>)}</div>
          <a href="/book-a-demo">See how it fits your business</a>
        </div>
      </div>
    </section>
  );
}
