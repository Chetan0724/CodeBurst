import ContactMed from "./ContactMed";

const ContactInfo = () => {
  const contactData = [
    {
      title: "Email Us",
      lines: ["support@codeburst.com", "We'll respond within 24 hours"],
    },
    {
      title: "Call Us",
      lines: ["+91 12345678910", "Mon-Fri 9am-6pm IST"],
    },
    {
      title: "Live Chat",
      lines: ["Available on our platform", "Real-time support while coding"],
    },
    {
      title: "Visit Us",
      lines: ["Rajendra Nagar", "Indore, Madhya Pradesh"],
    },
  ];

  return (
    <div className="bg-primarytwo border rounded-2xl p-5">
      <h6 className="text-2xl font-bold">Get in touch</h6>
      <p className="text-gray-400">
        We&apos;re here to help and answer any question you might have.
      </p>
      <ContactMed contacts={contactData} />
    </div>
  );
};

export default ContactInfo;
