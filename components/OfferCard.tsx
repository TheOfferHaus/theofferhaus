import Link from "next/link";
type OfferObject = {
    id: number,
    envelopeId: string,
    docusignLink: string;
}
  /** Component for displaying a offer card with a offer ID, docusign link, etc.
   *
   *
   * props:
   * - Offer {id, envelopeId, docusignLink}
   */


  export default function OfferCard ({ offer } : { offer: OfferObject }) {

    const {id, docusignLink} = offer;

    return (
        <div>
            <h3>Offer ID: {id}</h3>
            <p>View Documents<Link href={docusignLink}>Here</Link></p>
        </div>
    )
  }
