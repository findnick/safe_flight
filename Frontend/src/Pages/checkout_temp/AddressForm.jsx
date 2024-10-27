import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import moment from "moment";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({
  setFirstName,
  setLastName,
  setAddressLine1,
  setAddressLine2,
  setCity,
  setState,
  setZip,
  setCountry,
  guestList = [],
  quoteObject = {},
  setObject,
}) {
  let tempGuest = guestList.map(() => {
    return { given_name: "", family_name: "", born_on: "" };
  });

  const [birthErrors, setBirthErrors] = React.useState([]);
  const handleBirthDates = (value, index) => {
    const birth = moment(value);
    const age = Math.abs(birth.diff(moment(), "years"));
    const dobs = [...birthErrors];
    dobs[index] = age < 18 && true;
    setBirthErrors(dobs);
  };

  return (
    <>
      <Grid container spacing={3}>
        <FormGrid item xs={12}>
          <div className="text-lg font-medium">Contact Information</div>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="email">Email *</FormLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder=""
            autoComplete="shipping email"
            required
            defaultValue={quoteObject.email}
            onChange={(e) => {
              quoteObject.email = e.target.value;
              setObject(quoteObject);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="phone">Phone *</FormLabel>
          <OutlinedInput
            id="phone"
            name="phone"
            type="text"
            placeholder=""
            autoComplete="shipping phone"
            required
            defaultValue={quoteObject.phone_number}
            onChange={(e) => {
              quoteObject.phone_number = e.target.value;
              setObject(quoteObject);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <hr />
        </FormGrid>
        <FormGrid item xs={12}>
          <div className="text-lg font-medium">Special Preferences</div>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="email">Stays Special Request *</FormLabel>
          <OutlinedInput
            id="stay_special_requests"
            name="stay_special_requests"
            type="text"
            placeholder="2:00 PM early check-in required"
            autoComplete="shipping stay-special-request"
            required
            defaultValue={quoteObject.stay_special_requests}
            onChange={(e) => {
              quoteObject.stay_special_requests = e.target.value;
              setObject(quoteObject);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="email">Accommodation Special Request *</FormLabel>
          <OutlinedInput
            id="accommodation_special_requests"
            name="accommodation_special_requests"
            type="text"
            placeholder="2:00 PM early check-in required"
            autoComplete="shipping accommodation-special-request"
            required
            defaultValue={quoteObject.accommodation_special_requests}
            onChange={(e) => {
              quoteObject.accommodation_special_requests = e.target.value;
              setObject(quoteObject);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <hr />
        </FormGrid>
        {guestList.map((guest, i) => {
          return (
            <>
              <FormGrid item xs={12}>
                <div className="text-lg font-medium">Guest {i + 1}</div>
              </FormGrid>
              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                  Given name
                </FormLabel>
                <OutlinedInput
                  id="first-name"
                  name="first-name"
                  type="name"
                  placeholder="John"
                  autoComplete="first name"
                  required
                  defaultValue={quoteObject.guests[i].given_name}
                  onChange={(e) => {
                    quoteObject.guests[i].given_name = e.target.value;
                    setObject(quoteObject);
                    // setFirstName(e.target.value);
                  }}
                />
              </FormGrid>
              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name" required>
                  Family name
                </FormLabel>
                <OutlinedInput
                  id="last-name"
                  name="last-name"
                  type="last-name"
                  placeholder="Snow"
                  autoComplete="last name"
                  required
                  defaultValue={quoteObject.guests[i].family_name}
                  onChange={(e) => {
                    quoteObject.guests[i].family_name = e.target.value;
                    setObject(quoteObject);
                    // setLastName(e.target.value);
                  }}
                />
              </FormGrid>
              <FormGrid item xs={12}>
                <FormLabel htmlFor="state" required>
                  Birth Date
                </FormLabel>
                {birthErrors[i] && (
                  <span className="text-sm font-normal text-red-600 mb-1">
                    * Guest should be above 18 years of age.
                  </span>
                )}
                <OutlinedInput
                  id="state"
                  name="state"
                  type="date"
                  placeholder="NY"
                  autoComplete="State"
                  required
                  defaultValue={quoteObject.guests[i].born_on}
                  onChange={(e) => {
                    handleBirthDates(e.target.value, i);
                    quoteObject.guests[i].born_on = e.target.value;
                    setObject(quoteObject);
                  }}
                />
              </FormGrid>
            </>
          );
        })}
        <FormGrid item xs={12}>
          <hr />
        </FormGrid>
        <FormGrid item xs={12}>
          <div className="text-lg font-medium">Billing Address</div>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address1" required>
            Address line 1
          </FormLabel>
          <OutlinedInput
            id="address1"
            name="address1"
            type="address1"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            required
            onChange={(e) => {
              setAddressLine1(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address2">Address line 2</FormLabel>
          <OutlinedInput
            id="address2"
            name="address2"
            type="address2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            autoComplete="shipping address-line2"
            required
            onChange={(e) => {
              setAddressLine2(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            type="city"
            placeholder="New York"
            autoComplete="shipping city"
            required
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="state" required>
            State
          </FormLabel>
          <OutlinedInput
            id="state"
            name="state"
            type="state"
            placeholder="NY"
            autoComplete="shipping state"
            required
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            required
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            required
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
    </>
  );
}
