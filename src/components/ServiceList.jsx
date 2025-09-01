import ServiceCard from "./ServiceCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

export default function ServiceList({ services, highlight, loading }) {
  if (loading) {
    return (
      <div className="service-grid">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }
  if (!services.length) {
    return (
      <div className="empty-state">
        <div className="emoji" aria-hidden="true">🕵️‍♂️</div>
        <p>No services match your filters.</p>
      </div>
    );
  }
  return (
    <div className="service-grid">
      {services.map(s => (
        <ServiceCard key={s.id} service={s} highlight={highlight} />
      ))}
    </div>
  );
}