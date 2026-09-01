# The Questions Playbook — What to Ask, Whom, and What the Answer Reveals

> **Why this document exists:** you don't need to out-engineer anyone; you need questions that expose lock-in, hidden costs, governance gaps, operational burden, data limitations, weak evaluations, immature agent capability, and unclear ownership. Each question below names the failure it screens for. Good answers are specific, quantified and demo-able; bad answers are adjectives.

---

## To a VENDOR

1. **"Show me this working on our data, with our permissions, not your demo corpus."** *(Screens: data limitations, permission-blind retrieval — the #1 demo-to-production gap.)*
2. **"What is the all-in cost per completed task at our volume — including credits/actions conversion, and with the human-review ratio your reference customers actually see in production?"** *(Hidden costs; credit-pack opacity; HITL reality vs demo.)*
3. **"If we leave you in 18 months, what exactly do we get out — workflows, evals, embeddings, memory, audit logs — and in what format?"** *(Lock-in; a vendor without a crisp answer is planning your hostage situation.)*
4. **"Which model(s) run under the hood, can we swap them, and can your model access be revoked from the supply side?"** *(Model dependency; BYOM reality; the Cursor lesson.)*
5. **"Walk me through your eval suite for our use case — what's measured, what gates a release, and can we run it ourselves?"** *(Weak evaluations; "we test extensively" is not an answer.)*
6. **"Show me an agent's identity, permission set, and audit trail in your product — and how our policy engine can block one of its tool calls."** *(Governance theatre vs enforcement; agent-washing.)*
7. **"Which of your 'agentic' features run autonomously in production at named customers, and at what human-in-the-loop ratio?"** *(Autonomy inflation; Gartner's ~130-real-vendors finding.)*
8. **"Is our data used for training or product improvement — under exactly which contract clause — and who are the sub-processors?"** *(Data terms; the clause matters more than the marketing page.)*
9. **"Map your 'responsible AI' controls to ISO 42001 / NIST AI RMF — which are enforced at runtime vs written in a policy PDF?"** *(Responsible-AI-as-slogan.)*
10. **"What happens to our contract price when your model costs fall 10× — do we share the deflation?"** *(Pricing asymmetry; capability-cost falls ~50×/year and your price shouldn't be flat forever.)*

## To the CTO / CIO

1. **"Which layer of the stack are we differentiated at, and does our spend map to that?"** *(Strategy: differentiation is almost always data + workflows, not infrastructure.)*
2. **"What's our model portfolio and routing policy — who decided it, and when did we last swap a model on evals?"** *(Single-lab dependency; whether swappability is real or aspirational.)*
3. **"Where is our policy enforcement point for agent tool calls, and who controls it?"** *(The control-plane choke point.)*
4. **"How many agents exist in our estate right now — including SaaS-embedded ones — and where's the register?"** *(Shadow agents; embedded-AI sprawl.)*
5. **"What breaks if our primary AI vendor has a bad quarter, a price rise, or an outage?"** *(Concentration risk, tested not assumed.)*
6. **"Are we betting on protocols (MCP/A2A) or on frameworks — and how much code is portable?"** *(Framework churn.)*

## To the DATA team

1. **"For our top three AI use cases: where does the data live, how fresh is it, and who owns quality?"** *(Data readiness as a gate.)*
2. **"How do document permissions flow into retrieval — what does a query return for a user who *shouldn't* see the source?"** *(The over-permissioned-agent breach generator; demand a demonstration.)*
3. **"What did we embed/index, in whose platform, and can we re-point it?"** *(Data-gravity lock-in accruing silently.)*
4. **"Where does agent memory live, and under what retention and access policy?"** *(A new store of business data nobody classified.)*

## To the AI ARCHITECT

1. **"Why is this an agent and not a workflow?"** *(The single best reliability question; predictable path → workflow.)*
2. **"Show me the eval suite: offline gates, online monitoring, trajectory-level scoring — and the last regression it caught."** *(Evals discipline; a suite that has never caught anything isn't one.)*
3. **"Under whose authority does the agent act — how are user-bound, short-lived, scoped credentials enforced?"** *(Least-privilege delegation vs standing super-user access.)*
4. **"Where could untrusted input, private data, and an exfiltration path meet in this design?"** *(The lethal trifecta; prompt injection is unsolved — containment is the answer.)*
5. **"What's the token budget per task, the cap per agent, and what happens when it's hit?"** *(Runaway loops; FinOps-as-safety.)*
6. **"Which model tier does each step route to, and what would this cost on the cheap tier with the frontier model only where evals demand it?"** *(Routing discipline — the biggest cost lever.)*

## To the BUSINESS OWNER

1. **"What are we actually changing — task, decision, process, or product — and what disappears from the workflow?"** *(Process-redesign failure; the biggest EBIT driver.)*
2. **"What's the measured baseline today, so we can prove impact later?"** *(No baseline = unfalsifiable success theatre.)*
3. **"Who on your team owns this in production — name, budget line, and the capacity you'll redeploy if it works?"** *(Operating-model failure; value that lands in nobody's budget.)*
4. **"What's your change plan and its budget relative to the technology spend?"** *(The 70% that gets 10%.)*

## To PROCUREMENT

1. **"Which pricing model — seat, consumption, outcome — and what's the worst-case monthly bill at P95 usage?"** *(Unbudgetable variance; credit opacity.)*
2. **"How is 'resolution'/'outcome' defined, measured, audited — and what stops it being gamed?"** *(Outcome-definition gaming.)*
3. **"Does this draw down our cloud commit, and is that steering us to a worse product?"** *(The ~$470B commit-economy distortion.)*
4. **"What are the exit provisions: data export, eval export, transition assistance, price protection at renewal?"** *(Negotiate exit at entry — the only time you have leverage.)*

## To SECURITY

1. **"What's our agent inventory, and which agents hold the lethal trifecta today?"** *(Containment posture.)*
2. **"How do we vet and monitor MCP servers and third-party tools — supply chain included?"** *(The malicious-MCP-server incident class; tool-description poisoning.)*
3. **"Can we kill any agent in one step, and have we rehearsed it?"** *(Kill-switch reality.)*
4. **"Do approval interfaces show the actual action payload, or the agent's summary of it?"** *(Trust-exploitation — agents can manipulate what reviewers see.)*
5. **"Have we red-teamed the top deployments, and what did we change afterwards?"** *(Red teaming as practice, not paperwork.)*

## To LEGAL / RISK

1. **"Do any of our AI outputs reach the EU — and are our chatbots disclosed and synthetic content marked, as required *now*?"** *(Art 50 is live; extraterritorial scope.)*
2. **"What's our inventory of automated decision-making affecting individuals, ahead of the 10 December 2026 privacy-policy transparency deadline?"** *(The nearest binding Australian date.)*
3. **"What's our exposure to training-data copyright — given Australia has no TDM exception?"** *(Unhedged legal risk; licences or a documented risk position.)*
4. **"If regulated: how do we evidence the APRA/ASIC AI expectations — board literacy, supply-chain visibility, agentic controls, fallbacks?"** *(Supervisory expectations already in force.)*
5. **"When an agent causes harm, who is accountable — and does our insurance know about our agent estate?"** *(Liability allocation before the incident, not after.)*

---

## The pattern behind the questions

Every question above does one of five jobs: **(1) forces a number** where the pitch offers an adjective; **(2) forces a demonstration** where the pitch offers a slide; **(3) forces a name** where the pitch offers a committee; **(4) forces the after-state** where the pitch describes the tool; **(5) forces the exit** while you still have leverage. If you remember nothing else: *numbers, demos, names, after-states, exits.*
