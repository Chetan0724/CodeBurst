import Contactform from "@/components/contact/Contactform";
import ContactInfo from "@/components/contact/ContactInfo";

const Contact = () => {
  return (
    <main className="mt-32">
      <h2 className="text-6xl font-bold text-center">Contact Us</h2>
      <p className="text-2xl text-gray-400 text-center my-6">
        Have questions about CodeBurst? We&apos;d love to hear from you. Send us
        a message and we&apos;ll respond as soon as possible.
      </p>
      <div className="flex flex-col md:flex-row md:justify-center gap-10">
        <Contactform />
        <ContactInfo />
      </div>
    </main>
  );
};

export default Contact;
