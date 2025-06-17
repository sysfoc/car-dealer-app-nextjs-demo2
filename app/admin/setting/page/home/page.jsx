"use client";
import { useState, useRef } from "react";
import {
  Button,
  Textarea,
  TextInput,
  Select,
  Label,
} from "flowbite-react";
import Swal from "sweetalert2";

const Page = () => {
  const [activeSection, setActiveSection] = useState("SEO Section");
  const [isSaving, setIsSaving] = useState(false);
  
  const sections = [
    "SEO Section",
    "Search Section",
    "Brand Section",
    "Listing Section",
    "Chooseus Section",
    "Footer",
  ];

  const refs = {
    title: useRef(null),
    metaDescription: useRef(null),
    searchHeading: useRef(null),
    searchText: useRef(null),
    brandHeading: useRef(null),
    brandSubheading: useRef(null),
    brandItems: useRef(null),
    brandStatus: useRef(null),
    listingHeading: useRef(null),
    listingSubheading: useRef(null),
    listingItems: useRef(null),
    listingStatus: useRef(null),
    chooseusHeading: useRef(null),
    chooseusFirstHeading: useRef(null),
    chooseusFirstDescription: useRef(null),
    chooseusSecondHeading: useRef(null),
    chooseusSecondDescription: useRef(null),
    chooseusThirdHeading: useRef(null),
    chooseusThirdDescription: useRef(null),
    chooseusFourthHeading: useRef(null),
    chooseusFourthDescription: useRef(null),
    mondayHr: useRef(null),
    tuesdayHr: useRef(null),
    wednesdayHr: useRef(null),
    thursdayHr: useRef(null),
    fridayHr: useRef(null),
    saturdayHr: useRef(null),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData();
    Object.entries(refs).forEach(([key, ref]) => {
      formData.append(key, ref.current?.value || "");
    });

    try {
      const response = await fetch("/api/homepage", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Homepage settings saved successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.error || "Failed to save settings",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred",
        icon: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Edit Homepage
                </h1>
                <p className="text-slate-600">
                  Customize your website homepage content and settings
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="text-right mr-6">
                  <p className="text-sm text-slate-500">Active Section</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {activeSection}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Navigation */}
            <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section}
                    className={`cursor-pointer rounded-xl p-4 transition-all duration-200 ${
                      activeSection === section
                        ? "bg-indigo-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 w-2 h-2 rounded-full ${
                        activeSection === section ? "bg-white" : "bg-indigo-500"
                      }`}></div>
                      <span className="font-medium">{section}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="w-full md:w-3/4 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SEO Section */}
                {activeSection === "SEO Section" && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      SEO Settings
                    </h2>
                    <div className="mb-4">
                      <Label htmlFor="title" className="block mb-2 font-medium text-slate-700">
                        Page Title
                      </Label>
                      <TextInput 
                        id="title" 
                        ref={refs.title} 
                        placeholder="Homepage title for SEO"
                        className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta-description" className="block mb-2 font-medium text-slate-700">
                        Meta Description
                      </Label>
                      <Textarea
                        id="meta-description"
                        ref={refs.metaDescription}
                        rows={5}
                        placeholder="Description for search engines"
                        className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Search Section */}
                {activeSection === "Search Section" && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Search Section
                    </h2>
                    <div className="mb-4">
                      <Label htmlFor="search-heading" className="block mb-2 font-medium text-slate-700">
                        Heading
                      </Label>
                      <Textarea
                        id="search-heading"
                        ref={refs.searchHeading}
                        rows={2}
                        placeholder="Main heading text"
                        className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="search-text" className="block mb-2 font-medium text-slate-700">
                        Description Text
                      </Label>
                      <Textarea 
                        id="search-text" 
                        ref={refs.searchText}
                        rows={2} 
                        placeholder="Supporting text below the heading"
                        className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Brand Section */}
                {activeSection === "Brand Section" && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Brand Section
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Heading
                        </Label>
                        <TextInput
                          ref={refs.brandHeading}
                          placeholder="Brand section title"
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Subheading
                        </Label>
                        <TextInput
                          ref={refs.brandSubheading}
                          placeholder="Brand section subtitle"
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Number of Brands
                        </Label>
                        <TextInput
                          type="number"
                          ref={refs.brandItems}
                          placeholder="Total brand items to display"
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Section Status
                        </Label>
                        <Select 
                          ref={refs.brandStatus}
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="inactive">Inactive</option>
                          <option value="active">Active</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Listing Section */}
                {activeSection === "Listing Section" && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Vehicle Listings Section
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Heading
                        </Label>
                        <TextInput
                          ref={refs.listingHeading}
                          placeholder="Listing section title"
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Subheading
                        </Label>
                        <TextInput
                          ref={refs.listingSubheading}
                          placeholder="Listing section subtitle"
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Number of Listings
                        </Label>
                        <TextInput
                          type="number"
                          ref={refs.listingItems}
                          placeholder="Total listings to display"
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <Label className="block mb-2 font-medium text-slate-700">
                          Section Status
                        </Label>
                        <Select 
                          ref={refs.listingStatus}
                          className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="inactive">Inactive</option>
                          <option value="active">Active</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chooseus Section */}
                {activeSection === "Chooseus Section" && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Why Choose Us Section
                    </h2>
                    <div className="mb-4">
                      <Label className="block mb-2 font-medium text-slate-700">
                        Main Heading
                      </Label>
                      <TextInput
                        ref={refs.chooseusHeading}
                        placeholder="Section title"
                        className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="bg-slate-50 p-4 rounded-xl">
                          <h3 className="font-semibold text-slate-700 mb-3">
                            Feature #{num}
                          </h3>
                          <div className="mb-3">
                            <Label className="block mb-2 text-slate-600">
                              Heading
                            </Label>
                            <TextInput
                              ref={refs[`chooseus${['First', 'Second', 'Third', 'Fourth'][num-1]}Heading`]}
                              placeholder={`Feature ${num} title`}
                              className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <Label className="block mb-2 text-slate-600">
                              Description
                            </Label>
                            <Textarea
                              ref={refs[`chooseus${['First', 'Second', 'Third', 'Fourth'][num-1]}Description`]}
                              rows={3}
                              placeholder={`Feature ${num} description`}
                              className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Section */}
                {activeSection === "Footer" && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Business Hours
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { day: "Monday", ref: refs.mondayHr },
                        { day: "Tuesday", ref: refs.tuesdayHr },
                        { day: "Wednesday", ref: refs.wednesdayHr },
                        { day: "Thursday", ref: refs.thursdayHr },
                        { day: "Friday", ref: refs.fridayHr },
                        { day: "Saturday", ref: refs.saturdayHr },
                      ].map(({ day, ref }) => (
                        <div key={day} className="bg-slate-50 p-4 rounded-lg">
                          <Label className="block mb-2 font-medium text-slate-700">
                            {day}
                          </Label>
                          <TextInput
                            ref={ref}
                            placeholder={`${day} hours`}
                            className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;