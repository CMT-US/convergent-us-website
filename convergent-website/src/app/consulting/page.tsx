import ContactForm from '@/components/ui/ContactForm';

export default function Consulting() {
  const processes = [
    { id: 'heatblanket', title: 'Heat Blanket & Heat Blanket Process Design' },
    { id: 'autoclave', title: 'Autoclave & Oven' },
    { id: 'closedmold', title: 'Closed Mold' },
    { id: 'afp', title: 'Automated Fiber Placement' },
    { id: 'infusion', title: 'Infusion' },
    { id: 'weld', title: 'Secondary Bonding & Weld' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Consulting Services
          </h1>
        </div>
      </section>

      {/* Typical Processes */}
      <section className="pt-8 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Typical Processes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processes.map((process) => (
              <div key={process.id} id={process.id} className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {process.title}
                </h3>
                <p className="text-orange-600 font-medium">
                  Under construction
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h2>
            <p className="text-gray-600">
              Interested in our work? Please provide us with your details, and our team will reach out to you promptly. 
              We look forward to exploring opportunities together!
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}