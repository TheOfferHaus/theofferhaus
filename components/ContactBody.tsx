/** Body component for the Contact page */

import { Card, CardContent, CardHeader } from "./ui/card";

export default function ContactBody() {
  return (
    <div className="grid grid-cols-1 gap-14 lg:p-32 md:p-12 p-12 sm:p-20 mb-12 bg-off-white">
      <Card>
        <CardHeader><h2 className="text-2xl">Get in touch.</h2></CardHeader>
        <CardContent>
          Email: email@email.com
          <br/>
          Phone: (555)555-5555
        </CardContent>
      </Card>
    </div>
  );
}
