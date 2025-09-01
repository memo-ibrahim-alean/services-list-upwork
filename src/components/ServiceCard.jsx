import { findSubgroup } from "../data/taxonomyUtils.js";

export default function ServiceCard({ service, highlight }) {
  const subgroup = findSubgroup(service.subgroupId);
  return (
    <article className="service-card" tabIndex="0">
      <header className="card-head">
        <h3 className="service-name">
          {highlight ? highlightText(service.name, highlight) : service.name}
        </h3>
      </header>
      <div className="meta">
        {subgroup && (
          <>
            <span className="badge" title={subgroup.typeLabel}>{shortType(subgroup.typeLabel)}</span>
            <span className="badge secondary" title={subgroup.groupLabel}>{truncate(subgroup.groupLabel,14)}</span>
            <span className="badge outline">{truncate(subgroup.label,16)}</span>
          </>
        )}
        {service.priceTier && (
          <span className="badge outline" title="Price tier">{service.priceTier}</span>
        )}
        {service.rating && (
          <span className="badge outline" title="Average rating">★ {service.rating}</span>
        )}
      </div>
      <p className="summary">
        {highlight ? highlightText(service.summary, highlight) : service.summary}
      </p>
      {service.tags?.length > 0 && (
        <ul className="tag-row">
          {service.tags.map(t => <li key={t}>{t}</li>)}
        </ul>
      )}
    </article>
  );
}

function shortType(t){
  if (/B2C/i.test(t)) return "B2C";
  if (/B2B/i.test(t)) return "B2B";
  return t.split(" ")[0];
}
function truncate(str,len){
  return str.length>len ? str.slice(0,len-1)+"…" : str;
}
function escapeReg(str){ return str.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
function highlightText(text, term){
  const re = new RegExp(escapeReg(term), "ig");
  return text.split(re).reduce((acc,part,i,arr)=>{
    acc.push(part);
    if(i< arr.length-1){
      const match = text.match(re)[i];
      acc.push(<mark key={i}>{match}</mark>);
    }
    return acc;
  },[]);
}