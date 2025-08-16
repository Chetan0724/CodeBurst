type Contact = {
  title: string;
  lines: string[];
};

type ContactMedProps = {
  contacts: Contact[];
};

const ContactMed = ({ contacts }: ContactMedProps) => {
  return (
    <div className="flex flex-col gap-5">
      {contacts.map((contact) => (
        <div key={contact.title}>
          <p className="text-xl font-semibold">{contact.title}</p>
          {contact.lines.map((line) => (
            <p className="text-lg text-gray-400" key={line}>
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContactMed;
