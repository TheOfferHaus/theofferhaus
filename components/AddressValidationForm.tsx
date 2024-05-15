"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { RADAR_VALIDATE_ADDRESS_API_URL } from "@/constants";
import {
  navigateToQuiz,
  createProperty,
  createOffer,
  setFormInProgressTrue,
} from "@/app/actions";
import { US_STATES } from "@/constants";
import { toast } from "sonner";
import {z} from 'zod'


const initialFormData = {
  number: "",
  street: "",
  city: "",
  stateCode: "",
  postalCode: "",
  unit: "",
  countryCode: "US",
};

const addressSchema = z.object({
  number: z.coerce.number({message: "Street number must be a number"}),
  street: z.string({message: "Street name is invalid"}).min(3, {message: "Street name must be at least 3 characters"}),
  city: z.string({message: "City is invalid"}),
  stateCode: z.string(),
  postalCode: z.string({message: "Zipcode is invalid"}),
  unit: z.string({message: "Unit Number is invalid"}).optional(),
  countryCode: z.string()
})

/** Form for validating an address. Makes a request to the radar api on form
 * submit and interacts with the database
 */
export default function AddressValidationForm() {
  const [formData, setFormData] = useState(initialFormData);

  /** handles form submission */
  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const result = addressSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => toast.warning(issue.message))
      return;
    }

    const params = new URLSearchParams({
      city: formData.city,
      stateCode: formData.stateCode,
      postalCode: formData.postalCode,
      countryCode: formData.countryCode,
      number: formData.number,
      street: formData.street,
      unit: formData.unit,
    });

    let verificationData;

    try {
      const radarResponse = await fetch(
        `${RADAR_VALIDATE_ADDRESS_API_URL}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_RADAR_TEST_PUBLISHABLE_API_KEY}`,
          },
        }
      );

      verificationData = await radarResponse.json();
    } catch (err) {
      console.error(err);
      return;
    }

    if (verificationData.result.verificationStatus !== "verified") {
      toast.warning(
        "Please make sure the address has been inputted correctly!"
      );
      return;
    }

    const propertyId = await createProperty(
      verificationData.address.formattedAddress
    );
    const offerId = await createOffer(propertyId);
    await setFormInProgressTrue();
    navigateToQuiz(propertyId, offerId);
  }

  /** updates inputValues. */
  function handleChange(
    evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((formData) => ({
      ...formData,
      [evt.target.name]: evt.target.value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="number" className="font-semibold">
          Street Number:&nbsp;
        </label>
        <input
          type="text"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="ex: 1234"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="street" className="font-semibold">Street Name:&nbsp;</label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="ex: Main Street"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="unit" className="font-semibold">Unit #:&nbsp;</label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="ex: 37"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="city" className="font-semibold">City:&nbsp;</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="ex: San Francisco"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="stateCode" className="font-semibold">State:&nbsp;</label>
        <select
          name="stateCode"
          id="stateCode"
          value={formData.stateCode}
          onChange={handleChange}
          className="border rounded w-full py-2 px-2 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option disabled value="">
            Choose a State
          </option>
          {Object.entries(US_STATES).map(([code, state]) => (
            <option value={code} key={code}>{state}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="postalCode" className="font-semibold">Zipcode:&nbsp;</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="ex: 99999"
          required
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className=" mt-5 px-4 py-2 bg-custom-white text-black font-semibold rounded-lg shadow-md
                hover:bg-black hover:text-white focus:outline-none focus:ring-2
                focus:ring-light-gray focus:ring-opacity-75 transition duration-300
                ease-in-out transform hover:-translate-y-1 hover:scale-10"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
