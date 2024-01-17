"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"
import { ReservationModal } from "./reservationModal"
import { Input } from "../components/input"
import { config } from "../constants"

interface FormDataProps {
  name: string
  email: string
  phone: string
  date: string
}

interface Data {
  date: string
  email: string
  info: string
}

export default function Reservation() {
  const searchParams = useSearchParams()
  const url = `${searchParams}`.substring(5)
  const decodedDateString = decodeURIComponent(url)
  const router = useRouter()

  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    email: "",
    phone: "",
    date: decodedDateString,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<Data>({
    date: "",
    email: "",
    info: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      console.log(formData)
      const res = await fetch(`${config.url}/api/reservation`, {
        method: "POST",
        body: JSON.stringify(formData),
      })
      setIsSubmitting(false)
      const resFromServer = await res.json()
      setData(resFromServer)
      setIsModalOpen(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
      })
      return router.refresh()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
        >
          <div className="mb-4">
            You are making reservation for: {decodedDateString}
          </div>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            type="text"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
          />
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            type="number"
          />
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
            Cancel
          </Link>
        </form>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {data.info ? (
          <h2>{data.info}</h2>
        ) : (
          <div>
            <h2>You made your reservation for date {data.date}</h2>
            <p>Verification key is sent to your email {data.email}</p>
          </div>
        )}
      </ReservationModal>
    </div>
  )
}
