interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span
      className="
      inline-flex
      rounded-full
      bg-orange-100
      px-5
      py-2
      text-sm
      font-semibold
      uppercase
      tracking-wider
      text-orange-600
      "
    >
      {children}
    </span>
  );
}