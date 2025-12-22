import Link from 'next/link';

type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  link?: string;
  category?: 'Journal' | 'Conference' | 'Whitepaper' | 'Presentation' | 'Book Chapter';
};

const publications: Publication[] = [
  {
    title: 'A Numerical and Experimental Approach for Modeling Porosity Due to Entrapped Air and Volatiles Off-gassing During Manufacturing of Composite Structures',
    authors: 'Hickmott, C.; Forghani, A.; Hutten, V.; Lorbiecki, E.; Palmieri, F.; Grimsley, B.; Coxon, B.; Fernlund, G.; Poursartip, A.',
    venue: 'SAMPE 2019 Technical Conference and Exhibition, Charlotte, NC',
    year: 2019,
    link: 'https://doi.org/10.33599/nasampe/s.19.1627',
    category: 'Conference',
  },
  {
    title: 'A Validation Study of a Physics-based Tack Model for an Automated Fiber Placement Process Simulation',
    authors: 'Hutten, V.; Forghani, A.; Silva, P.; Hickmott, C.; Sreekantamurthy, T.; Wohl, C.; Grimsley, B.; Coxon, B.; Poursartip, A.',
    venue: 'SAMPE 2019 Technical Conference and Exhibition',
    year: 2019,
    link: 'https://doi.org/10.33599/nasampe/s.19.1512',
    category: 'Conference',
  },
  {
    title: 'Characterization of Prepreg Tack for Composite Manufacturing by Automated Fiber Placement',
    authors: 'Wohl, C.; Hickmott, C.; Hutten, V.; Forghani, A.; Palmieri, F.; Grimsley, B.',
    venue: '2019 Annual Meeting of the Adhesion Society',
    year: 2019,
    category: 'Conference',
  },
  {
    title: 'Numerical and Experimental Study of Local Resin Pressure for the Manufacturing of Composite Structures and their Effect on Porosity',
    authors: 'Bedayat, H.; Forghani, A.; Hickmott, C.; Palmieri, F.; Grimsley, B.; Coxon, B.; Fernlund, G.; Poursartip, A.',
    venue: 'SAMPE 2018 Technical Conference and Exhibition, Long Beach, CA',
    year: 2018,
    category: 'Conference',
  },
  {
    title: 'Experimental Calibration of a Numerical Model of Prepreg Tack for Predicting AFP Process Related Defects',
    authors: 'Forghani, A.; Hickmott, C.; Hutten, V.; Bedayat, H.; Wohl, C.; Grimsley, B.; Coxon, B.; Poursartip, A.',
    venue: 'SAMPE 2018 Technical Conference and Exhibition',
    year: 2018,
    category: 'Conference',
  },
  {
    title: 'An Efficient Modelling Approach for Prediction of Porosity Severity in Composite Structures',
    authors: 'Bedayat, H.; Forghani, A.; Hickmott, C.; Roy, M.; Palmieri, F.; Grimsley, B.; Coxon, B.; Fernlund, G.',
    venue: 'Proceedings of the Society for the Advancement of Material and Process Engineering',
    year: 2017,
    category: 'Conference',
  },
  {
    title: 'Simulation of Gas and Resin Transport Mechanisms in Manufacturing Process of Composite Structures and Their Effect on Porosity',
    authors: 'Bedayat, H.; Roy, M.; Forghani, A.; Hickmott, C.; Palmieri, F.; Grimsley, B.; Coxon, B.; Fernlund, G.; Poursartip, A.',
    venue: 'American Society for Composites Proceedings',
    year: 2017,
    link: 'https://doi.org/10.12783/asc2017/15212',
    category: 'Conference',
  },
  {
    title: 'A Physics-Based Approach to Simulation of Prepreg Tack in AFP Process',
    authors: 'Forghani, A.; Hickmott, C.; Bedayat, H.; Wohl, C.; Grimsley, B.; Coxon, B.; Poursartip, A.',
    venue: 'Proc. Society for the Advancement of Material and Process Engineering',
    year: 2017,
    category: 'Conference',
  },
  {
    title: 'Simulating Prepreg Tack in AFP Process',
    authors: 'Forghani, A.; Hickmott, C.; Bedayat, H.; Wohl, C.; Grimsley, B.; Coxon, B.; Poursartip, A.',
    venue: 'American Society for Composites Proceedings',
    year: 2017,
    link: 'https://doi.org/10.12783/asc2017/15214',
    category: 'Conference',
  },
  {
    title: 'Tack Measurements of Prepreg Tape at Variable Temperature and Humidity',
    authors: 'Wohl, C.; Palmieri, F.; Forghani, A.; Hickmott, C.; Bedayat, H.; Coxon, B.; Poursartip, A.; Grimsley, B.',
    venue: 'Society for the Advancement of Material and Process Engineering',
    year: 2017,
    category: 'Conference',
  },
  {
    title: 'Non-Penetrating Impact Behavior of CFRP at Low and Intermediate Velocities',
    authors: 'Delfosse, D.; Poursartip, A.; Coxon, B.; Dost, E.',
    venue: 'Composite Materials: Fatigue and Fracture: Fifth Volume, ASTM International',
    year: 1995,
    link: 'https://doi.org/10.1520/STP14023S',
    category: 'Book Chapter',
  },
  {
    title: 'Effects of Stacking Sequence on Impact Damage Resistance and Residual Strength for Quasi-Isotropic Laminates',
    authors: 'Dost, E.; Ilcewicz, L.; Avery, W.; Coxon, B.',
    venue: 'Composite Materials: Fatigue and Fracture (Third Volume), ASTM International',
    year: 1991,
    link: 'https://doi.org/10.1520/STP17733S',
    category: 'Book Chapter',
  },
];

function groupByYear(items: Publication[]) {
  return items.reduce<Record<number, Publication[]>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});
}

export default function PublicationsPage() {
  const grouped = groupByYear(publications);
  const years = Object.keys(grouped)
    .map((year) => parseInt(year, 10))
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Publications</h1>
          <p className="text-lg text-blue-100">
            Selected papers, presentations, and technical notes on composite process simulation,
            thermal management, and digital twin deployment.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {years.map((year) => (
            <div key={year} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                  {year}
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="space-y-6">
                {grouped[year].map((pub, idx) => (
                  <div
                    key={`${year}-${idx}-${pub.title}`}
                    className="border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{pub.title}</h2>
                        <p className="text-gray-600 text-sm">{pub.authors}</p>
                        <p className="text-gray-500 text-sm">
                          {pub.category ? `${pub.category} • ` : ''}
                          {pub.venue}
                        </p>
                      </div>
                      {pub.link && (
                        <Link
                          href={pub.link}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                          <svg
                            className="ml-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.5 4.5h6v6m0-6L10.5 13.5m-6-3v9h9"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
