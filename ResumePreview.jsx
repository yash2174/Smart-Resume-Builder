export default function ResumePreview() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg print:shadow-none print:bg-white">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="border p-4 rounded-md text-sm leading-relaxed">
          {/* Dynamic preview will go here */}
          <p><strong>John Doe</strong></p>
          <p>Email: johndoe@email.com</p>
          <p className="mt-2">Summary: Passionate software engineer with experience in building modern web applications.</p>
        </div>
      </div>
    );
  }
  