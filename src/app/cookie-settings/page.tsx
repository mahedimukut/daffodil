import MaxWidthWrapper from "../components/MaxWidthWrapper";

const CookieSettings = () => {
  return (
    <div className="bg-gray-50 py-20">
      <MaxWidthWrapper>
        <h1 className="text-4xl font-extrabold text-charcoalGray mb-6 text-center">
          Cookie Settings
        </h1>
        <p className="text-gray-600 mb-6 text-lg text-center">
          Manage your cookie preferences for a personalized experience on our
          website.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Your Cookie Preferences
          </h2>
          <form className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Essential Cookies
              </label>
              <input
                type="checkbox"
                checked
                disabled
                className="form-checkbox h-5 w-5 text-daffodilYellow"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Analytical Cookies
              </label>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-daffodilYellow"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Marketing Cookies
              </label>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-daffodilYellow"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-daffodilYellow text-white py-3 rounded-lg font-semibold shadow-md hover:bg-daffodilYellow/80 transition"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CookieSettings;
