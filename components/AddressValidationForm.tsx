"use client";

import React, { ChangeEvent, useState } from "react";

const initialFormData = {
  number: "",
  street: "",
  city: "",
  stateCode: "",
  postalCode: "",
  countryCode: "US",
};

/** Form for validating an address. Makes a request to the radar api on form
 * submit and interacts with the database
 */
export default function AddressValidationForm() {
  const [formData, setFormData] = useState(initialFormData);

  // Function to handle form submission
  async function handleSubmit() {}

  /** updates inputValues. */
  function handleChange(evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((formData) => ({
      ...formData,
      [evt.target.name]: evt.target.value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="number">Street Number:</label>
        <input
          type="text"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="street">Street Name:</label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="state-code">State:</label>
        <select name="state-code" id="state-code" onChange={handleChange}>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </div>
      <div>
        <label htmlFor="postal-code">Zipcode:</label>
        <input
          type="text"
          id="postal-code"
          name="postal-code"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="country-code">Country:</label>
        <input
          type="text"
          id="country-code"
          name="country-code"
          value={formData.countryCode}
          disabled
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
