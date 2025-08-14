import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQComp() {
  return (
    <main className="flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center my-10">
        💡 Frequently Asked Questions (FAQ)
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-1/2"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>What is CodeBurst?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              CodeBurst is an interactive coding revision platform that helps
              you strengthen your programming concepts through bite-sized tasks,
              real-time execution, and smart feedback. It&apos;s designed for
              students, job-seekers, and anyone who wants to master coding
              through practice.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Which programming languages are supported?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Currently, we support JavaScript, Python, and C++. We are actively
              working on adding Java, Go, TypeScript, and more in the near
              future.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Is CodeBurst good for interview preparation?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Absolutely. CodeBurst is designed to help with technical
              interviews by improving your understanding of core concepts,
              syntax, logic-building, and time-bound problem solving.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
