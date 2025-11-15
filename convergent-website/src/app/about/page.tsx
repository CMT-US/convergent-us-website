import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Company Overview Section */}
      <section className="pt-16 pb-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Company Overview
          </h1>
          
          <div className="prose prose-lg mx-auto text-gray-600 space-y-6">
            <p>
              Convergent Manufacturing Technologies US (CMT-US) was founded in early 2015 by Brian Coxon 
              to provide digital manufacturing solutions for complex, high value composite parts to US customers. 
              Services include composites process simulation and consulting, materials characterization and 
              modeling, and research & development of hardware and software.
            </p>
            
            <p>
              <strong>CMT-US&apos;s primary goals are twofold:</strong>
            </p>
            
            <p>
              · To take cutting edge, physics-based process modeling and work with customers to show how it 
              can be pragmatically implemented to solve or mitigate their problems.
            </p>
            
            <p>
              · To develop effective, pragmatic, and industry focused products and solutions to make 
              composites manufacturing lower risk at every stage of the process
            </p>
            
            <p>
              CMT-US has successfully sought and renewed government funding for projects that both advance 
              composites modeling knowledge and result in a customer facing simulation product that reduces 
              risk in manufacturing. Current research interests include AFP, cure defects, infusion, 
              additive manufacturing, and effects of defects.
            </p>
            
            <p>
              CMT-US is a US owned and controlled company, staffed by US persons and capable of working 
              on export or ITAR controlled programs.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Leadership Team
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Brian Coxon */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/images/team/brian-coxon.jpg"
                  alt="Brian Coxon"
                  width={350}
                  height={466}
                  className="rounded-lg w-48 h-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Brian Coxon
              </h3>
              <h4 className="text-lg font-medium text-blue-600 mb-6">
                President & Chief Engineering Officer
              </h4>
              
              <div className="text-gray-600 space-y-4 text-sm leading-relaxed">
                <p>
                  Brian Coxon has an outstanding record of commercialization of science and technology 
                  in the aerospace industry. He received a B.S. in Aerospace Engineering from Iowa State 
                  University and started his career with Boeing Commercial Airplane&apos;s Advanced Composite
                  Development Group as a Stress Engineer. He left Boeing to pursue his Master&apos;s Degree in 
                  Chemical Engineering with a focus on composite process, structure, and property 
                  interactions on high temperature and thermoplastic composites.
                </p>
                
                <p>
                  After achieving his M.Sc. in 1988, Mr. Coxon formed Integrated Technologies, Inc. (Intec) 
                  with a focus on advanced materials testing and manufacturing services. At Intec, 
                  Mr. Coxon grew the company to over 60 employees, focusing on advancing engineering knowledge, 
                  helping both materials suppliers and major OEM customers to design, analyze, and 
                  productionize composite structures. As majority owner, Mr. Coxon negotiated Intec&apos;s 
                  acquisition by LMI Aerospace in 2009 and stayed on as General Manager and later, 
                  Director of Innovation, Research, and Development.
                </p>
                
                <p>
                  In 2012, Mr. Coxon was promoted to Executive Director of Innovation and Technology for LMI, 
                  reporting to the CEO. In this role, Mr. Coxon was charged with scaling and productionizing 
                  emergent technologies and development projects into the engineering, tooling, and 
                  manufacturing production streams at LMI as well as managing the company&apos;s IP portfolio.
                </p>
                
                <p>
                  In 2015, Mr. Coxon formed Convergent Manufacturing Technologies US Inc. (CMT-US),
                  a &quot;C&quot; Corporation, of which he is the majority owner and President. CMT-US is dedicated 
                  to using the most advanced simulation tools available to reduce composite manufacturing 
                  costs, where he has led the several research efforts to advance composites process simulation.
                </p>
              </div>
            </div>

            {/* Curtis Hickmott */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/images/team/curtis-hickmott.jpg"
                  alt="Curtis Hickmott, PhD"
                  width={241}
                  height={322}
                  className="rounded-lg w-48 h-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Curtis Hickmott, PhD
              </h3>
              <h4 className="text-lg font-medium text-blue-600 mb-6">
                Lead Applications Engineer
              </h4>
              
              <div className="text-gray-600 space-y-4 text-sm leading-relaxed">
                <p>
                  Curtis Hickmott received his Ph.D. degree in Material Science and Engineering from 
                  the University of Washington in 2015, studying processing of complex composite structures. 
                  He received his M.Sc. and B.Sc. degrees as well in Materials Science and Engineering 
                  from the University of Washington.
                </p>
                
                <p>
                  Curtis&apos;s background includes work in the fields of composite processing methods, 
                  materials characterization techniques, mechanical testing of composite structures 
                  and modeling of thermal profiles through composite structure during cure. Before 
                  joining CMT-US in 2016, Curtis completed his thesis studying thermal profiles in 
                  complex composite structures developed using novel tooling methods.
                </p>
                
                <p>
                  At CMT-US, Curtis leads the Process Modeling area as well as program management 
                  for R&D funded work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}