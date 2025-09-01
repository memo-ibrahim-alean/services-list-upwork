export default function SkeletonCard() {
  return (
    <div className="service-card skeleton-card" aria-hidden="true">
      <div className="skel skel-title" />
      <div className="skel skel-badges" />
      <div className="skel skel-line" />
      <div className="skel skel-line short" />
    </div>
  );
}