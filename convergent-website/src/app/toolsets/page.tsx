import ContactForm from '@/components/ui/ContactForm';
import VideoPlayer from '@/components/ui/VideoPlayer';

export default function Toolsets() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Our Toolsets
          </h1>
        </div>
      </section>

      {/* Toolsets Content */}
      <section className="pt-8 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              OSPREY
            </h2>
            <div className="mb-6">
              <VideoPlayer src="/videos/osprey-demo.mp4" />
            </div>
            <div className="text-gray-600">
              <p className="text-lg font-semibold text-orange-600">
                Content under development
              </p>
            </div>
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