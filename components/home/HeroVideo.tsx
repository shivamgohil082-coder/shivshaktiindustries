export default function HeroVideo() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 opacity-80">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src="\videos\hero.mp4"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
