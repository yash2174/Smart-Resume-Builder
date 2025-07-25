export default function ResumeForm() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Resume Form</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-md"
          />
          <textarea
            placeholder="Summary"
            className="w-full border p-2 rounded-md"
          ></textarea>
          {/* Add more fields later */}
        </form>
      </div>
    );
  }
  