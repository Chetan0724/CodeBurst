"use client";
import { Button } from "../ui/button";

const Contactform = () => {
  const handleSubmit = () => {};

  return (
    <div className="bg-primarytwo border rounded-2xl p-5">
      <h6 className="text-2xl font-bold">Send us a message</h6>
      <p className="py-3">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="">
              Name
            </label>

            <input
              className="bg-primaryone border rounded-md py-2 px-4"
              type="text"
              name=""
              id=""
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="">
              Email
            </label>

            <input
              className="bg-primaryone border rounded-md py-2 px-4"
              type="email"
              name=""
              id=""
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="">
            Subject
          </label>
          <input
            className="bg-primaryone border rounded-md py-2 px-4"
            type="text"
            name=""
            id=""
            placeholder="What's this about?"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="">
            Message
          </label>
          <textarea
            rows={5}
            cols={30}
            className="bg-primaryone border rounded-md py-2 px-4"
            placeholder="Tell us more about your inquiry..."
          ></textarea>
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default Contactform;
