import Link from 'next/link';
import Image from 'next/image';

interface ProcessIconProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

export default function ProcessIcon({ title, href, icon, description }: ProcessIconProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center p-6 text-center bg-white rounded-xl border border-gray-200 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-300"
    >
      <div className="mb-3 text-blue-600 group-hover:text-blue-700 transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      )}
    </Link>
  );
}

// Process Icon Components
export function HeatBlanketIcon() {
  return (
    <Image
      src="/images/icons/heat-blanket.png"
      alt="Heat Blanket"
      width={85}
      height={85}
      className="w-16 h-16"
    />
  );
}

export function AutoclaveIcon() {
  return (
    <Image
      src="/images/icons/autoclave.png"
      alt="Autoclave & Oven"
      width={85}
      height={85}
      className="w-16 h-16"
    />
  );
}

export function ClosedMoldIcon() {
  return (
    <Image
      src="/images/icons/closed-mold.png"
      alt="Closed Mold"
      width={89}
      height={89}
      className="w-16 h-16"
    />
  );
}

export function AFPIcon() {
  return (
    <Image
      src="/images/icons/afp.png"
      alt="AFP"
      width={85}
      height={85}
      className="w-16 h-16"
    />
  );
}

export function InfusionIcon() {
  return (
    <Image
      src="/images/icons/infusion.png"
      alt="Infusion"
      width={89}
      height={89}
      className="w-16 h-16"
    />
  );
}

export function BondingIcon() {
  return (
    <Image
      src="/images/icons/bonding.png"
      alt="Bonding & Weld"
      width={85}
      height={85}
      className="w-16 h-16"
    />
  );
}