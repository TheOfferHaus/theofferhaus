/** Body component for the Contact page */

export default function ContactBody() {
    return (
      <div className="grid grid-cols-1 gap-14 lg:p-32 md:p-12 p-12 sm:p-20 mb-12 bg-off-white">
        <p> <span className="text-xl me-3">Email</span>email@email.com</p>
        <p><span className="text-xl me-3">Phone</span> (555)555-5555</p>
      </div>
    );
  }