const SignIn = () => {

  const handleSubmit = () => {
    alert('Form submitted!');
  };

  return (
      <div className="flex justify-center items-center w-screen h-screen bg-linear-to-br from-neutral-900 to-neutral-950">
        <div className="flex flex-col items-center w-full max-w-md sm:max-w-md">
          {/* Otsikko */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl  font-bold text-white mb-8 text-center pt-15">
            Welcome Back
          </h1>

          {/* Lomake */}
          <div className="w-full bg-neutral-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg flex flex-col gap-6">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-lg font-medium">Email Address</label>
              <input
                type="email or username"
                placeholder="Enter your username or email"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-base focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-lg font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-base focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            {/* Submit-nappi */}
            <button className="w-full py-3 mt-4 bg-red-800 hover:bg-red-900 text-white font-semibold rounded-lg transition duration-300" onClick={handleSubmit}>
              Sign In
            </button>
          </div>
        </div>
      </div>
  );
};

export default SignIn;