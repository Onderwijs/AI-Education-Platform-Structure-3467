import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
        AI in het onderwijs <br />
        <span className="text-primary">Tools, lessen & trainingen</span>
      </h1>
      <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10">
        Bespaar tijd en verhoog de kwaliteit van je lessen met onze slimme AI-generatoren.
      </p>
      <div className="flex gap-4 flex-col sm:flex-row">
        <Link 
          href="/tools" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Bekijk alle tools
        </Link>
        <Link 
          href="/tools/lesgenerator" 
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Probeer Lesgenerator
        </Link>
      </div>
    </div>
  );
}