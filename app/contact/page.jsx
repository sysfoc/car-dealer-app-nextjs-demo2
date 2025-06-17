import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-700">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              Get in Touch
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Have questions or want to work with us? Fill out the form below,
              and we’ll get back to you as soon as possible.
            </p>
            <form>
              <div className="mb-4">
                <Label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </Label>
                <TextInput type="text" id="name" placeholder="John Doe" />
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </Label>
                <TextInput
                  type="email"
                  id="email"
                  placeholder="john@gmail.com"
                />
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                ></Textarea>
              </div>
              <Button type="submit" color={"blue"} className="w-full">
                Send Message
              </Button>
            </form>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-700">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              Contact Information
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              You can also reach us through the following contact methods.
            </p>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Address
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
              {process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
              {process.env.NEXT_PUBLIC_CONTACT_PHONE}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Working Hours
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
              {process.env.NEXT_PUBLIC_CONTACT_WORKING_HOURS}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
            Find Us Here
          </h2>
          <div className="overflow-hidden rounded-lg shadow-md">
            <iframe
              className="h-96 w-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093775!2d144.95373531520247!3d-37.81720974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771f65c7df2a0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1615187682734!5m2!1sen!2sau"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
