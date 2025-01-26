import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("car");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();


    const captainData = {
      email: email,
      password: password,
      fullname: {
        firstName: firstname,
        lastName: lastname
      },
      vehicleDetails: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType
      }
    };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#eeeeee]">
      <div>
        <img
          className="w-16"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png"
          alt=""
        />
        <div className="p-8 rounded-lg w-full">
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Username
              </label>
              <div className="flex gap-5">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  id="firstname"
                  type="text"
                  placeholder="Firstname"
                  required
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  id="lastname"
                  type="text"
                  placeholder="Lastname"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="******************"
                required
              />
            </div>

            {/* Vehicle Information Fields */}
            <div className="flex gap-5 mb-5">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Vehicle Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                >
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Vehicle Color
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  type="text"
                  placeholder="Vehicle Color"
                  required
                />
              </div>
            </div>
            <div className="flex gap-5 mb-5">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Vehicle Plate Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  type="text"
                  placeholder="Vehicle Plate Number"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Vehicle Capacity
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  type="number"
                  placeholder="Number of Seats"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Captain account
              </button>
            </div>
          </form>
          <p className="text-center mt-2">
            already have an account?{" "}
            <Link className="text-blue-600" to="/captain-login">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <div>
        <p className="text-[10px] leading-tight m-3">
          By continuing, I confirm that I have read and agree to the Terms of
          Use and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
