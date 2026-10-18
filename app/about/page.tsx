import { PageIntro } from "@/components/PageIntro";
import { portfolio } from "@/data/portfolio";

export default function AboutPage() {
  return (
    <div className="container page-container">
      <PageIntro eyebrow="A little about me" title="About" description={portfolio.intro} />
      <section className="content-panel" aria-labelledby="education-heading">
        <p className="eyebrow">Education</p><h2 id="education-heading">{portfolio.education.school}</h2>
        <p>{portfolio.education.degree}</p><p className="muted">{portfolio.education.location} · {portfolio.education.dates}</p>
        <p>{portfolio.education.distinction} · GWA {portfolio.education.gwa}</p>
        <h3>Relevant coursework</h3><ul className="tag-list">{portfolio.education.coursework.map((course) => <li key={course}>{course}</li>)}</ul>
      </section>
      <section className="section-block"><p className="eyebrow">Tools I use</p><div className="skills-grid">{Object.entries(portfolio.skills).map(([group, items]) => <div className="skill-group" key={group}><h2>{group}</h2><ul className="tag-list">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
    </div>
  );
}
