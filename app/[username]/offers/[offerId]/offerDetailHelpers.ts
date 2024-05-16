import { SignerData } from "@/config";
import { User } from "@clerk/nextjs/server";
import { TypeformAnswerObject, OfferDetailObject } from "@/types/types";
import { OFFER_DETAIL_REFERENCES } from "@/constants";


function getSignerData(user: User): SignerData {
  return {
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName} ${user.lastName}`,
    userId: user.username as string,
  };
}

function getFormattedOfferDetails(formData: any): OfferDetailObject {
  const offerDetails: TypeformAnswerObject[] = formData.items[0].answers.filter(
    (a: TypeformAnswerObject) => OFFER_DETAIL_REFERENCES.includes(a.field.ref)
  );

  const formattedOfferDetails: OfferDetailObject = {};

  for (const detail of offerDetails) {
    if (detail.type === "number") {
      formattedOfferDetails[detail.field.ref] = detail.number as number;
    }
    if (detail.type === "text") {
      formattedOfferDetails[detail.field.ref] = detail.text as string;
    }
    if (detail.type === "boolean") {
      formattedOfferDetails[detail.field.ref] = detail.boolean as boolean;
    }
    if (detail.type === "date") {
      formattedOfferDetails[detail.field.ref] = detail.date as Date;
    }
  }

  return formattedOfferDetails;
}

export { getSignerData, getFormattedOfferDetails };
