import Link from "next/link";

const tools = [
  { name: "Lesgenerator", href: "/tools/lesgenerator", desc: "Genereer complete lesplannen met doelen en tijdsindeling." },
  { name: "Toetsvragenmaker", href: "/tools/toetsvragenmaker", desc: "Maak meerkeuze- of open vragen voor elk onderwerp." },
  { name: "Rubriekmaker", href: "/tools/rubriekmaker", desc: "Ontwerp beoordelingsrubrieken in tabelvorm." },
  { name: "Tekstherschrijver", href: "/tools/tekstherschrijver", desc: "Herschrijf teksten naar B1, C1 of leerlingentaal." },
  { name: "Taalcoach", href: "/tools/taalcoach", desc: "Krijg feedback en verbeteringen op zinnen." },
  { name: "Presentatiegenerator", href: "/tools/presentatiegenerator", desc: "Genereer een slide-outline voor je presentatie." },
];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Onze AI Tools</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="block group">
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:border-primary transition-colors h-full p-6">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}