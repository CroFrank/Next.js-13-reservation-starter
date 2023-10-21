"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { ReservationModal } from "./reservationModal";

interface FormDataProps {
  name: string;
  email: string;
  phone: string;
  date: string;
}

interface Data {
  date: string;
  email: string;
}

export default function Reservation() {
  const searchParams = useSearchParams();
  const url = `${searchParams}`.substring(5);
  const decodedDateString = decodeURIComponent(url);
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    email: "",
    phone: "",
    date: decodedDateString,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Data>({
    date: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { ...formData };
    console.log(data);
    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:3000/api/reservation", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setIsSubmitting(false);
      const resFromServer = await res.json();
      setData(resFromServer);
      setIsModalOpen(true);
      return router.refresh();
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <>
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2>You made your reservation for date {data.date}</h2>
        <p>Verification key is sent to your email {data.email}</p>
      </ReservationModal>

      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
        >
          <div className="mb-4">
            You are making reservation for: {decodedDateString}
          </div>
          <div className="mb-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {isSubmitting ? "Checking..." : "Make Reservation"}
          </button>
          <Link
            href="/"
            className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Cancle
          </Link>
        </form>
        <Link href="/search">search</Link>
      </div>
    </>
  );
}
