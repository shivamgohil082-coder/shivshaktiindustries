interface Props {
  subtitle: string;
  title: string;
  description?: string;
  center?: boolean;
  badge?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  center = true,
}: Props) {
  return (
    <div
      className={`mb-16 ${
        center ? "text-center" : ""
      }`}
    >
      <span className="font-semibold uppercase tracking-[4px] text-orange-500">
        {subtitle}
      </span>

      <h2 className="mt-4 text-4xl font-bold text-[#0A2342] md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}